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

export const messages = {
  welcome_app_home: {
    text:
      "Hi there! Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Hi there! \n\n Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji. \n\n But before we start, let's configure a channel you want all messages to be forwarded to. \n\n"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Pick a channel from the dropdown list*"
        },
        accessory: {
          action_id: "configure_channel",
          type: "channels_select",
          placeholder: {
            type: "plain_text",
            text: "Select channel",
            emoji: true
          }
        }
      }
    ]
  },
  welcome_channel: {
    text:
      "Hi there! Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Hi there! \n\n Bolt is a simple App that forwards messages from this channel to <#{{channelId}}|{{channelName}}> by reacting to a message with the :zap: emoji."
        }
      }
    ]
  },
  added_to_channel: {
    text: "Bolt has been invited to channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":zap: Bolt has been invited to *<#{{channelId}}|{{channelName}}>*"
        }
      }
    ]
  },
  channel_configured: {
    text: "The default channel for Bolt has been configured",
    replace_original: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":tada: The default channel for Bolt has been configured for *<#{{channelId}}|{{channelName}}>*"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "You can now invite Bolt to a channel by typing `/invite` in any of your channels or simply select one channel from the dropdown below."
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Invite Bolt to a channel*"
        },
        accessory: {
          action_id: "add_to_channel",
          type: "channels_select",
          placeholder: {
            type: "plain_text",
            text: "Select channel",
            emoji: true
          }
        }
      }
    ]
  }
};

interface ServiceDesk {
  ack: any;
  context?: any;
  say: any;
  command: any;
}

export const serviceDeskOptions = ({ ack, command, say }: ServiceDesk) => {
  // ack({
  //   text: JSON.stringify(command, null, 4),
  //   response_type: "ephemeral"
  // });
  ack({
    text: JSON.stringify(command, null, 4),
    response_type: "ephemeral"
  });
  say({
    text: command.text,
    icon_emoji: "smile",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*LaunchDarkly ServiceDesk*\nYour approval is requested to make an offer to <http://example.com|Florence Tran>."
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
