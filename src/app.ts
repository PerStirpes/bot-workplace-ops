import { App, LogLevel } from "@slack/bolt";
import * as WebApi from "seratch-slack-types/web-api";
import { errorDescription } from "./utils";
import { asCodedError } from "@slack/bolt/dist/errors";
import { buttonBlockModal, happyMessage, fortyTwo, hello } from "./messages";

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

app.message("happy", happyMessage);
app.message("42", fortyTwo);
app.message("hello", hello);
app.message("servicedesk", buttonBlockModal);

/*

########################### ACTIONS ########################### 
*/

app.action("button_click", ({ action, ack, body, say }) => {
  ack();
  say(`<@${body.user.id}> clicked the button  ${action.type}`);
});

/*

########################### COMMANDS ########################### 

*/

app.command("/echo", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack({
    text: "Oh no",
    response_type: "ephemeral",
    attachments: [
      {
        text: "Error please try again",
        color: "danger",
        mrkdwn_in: ["text"]
      }
    ]
  });
  say({ text: `You said "${command.text}"` });
});

/*

########################### EVENTS ########################### 

*/

app.event("app_mention", async ({ event, say, context }) => {
  console.log("event: ", event.user);
  try {
    const res: WebApi.UsersInfoResponse = await app.client.users.info({
      token: context.botToken,
      user: event.user
    });

    if (res.ok) {
      if (res.user) {
        say({
          text: `Hi! <@${res.user.name}>`
        });
      }
    }
  } catch (reason) {
    errorDescription(reason);
  }
});

/*

########################### Start App ########################### 

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

app.error(err => {
  console.error("As Codeded Error", asCodedError(err));
});

process.on("uncaughtException", function(err) {
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function(reason, p) {
  console.error("Unhandled rejection", reason);
});

export default app;

// [
// 	{
// 		"type": "section",
// 		"text": {
// 			"type": "mrkdwn",
// 			"text": ":wave: Hi! How can I help you?\n\nTake a look at my documentation or look below to learn more about my commands."
// 		}
// 	},
// 	{
// 		"type": "actions",
// 		"elements": [
// 			{
// 				"type": "button",
// 				"action_id": "open_docs_1",
// 				"url": "https://docs.launchdarkly.com/docs/slack-app",
// 				"text": {
// 					"type": "plain_text",
// 					"text": "Open documentation 1",
// 					"emoji": true
// 				}
// 			},
// 			{
// 				"type": "button",
// 				"action_id": "open_docs_2",
// 				"url": "https://docs.launchdarkly.com/docs/slack-app",
// 				"text": {
// 					"type": "plain_text",
// 					"text": "Open documentation 2",
// 					"emoji": true
// 				}
// 			},
// 			{
// 				"type": "button",
// 				"action_id": "open_docs_3",
// 				"url": "https://docs.launchdarkly.com/docs/slack-app",
// 				"text": {
// 					"type": "plain_text",
// 					"text": "Open documentation 3",
// 					"emoji": true
// 				}
// 			},
// 			{
// 				"type": "button",
// 				"action_id": "open_docs_4",
// 				"url": "https://docs.launchdarkly.com/docs/slack-app",
// 				"text": {
// 					"type": "plain_text",
// 					"text": "Open documentation 4",
// 					"emoji": true
// 				}
// 			}
// 		]
// 	}
// ]
