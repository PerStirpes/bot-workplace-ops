import { SlashCommand, SayFn } from '@slack/bolt';
import { app } from '../app';
import { serviceDeskBlocks, ServiceDesk, viewPayloadServiceDesk } from '../blocks';
// import { errorDescription } from "./utils";

interface EchoError {
  command: SlashCommand;
  ack: any /* AckFn this should be the AckFn */;
  say: SayFn;
}

export const echoWithError = async ({ command, ack, say }: EchoError) => {
  // Acknowledge command request
  // ack({
  //   text: JSON.stringify(command, null, 4),
  //   response_type: "ephemeral"
  // });
  ack({
    text: 'Oh no',
    response_type: 'ephemeral',
    attachments: [
      {
        text: 'Error please try again',
        color: 'danger',
        mrkdwn_in: ['text'],
      },
    ],
  });

  say({ text: `You said "${command.text}"` });
};

// app.action("button_click", async ({ ack, payload, context, body }) => {
//   ack();
//   // display conversation: { sayHello: 'hello' }}
//   console.log(context);
//   try {
//     const result = app.client.views.open({
//       token: context.botToken,
//       type: "modal",
//       trigger_id: body.trigger_id,
//       view: {
//         type: "modal",
//         title: {
//           type: "plain_text",
//           text: "BOT"
//         },
//         blocks: [
//           {
//             type: "section",
//             text: {
//               type: "mrkdwn",
//               text: "Welcome to a modal with _blocks_"
//             },
//             accessory: {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: "Click me!"
//               },
//               action_id: "button_abc"
//             }
//           }
//         ],
//         close: {
//           type: "plain_text",
//           text: "Cancel"
//         },
//         submit: {
//           type: "plain_text",
//           text: "Save"
//         },
//         callback_id: "tech_run_bot_"
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
// app.action("button_abc", ({ ack, payload, context }) => {
//   ack();
//   // Expected result  => conversation: { sayHello: 'hello' }}  in context object
//   // Actual result => no conversation in context object
//   console.log(context);
// });

// {
// 	"title": {
// 		"type": "plain_text",
// 		"text": "My App",
// 		"emoji": true
// 	},
// 	"type": "modal",
// 	"close": {
// 		"type": "plain_text",
// 		"text": "Cancel",
// 		"emoji": true
// 	},
// 	"submit": {
// 		"type": "plain_text",
// 		"text": "Submit",
// 		"emoji": true
// 	},
// 	"blocks": [
// 		{
// 			"type": "input",
// 			"element": {
// 				"type": "plain_text_input",
// 				"action_id": "title",
// 				"placeholder": {
// 					"type": "plain_text",
// 					"text": "What do you want to ask of the world?"
// 				}
// 			},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Title"
// 			}
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 				"type": "multi_channels_select",
// 				"action_id": "channels",
// 				"placeholder": {
// 					"type": "plain_text",
// 					"text": "Where should the poll be sent?"
// 				}
// 			},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Channel(s)"
// 			}
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 				"type": "plain_text_input",
// 				"action_id": "option_1",
// 				"placeholder": {
// 					"type": "plain_text",
// 					"text": "First option"
// 				}
// 			},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Option 1"
// 			}
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 				"type": "plain_text_input",
// 				"action_id": "option_2",
// 				"placeholder": {
// 					"type": "plain_text",
// 					"text": "How many options do they need, really?"
// 				}
// 			},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Option 2"
// 			}
// 		},
// 		{
// 			"type": "actions",
// 			"elements": [
// 				{
// 					"type": "button",
// 					"action_id": "add_option",
// 					"text": {
// 						"type": "plain_text",
// 						"text": "Add another option  "
// 					}
// 				}
// 			]
// 		}
// 	]
// }
