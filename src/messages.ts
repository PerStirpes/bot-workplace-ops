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
  context: any;
};

// sends a button
export const hello = async ({ message, context, say }: Hello) => {
  await context.updateConversation({ value: "hello" });

  say({
    text: `Ewok is a dog!`,
    icon_emoji: "dog",
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
            "*LaunchDarkly ServiceDesk*\nWelcome! You can raise a Workplace Operations request from the options provided"
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "<http://example.com|Instructions>"
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
              text: "Approve",
              emoji: true
            }
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Reject",
              emoji: true
            }
          },
          {
            type: "overflow",
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Follow",
                  emoji: true
                },
                value: "value-0"
              },
              {
                text: {
                  type: "plain_text",
                  text: "Activity feed",
                  emoji: true
                },
                value: "value-1"
              },
              {
                text: {
                  type: "plain_text",
                  text: "Details",
                  emoji: true
                },
                value: "value-3"
              }
            ]
          }
        ]
      }
    ]
  });
};
