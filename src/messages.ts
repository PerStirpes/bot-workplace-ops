import { app } from "./app";
import { errorDescription } from "./utils";

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
