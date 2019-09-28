export interface ServiceDesk {
  ack: any;
  context?: any;
  say: any;
  command: any;
  payload?: any;
}

export const serviceDeskBlocks = [
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
          text: "Request an Item",
          emoji: true
        }
      },
      {
        type: "button",
        action_id: "thumbs_up",
        text: {
          type: "plain_text",
          text: "Give a Thumbs Up",
          emoji: true
        }
      },
      {
        type: "overflow",
        options: [
          {
            text: {
              type: "plain_text",
              text: "IT Help \t :computer:",
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
];

export const viewPayloadServiceDesk = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Welcome to a modal with _blocks_"
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Click me!"
      },
      action_id: "thumbs_up"
    }
  },
  {
    type: "input",
    block_id: "input_c",
    label: {
      type: "plain_text",
      text: "What are your hopes and dreams?"
    },
    element: {
      type: "plain_text_input",
      action_id: "dreamy_input",
      multiline: true
    }
  }
];
