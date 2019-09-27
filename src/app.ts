import { App, LogLevel } from "@slack/bolt";
import { asCodedError } from "@slack/bolt/dist/errors";
import { buttonBlockModal, happyMessage, fortyTwo, hello } from "./messages";
import { echoWithError } from "./commands";
import { basicButtonClick } from "./actions";
import { appMentionAction } from "./events";
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

/*
#################################################################
########################### COMMANDS ############################ 
#################################################################
*/

app.command("/echo", echoWithError);

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
