import { AckFn, SayFn, SayArguments } from '@slack/bolt';
import { ActionsBlock } from '@slack/types';
import { app } from '../app';
import { errorDescription } from '../utils';

interface ButtonClick {
  action: any;
  ack: any;
  body: any;
  say: any;
  context: any;
  respond: any;
}

export const basicButtonClick = ({ action, context, ack, body, respond, say }: ButtonClick) => {
  ack();
  console.log('context.conversation', context);
  const doggy = context.conversation;
  // respond(`You selected <@${action}>`);

  say(`<@${body.user.id}> clicked the button  ${action.type} \n ${JSON.stringify(body, null, 4)}`);
};

interface ThumbsUp {
  action: any;
  ack: any;
  body: any;
  say: any;
  context: any;
}

export const openServiceDeskDialog = async ({ action, context, ack, body, say }: ThumbsUp) => {
  ack();
  console.log('body.trigger_id: ', body.trigger_id);
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'modal-callback-id',
        title: {
          type: 'plain_text',
          text: 'Give a Thumbs Up 👍',

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
            type: 'input',
            block_id: 'ratings NEEDS TO BE UPDATED',
            label: {
              type: 'plain_text',
              text: 'Who are you Nominating?',
            },
            element: {
              action_id: 'Replacesingle_action',
              type: 'users_select',
              placeholder: {
                type: 'plain_text',
                text: 'Choose a Coworker',
                emoji: true,
              },
            },
          },
          {
            type: 'input',
            block_id: 'rating THIS NEEDS TO BE UPDATED',
            label: {
              type: 'plain_text',
              text: 'Pick a Gift',
            },
            element: {
              action_id: 'single_action',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a Gift',
                emoji: true,
              },
              option_groups: [
                {
                  label: {
                    type: 'plain_text',
                    text: 'Charitable Contributions',
                  },
                  options: [
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Gift to Level the Playing field',
                        emoji: true,
                      },
                      value: 'gift_charity',
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Other',
                        emoji: true,
                      },
                      value: 'gift_coffee_card',
                    },
                  ],
                },
                {
                  label: {
                    type: 'plain_text',
                    text: 'Dates',
                  },
                  options: [
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Pair Movie tickets 🍿',
                        emoji: true,
                      },
                      value: 'gift_movie_tickets',
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Coffee Card ☕️',
                        emoji: true,
                      },
                      value: 'gift_coffee_card',
                    },
                  ],
                },
                {
                  label: {
                    type: 'plain_text',
                    text: 'Wine, Beer, or Spirits',
                  },
                  options: [
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Red Wine🍷',
                        emoji: true,
                      },
                      value: 'red_wine',
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'White Wine 🍾',
                        emoji: true,
                      },
                      value: 'white_wine',
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Rose Wine🍷',
                        emoji: true,
                      },
                      value: 'rose_wine',
                    },
                    {
                      text: {
                        type: 'plain_text',
                        text: 'Beer 🍺',
                        emoji: true,
                      },
                      value: 'beer',
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'input',
            block_id: 'comment',
            label: {
              type: 'plain_text',
              text: 'What Awesome Thing Did the Person Do?',
            },
            hint: {
              type: 'plain_text',
              text: 'This message will be used at Allhands to honor the person you are nominating.',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'single_action',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'This message will be used at Allhands to honor the person you are nominating.',
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    errorDescription(error);
  }
};
