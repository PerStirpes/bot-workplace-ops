import { AckFn, SayFn, SayArguments } from "@slack/bolt";
import { ActionsBlock } from "@slack/types";
import { app } from "./app";
import { errorDescription } from "./utils";

interface ButtonClick {
  action: any;
  ack: any;
  body: any;
  say: any;
  context: any;
  respond: any;
}

export const basicButtonClick = ({
  action,
  context,
  ack,
  body,
  respond,
  say
}: ButtonClick) => {
  ack();
  console.log("context.conversation", context);
  const doggy = context.conversation;
  // respond(`You selected <@${action}>`);

  say(
    `<@${body.user.id}> clicked the button  ${action.type} \n ${JSON.stringify(
      body,
      null,
      4
    )}`
  );
};

interface ThumbsUp {
  action: any;
  ack: any;
  body: any;
  say: any;
  context: any;
}

export const openServiceDeskDialog = async ({
  action,
  context,
  ack,
  body,
  say
}: ThumbsUp) => {
  // ack();
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      type: "modal",

      view: {
        type: "modal",
        callback_id: "thumbs_up_modal_view",
        private_metadata: "Shhhhhhhh",
        title: {
          type: "plain_text",
          text: "Give a Thumbs Up 👍"
        },

        submit: {
          type: "plain_text",
          text: "Send"
        },
        close: {
          type: "plain_text",
          text: "Cancel"
        },

        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Who are you Nominating?*"
            },
            block_id: "section1",
            accessory: {
              type: "users_select",
              placeholder: {
                type: "plain_text",
                text: "Choose a Co-worker",
                emoji: true
              }
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "users_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select a Coworker",
                  emoji: true
                }
              }
            ]
          },
          {
            type: "divider"
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              multiline: true,
              placeholder: {
                type: "plain_text",
                text:
                  "This message will be used at Allhands to honor the person you are nominating."
              }
            },
            label: {
              type: "plain_text",
              text: "What Awesome Thing Did the Person Do?",
              emoji: true
            },
            hint: {
              type: "plain_text",
              text:
                "This message will be used at Allhands to honor the person you are nominating."
            }
          },
          {
            type: "actions",
            elements: [
              {
                type: "users_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select a user",
                  emoji: true
                }
              },
              {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Select a Gift",
                  emoji: true
                },
                option_groups: [
                  {
                    label: {
                      type: "plain_text",
                      text: "Charitable Contributions"
                    },
                    options: [
                      {
                        text: {
                          type: "plain_text",
                          text: "Gift to Level the Playing field"
                        },
                        value: "gift_charity"
                      },
                      {
                        text: {
                          type: "plain_text",
                          text: "Other"
                        },
                        value: "gift_coffee_card"
                      }
                    ]
                  },
                  {
                    label: {
                      type: "plain_text",
                      text: "Dates"
                    },
                    options: [
                      {
                        text: {
                          type: "plain_text",
                          text: "Pair Movie tickets 🍿"
                        },
                        value: "gift_movie_tickets"
                      },
                      {
                        text: {
                          type: "plain_text",
                          text: "Coffee Card ☕️"
                        },
                        value: "gift_coffee_card"
                      }
                    ]
                  },
                  {
                    label: {
                      type: "plain_text",
                      text: "Wine, Beer, or Spirits"
                    },
                    options: [
                      {
                        text: {
                          type: "plain_text",
                          text: "Red Wine🍷"
                        },
                        value: "red_wine"
                      },
                      {
                        text: {
                          type: "plain_text",
                          text: "White Wine 🍾"
                        },
                        value: "white_wine"
                      },

                      {
                        text: {
                          type: "plain_text",
                          text: "Rose Wine🍷"
                        },
                        value: "rose_wine"
                      },
                      {
                        text: {
                          type: "plain_text",
                          text: "Beer 🍺"
                        },
                        value: "beer"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    });
    ack({
      text: `\n The RESULT FROM openServiceDeskDialog: ${JSON.stringify(
        result,
        null,
        4
      )}  `,
      response_type: "ephemeral"
    });
  } catch (error) {
    errorDescription(error);
  }
};
