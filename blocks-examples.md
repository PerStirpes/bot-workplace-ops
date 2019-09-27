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

````
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
````
