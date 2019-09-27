import { app } from "./app";
import { errorDescription } from "./utils";
import { SayFn } from "@slack/bolt";

/*

########################### MESSAGES ########################### 

*/
type happiness = {
  message: any;
  context: any;
};

export const happyMessage = async ({ message, context }: happiness) => {
  try {
    const result = await app.client.reactions.add({
      token: context.botToken,
      name: "grinning",
      channel: message.channel,
      timestamp: message.ts
    });
    const response = await app.client.reactions.add({
      token: context.botToken,
      name: "star",
      channel: message.channel,
      timestamp: message.ts
    });
    console.log("reactions.add result & response:", result, response);
  } catch (error) {
    errorDescription(error);
  }
};

// Threads a message
export const fortyTwo = ({ message, context }: happiness): void => {
  // use chat.postMessage over say method
  try {
    const response = app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      text: "The answer to life, the universe and everything",
      thread_ts: message.ts
    });
    console.log("response from postMessage", response);
  } catch (error) {
    errorDescription(error);
  }
};

type Hello = {
  message: any;
  say: any;
};

// sends a button
export const hello = ({ message, say }: Hello) => {
  say({
    text: `Ewok is a dog!`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me"
          },
          action_id: "button_click"
        }
      }
    ]
  });
};

interface ButtonBlock {
  context: any;
  say: SayFn;
}
export const buttonBlockModal = ({ say }: ButtonBlock) => {
  say({
    text: "Just some text",
    icon_emoji: "smile",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":wave: Hi! How can I help you?\n\nTake a look at my documentation or look below to learn more about my commands."
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            action_id: "open_docs_1",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 1",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_2",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 2",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_3",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 3",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_4",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 4",
              emoji: true
            }
          }
        ]
      },
      {
        type: "actions",

        elements: [
          {
            type: "button",
            action_id: "button_click",
            text: {
              type: "plain_text",
              text: "Thumbsup1",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_6",
            text: {
              type: "plain_text",
              text: "Thumbsup2",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_7",
            text: {
              type: "plain_text",
              text: "Thumbsup3",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_8",
            text: {
              type: "plain_text",
              text: "Thumbsup4",
              emoji: false
            }
          }
        ]
      }
    ]
  });
};
