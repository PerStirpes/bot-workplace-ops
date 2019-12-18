import { App, LogLevel } from '@slack/bolt';
import { asCodedError } from '@slack/bolt/dist/errors';
import { buttonBlockModal, happyMessage, fortyTwo, hello } from './messages';
import { echoWithError } from './commands/errorFunction';
import { serviceDeskOptions } from './commands/servicedesk';
import { ticketCommand } from './commands/ticketCommandExample';
import { basicButtonClick, openServiceDeskDialog } from './actions/actions';
import { appMentionAction } from './events';
import { inspect } from 'util';
import { viewPayloadServiceDesk } from './blocks';
export const app: App = new App({
  authorize: () => {
    return Promise.resolve({
      botId: 'BNP5WM5LP',
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN,
    });
  },

  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

app.use((args) => {
  console.log('APP.USE OUTPUT: ', JSON.stringify(args, null, 4));
  args.next();
});



// //
// // app.options("_static_select_action_id_", async yep => {

// app.options(
//   { action_id: "block_id_4_users_select_static_select_action_id" },
//   async yep => {
//     console.log("Find another", JSON.stringify(yep, null, 4));

//     yep.ack();
//     // yep.
//     // yep.options
//     // yep.respond({
//     //   text: "Action Command, find-another",
//     //   response_type: "ephemeral", // 再びこのユーザにだけ見えるメッセージ
//     //   replace_original: true, // もともとあったメッセージを置き換える
//     //   blocks: getRecommendationBlocks()
//     // });
//   }
// );
/*
#################################################################
########################### ACTIONS ############################
#################################################################
*/

app.action('button_click', basicButtonClick);
app.action('thumbs_up', openServiceDeskDialog);

/*
#################################################################
########################### COMMANDS ############################
#################################################################
*/

app.command('/echo', echoWithError);

app.command('/servicedesk', serviceDeskOptions);
app.command('/ticket', ticketCommand);

/*
#################################################################
########################### EVENTS ##############################
#################################################################
*/

app.event('app_mention', appMentionAction);

/*
################################################################
########################### MESSAGES ###########################
################################################################
*/

app.message('happy', happyMessage);
app.message('42', fortyTwo);
app.message('hello', hello);
app.message('servicedesk', buttonBlockModal);

/*
################################################################
########################### Views ##############################
################################################################
*/
interface Bomb {
  ack: any;
  body: any;
  view: any;
  context: any;
}

const valBomb = async (y: Bomb) => {
  // Acknowledge the view_submission event

  y.ack();
  console.log('PAYLOAD ack ack', y, 'PAYLOAD body body ');
  app.client.chat.postMessage({
    token: y.context.botToken,
    channel: y.body.user.id,
    text: JSON.stringify(y, null, 4),
  });
  // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

     // Assume there's an input block with `block_1` as the block_id and `input_a` ["input_a"];
  //   const val = y.view["state"]["values"];
  const val = y.view['state']['values']['ticket-title']['ticket-title-value']['value'];
  //   // ["ticket-desc"];block_id
  //   const user = y.body["user"]["id"];
  //   const value1 = y.view.state.values;

  console.log('-----------------------------------------------');
  // console.log(inspect(value1));
  console.log('-----------------------------------------------');
  // // Message to send user
  // let msg = "";
  // // Save to DB
  // const results = await db.set(user.input, val);

  // Message the user
  // postEphemeral;
  try {
    app.client.chat.postMessage({
      token: y.context.botToken,
      channel: y.body.user.id,
      text: val,
    });
    app.client.chat.postEphemeral({
      user: y.body.user.id,
      token: y.context.botToken,
      channel: y.view.private_metadata,
      text: val,
    });
    // if (results) {
    //   // DB save was successful
    //   msg = "Your submission was successful";
    // } else {
    const msg = 'There was an error with your submission';
    app.client.chat.postEphemeral({
      user: y.body.user.id,
      token: y.context.botToken,
      channel: y.view.private_metadata,
      text: msg,
    });
    //
    // }
  } catch (error) {
    console.error(error);
    console.log('-----------------------------------------------');
    app.client.chat.postEphemeral({
      user: y.body.user.id,
      token: y.context.botToken,
      channel: y.view.private_metadata,
      text: error,
    });
  }
};
const optionpicker = async (options: any) => {
  // Get information specific to a team or channel
  // const results = await db.get(options.team.id);
  console.log('OPTIONS PICKER ack ack', options, '-----------------------------------------------');
  options.ack();
  if (results) {
    let options = [];
    // Collect information in options array to send in Slack ack response
    for (const result in results) {
      options.push({
        "text": {
          "type": "plain_text",
          "text": result.label
        },
        "value": result.value
      });
    }
  if (options) {
    options.ack({
      options: options,
    });
  } else {
    options.ack();
  }
};

interface ExampleView {
  body: any;
  ack: any;
}
const exampleView = ({ body, ack }: ExampleView) => {
  ack();
  const stateValues = body.view.state.values;

  console.log(JSON.stringify(stateValues));
};

interface ReviewButton {
  body: any;
  context: any;
  ack: any;
}

interface ThumbsUp {
  ack: any;
  body: any;
  say?: any;
  context: any;
}
const reviewButton = async ({ body, context, ack }: ThumbsUp) => {
  ack();
  const sentData = JSON.parse(body.actions[0].value);
  const restaurantName = sentData.name;
  app.client.views
    .open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'modal-callback-id2',
        title: {
          type: 'plain_text',
          text: `${topic}`,
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
        },
        blocks: [
          {
            type: 'input',
            block_id: 'rating',
            label: {
              type: 'plain_text',
              text: 'ServiceDesk',
            },
            element: {
              action_id: 'single_action',
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select an item',
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: ':star:',
                    emoji: true,
                  },
                  value: '1',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':star::star:',
                    emoji: true,
                  },
                  value: '2',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':star::star::star:',
                    emoji: true,
                  },
                  value: '3',
                },
              ],
            },
          },
          {
            type: 'input',
            block_id: 'date-of-visit',
            label: {
              type: 'plain_text',
              text: '行った日',
            },
            element: {
              type: 'datepicker',
              action_id: 'single_action',
              initial_date: '2019-09-26',
              placeholder: {
                type: 'plain_text',
                text: 'When do you need it by',
                emoji: true,
              },
            },
          },
          {
            type: 'input',
            block_id: 'comment',
            label: {
              type: 'plain_text',
              text: 'add a comment',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'single_action',
              multiline: true,
            },
          },
        ],
      },
    })
    .then((res) => console.log(JSON.stringify(res)))
    .catch((err) => console.log(JSON.stringify(err)));
};

