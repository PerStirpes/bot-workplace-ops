import { app } from '../app';

interface TicketInput {
  ack: any;
  payload: any;
  command: any;
  context: any;
}
// {
//   ack,
//   payload,
//   command,
//   context
// }: TicketInput

export const ticketCommand = async (yep: any) => {
  yep.ack({
    text: `${JSON.stringify(yep, null, 4)} `,
    response_type: 'ephemeral',
  });
  console.log(
    'PAYLOAD ack ack',
    yep,
    '\nPAYLOAD payload payload ',
    yep.payload,
    '\n-----------------------------------------------',
    '\nPAYLOAD view view',
    yep.command,
    '\n-----------------------------------------------',
    '\nPAYLOAD context context',
    yep.context
  );
  // ack();
  try {
    const result = await app.client.views.open({
      token: yep.context.botToken,
      trigger_id: yep.payload.trigger_id,
      type: 'modal',
      callback_id: 'view_identifier_12',

      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Internal Support Request',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                '*What’s in a great support request?*  \n\n *Provide us with as much essential information as possible.* \nError messages, logs, or links that are related to your request are helpful but not required.',
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'description, customer email ',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Subject',
              emoji: true,
            },
          },
          {
            type: 'input',
            optional: true,
            element: {
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'customer email',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Email',
              emoji: true,
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'ticket-title-value',
              placeholder: {
                type: 'plain_text',
                text: 'description',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Description',
              emoji: true,
            },
          },
        ],
      },
    });

    // ack({
    //   text: `\n The result: ${JSON.stringify(result, null, 4)}  `,
    //   response_type: "ephemeral"
    // });
  } catch (error) {
    console.log(error);
  }
};
