import { App, LogLevel } from "@slack/bolt";
import { asCodedError } from "@slack/bolt/dist/errors";
import { buttonBlockModal, happyMessage, fortyTwo, hello } from "./messages";
import { echoWithError, serviceDeskOptions, ticketCommand } from "./commands";
import { basicButtonClick, openServiceDeskDialog } from "./actions";
import { appMentionAction } from "./events";
import { inspect } from "util";
import { viewPayloadServiceDesk } from "./blocks";
export const app: App = new App({
  authorize: () => {
    return Promise.resolve({
      botId: "BNP5WM5LP",
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN
    });
  },

  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

/*
#################################################################
########################### ACTIONS ############################
#################################################################
*/

app.action("button_click", basicButtonClick);
app.action("thumbs_up", openServiceDeskDialog);

/*
#################################################################
########################### COMMANDS ############################ 
#################################################################
*/

app.command("/echo", echoWithError);

app.command("/servicedesk", serviceDeskOptions);
app.command("/ticket", ticketCommand);

/*
#################################################################
########################### EVENTS ##############################
#################################################################
*/

app.event("app_mention", appMentionAction);

/*
################################################################ 
########################### MESSAGES ########################### 
################################################################ 
*/

app.message("happy", happyMessage);
app.message("42", fortyTwo);
app.message("hello", hello);
app.message("servicedesk", buttonBlockModal);

/*
################################################################ 
########################### Views ############################## 
################################################################ 
*/
interface Bomb {
  ack: any;
  body: any;
  view: any;
  context: any;
}
// { ack, body, view, context }
const valBomb = async (y: Bomb) => {
  // Acknowledge the view_submission event

  y.ack();
  console.log("-----------------------------------------------");
  console.log(
    "PAYLOAD ack ack",
    y
    // "PAYLOAD body body ",
    // y.body,
    // "\n-----------------------------------------------",
    // "\nPAYLOAD view view",
    // view,
    // "\n-----------------------------------------------",
    // "\nPAYLOAD context context",
    // context
  );
  // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

  // Assume there's an input block with `block_1` as the block_id and `input_a` ["input_a"];
  // const val = view["state"]["values"];
  const val =
    y.view["state"]["values"]["ticket-title"]["ticket-title-value"]["value"];
  // ["ticket-desc"];block_id
  const user = y.body["user"]["id"];
  const value1 = y.view.state.values;
  console.log("-----------------------------------------------");
  console.log(inspect(value1));
  console.log("-----------------------------------------------");
  // // Message to send user
  // let msg = "";
  // // Save to DB
  // const results = await db.set(user.input, val);

  // if (results) {
  //   // DB save was successful
  //   msg = "Your submission was successful";
  // } else {
  //   msg = "There was an error with your submission";
  // }

  // Message the user
  // postEphemeral;
  try {
    app.client.chat.postMessage({
      token: y.context.botToken,
      channel: y.body.user.id,
      text: val
    });
    app.client.chat.postEphemeral({
      user: y.body.user.id,
      token: y.context.botToken,
      channel: y.view.private_metadata,
      text: val
    });
  } catch (error) {
    console.error(error);
    console.log("-----------------------------------------------");
  }
};
// Handle a view_submission event
app.view("view_identifier_12", valBomb);
app.view("thumbs_up_modal_view", valBomb);

/*
#################################################################
########################### Start App ########################### 
#################################################################
*/

if (process.env.NODE_ENV !== "production") {
  (async (PORT = 3000) => {
    try {
      await app.start(process.env.PORT || PORT);
    } catch (error) {
      throw error;
    }

    console.log(
      `> Workplace Ops Bolt is running on PORT ${PORT} in ${process.env.NODE_ENV}`
    );
  })();
}

app.error(err => console.error("As Codeded Error", asCodedError(err)));

process.on("uncaughtException", err => {
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", reason =>
  console.error("Unhandled rejection", reason)
);

export default app;
