import { SlashCommand, SayFn } from "@slack/bolt";

// import { app } from "./app";
// import { errorDescription } from "./utils";

interface EchoError {
  command: SlashCommand;
  ack: any /* AckFn this should be the AckFn */;
  say: SayFn;
}

export const echoWithError = async ({ command, ack, say }: EchoError) => {
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
};