// // app.options("thumbs_up_modal_view", optionpicker);
// //
// // Handle a view_submission event
// app.view("view_identifier_12", valBomb);
// app.view("thumbs_up_modal_view", valBomb);
app.view('modal-callback-id', exampleView);
// app.options({ action_id: "GIFTS_ACTION" }, optionpicker);
// // app.options(
// //   { action_id: "block_id_4_users_select_static_select_action_id" },
// //   optionpicker
// // );

// /*
// #################################################################
// ########################### Start App ###########################
// #################################################################
// */

if (process.env.NODE_ENV !== 'production') {
  (async (PORT = 3000) => {
    try {
      await app.start(process.env.PORT || PORT);
    } catch (error) {
      throw error;
    }

    console.log(`> Workplace Ops ⚡️ Bolt is running on PORT ${PORT} in ${process.env.NODE_ENV}`);
  })();
}

app.error((err) => console.error('As Codeded Error ❌', asCodedError(err)));

process.on('SIGTERM', async () => {
  console.log('Starting graceful shutdown');

  let exitCode = 0;
  const shutdownHooks = [app.stop()];

  for (const s of shutdownHooks) {
    try {
      await s;
    } catch (e) {
      console.error('Error in graceful shutdown ', e);
      exitCode = 1;
    }
  }

  process.exit(exitCode);
});

process.on('uncaughtException', (err) => {
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => console.error('Unhandled rejection', reason));

// export default app;

function getRecommendationBlocks() {
  const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];

  // blocks
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:shallow_pan_of_food: <${restaurant.url}|${restaurant.name}> はいかがですか？`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'find-another', 
          text: {
            type: 'plain_text',
            text: 'food ',
            emoji: true,
          },
          value: 'next',
        },
        {
          type: 'button',
          action_id: 'add-review', 
          text: {
            type: 'plain_text',
            text: 'Add a review',
            emoji: true,
          },
          value: JSON.stringify(restaurant),
        },
      ],
    },
  ];
}

app.command('/lunch', async ({ ack, respond }) => {
  ack();
 
  respond({
    text: 'yo',
    response_type: 'ephemeral', 
    blocks: getRecommendationBlocks(),
  });
});

app.action('find-another', async ({ body, context, ack, respond }) => {
  ack();
  respond({
    text: 'yo',
    response_type: 'ephemeral', 
    replace_original: true, 
    blocks: getRecommendationBlocks(),
  });
});

app.action('add-review', reviewButton);

// app.view("modal-callback-id", exampleView);
