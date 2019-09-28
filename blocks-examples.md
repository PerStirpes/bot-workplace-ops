## SERVICE DESK TEXT

```js
const dialog = {
  callback_id: "servicedesk",
  title: "Workplace Operations",
  submit_label: "Submit",
  trigger_id: trigger_id,
  elements: [
    {
      label: "What can we help you with?",
      type: "text",
      name: "task"
    },

    {
      label: "What do need?",
      type: "textarea",
      name: "ld-what",
      hint: `Tell us what you're looking for. For example, 'put me on the mailing list'`,
      placeholder: `Tell us what you're looking for. For example, 'put me on the mailing list'.`
    },
    {
      label: "Why do you need this?",
      type: "textarea",
      name: "ld-why"
    }
  ]
};

const dialogTH = {
  callback_id: "th_up",
  title: "Give a Thumbs Up! 👍",
  submit_label: "Give",
  trigger_id: trigger_id,
  elements: [
    {
      label: "Who are you nominating?",
      type: "select",
      name: "nominee",
      hint: "Monica will hand you the selected gift and a Thumbs up card. ",
      data_source: "users"
    },
    {
      label: "Gift Options",
      type: "select",
      name: "gift_options",
      option_groups: giftOptions,
      options: [{ label: "Bottle of Wine 🍷", value: "Low" }]
    },

    {
      label: "What are you proposing they receive?",
      type: "text",
      name: "other",
      optional: true,
      subtype: "url",
      placeholder: `Only required for Other Option`
    },
    {
      label: "What awesome thing did the person do?",
      type: "textarea",
      name: "description",
      placeholder: `This the message that will be used at Allhands to honor the person you are nominating.`
    },
    {
      label: "Who is their Manager?",
      type: "select",
      name: "manager",
      optional: true,
      hint: "If you want their manager to know",
      data_source: "users"
    }
  ]
};
```

## Gift Options

```js
const giftOptions = [
  {
    label: "Charitable Contributions",
    options: [
      {
        label: "Gift to Level the Playing field",
        value: "charity"
      }
    ]
  },
  {
    label: "Wine, Beer, or Spirits",
    options: [
      {
        label: "Red Wine",
        value: "red_wine"
      },
      {
        label: "White Wine ",
        value: "white_wine"
      },
      {
        label: "Rose Wine",
        value: "rose"
      },
      {
        label: "Beer",
        value: "beer"
      }
    ]
  },
  {
    label: "Pair Movie tickets 🍿",
    options: [
      {
        label: "Fandango gift card",
        value: "movie_tickets"
      }
    ]
  },
  {
    label: "Coffe Card ☕️",
    options: [
      {
        label: "Pete's gift card",
        value: "coffe_card"
      }
    ]
  },
  {
    label: "Other",
    options: [
      {
        label:
          "Please specify what you would like them to get, and where to get it ",
        value: "other"
      }
    ]
  }
];
```

### actions

#### 4 buttons in a row

```

[ 	{
// 		"type": "section",
// 		"text": {
// 			"type": "mrkdwn",
// 			"text": ":wave: Hi! How can I help you?\n\nTake a look at my documentation or look below to learn more about my commands."
// 		}
// 	},
// 	{
// 		"type": "actions",
// 		"elements": [
// 			{
// 				"type": "button",
// 				"action_id": "open_docs_1",
 				"url": "https://docs.launchdarkly.com/docs/slack-app",

[
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": ":wave: Hi! How can I help you?\n\nTake a look at my documentation or look below to learn more about my commands."
		}
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"action_id": "open_docs_1",
				"url": "https://docs.launchdarkly.com/docs/slack-app",
				"text": {
					"type": "plain_text",
					"text": "Open documentation 1",
					"emoji": true
				}
			},
			{
				"type": "button",
				"action_id": "open_docs_2",
				"url": "https://docs.launchdarkly.com/docs/slack-app",
				"text": {
					"type": "plain_text",
					"text": "Open documentation 2",
					"emoji": true
				}
			},
			{
				"type": "button",
				"action_id": "open_docs_3",
				"url": "https://docs.launchdarkly.com/docs/slack-app",
				"text": {
					"type": "plain_text",
					"text": "Open documentation 3",
					"emoji": true
				}
			},
			{
				"type": "button",
				"action_id": "open_docs_4",
				"url": "https://docs.launchdarkly.com/docs/slack-app",
				"text": {
					"type": "plain_text",
					"text": "Open documentation 4",
					"emoji": true
				}
			}
		]
	}
]

```

```
[
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":wave: Hi! How can I help you?\n\nTake a look at my documentation or look below to learn more about my commands."
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            action_id: "open_docs_1",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 1",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_2",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 2",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_3",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 3",
              emoji: true
            }
          },
          {
            type: "button",
            action_id: "open_docs_4",
            url: "https://docs.launchdarkly.com/docs/slack-app",
            text: {
              type: "plain_text",
              text: "Open documentation 4",
              emoji: true
            }
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
              text: "Thumbsup1",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_6",
            text: {
              type: "plain_text",
              text: "Thumbsup2",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_7",
            text: {
              type: "plain_text",
              text: "Thumbsup3",
              emoji: false
            }
          },
          {
            type: "button",
            action_id: "open_docs_8",
            text: {
              type: "plain_text",
              text: "Thumbsup4",
              emoji: false
            }
          }
        ]
      }
    ]
```
