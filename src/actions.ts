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
}

export const basicButtonClick = ({
  action,
  context,
  ack,
  body,
  say
}: ButtonClick) => {
  ack();
  console.log("context.conversation", context);
  const doggy = context.conversation;

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
  ack();
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      type: "modal",

      view: {
        type: "modal",
        callback_id: "view_identifier_12",
        title: {
          type: "plain_text",
          text: "Modal title"
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "It's Block Kit...but _in a modal_"
            },
            block_id: "section1",
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Click me"
              },
              action_id: "button_abc",
              value: "Button value",
              style: "danger"
            }
          },
          {
            type: "input",
            label: {
              type: "plain_text",
              text: "Input label"
            },
            element: {
              type: "plain_text_input",
              action_id: "input1",
              placeholder: {
                type: "plain_text",
                text: "Type in here"
              },
              multiline: false
            },
            optional: false
          }
        ],
        submit: {
          type: "plain_text",
          text: "Save"
        },
        close: {
          type: "plain_text",
          text: "Cancel"
        },
        private_metadata: "Shhhhhhhh"
      }
    });
  } catch (error) {
    errorDescription(error);
  }
};
