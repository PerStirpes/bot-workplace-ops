import {
  // serviceDeskBlocks,
  ServiceDesk,
  viewPayloadServiceDesk,
} from '../blocks';

const serviceDeskBlocks = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        '*LaunchDarkly ServiceDesk*\nWelcome! You can raise a Workplace Operations request from the options provided',
    },
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '<http://example.com|Instructions>',
      },
    ],
  },
  {
    type: 'actions',

    elements: [
      {
        type: 'button',
        action_id: 'button_click',

        text: {
          type: 'plain_text',
          text: 'Request an Item',
          emoji: true,
        },
      },
      {
        type: 'button',
        action_id: 'thumbs_up',
        text: {
          type: 'plain_text',
          text: 'Give a Thumbs Up',
          emoji: true,
        },
      },
      {
        type: 'overflow',
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'IT Help \t :computer:',
              emoji: true,
            },
            value: 'value-0',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Activity feed',
              emoji: true,
            },
            value: 'value-1',
          },
          {
            text: {
              type: 'plain_text',
              text: 'Details',
              emoji: true,
            },
            value: 'value-3',
          },
        ],
      },
    ],
  },
];

export const serviceDeskOptions = ({
  ack,
  payload,
  // command,
  context,
  say,
}: ServiceDesk) => {
  ack({
    text: `*CONTEXT* ${JSON.stringify(context, null, 4)} \n *PAYLOAD* ${JSON.stringify(payload, null, 4)}`,
    response_type: 'ephemeral',
  });
  say({
    // text: command.text,
    icon_emoji: 'vhs',
    response_type: 'ephemeral',
    blocks: serviceDeskBlocks,
  });
};
