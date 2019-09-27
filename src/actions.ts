import { AckFn, SayFn, SayArguments } from "@slack/bolt";
import { ActionsBlock } from "@slack/types";

// import { errorDescription } from "./utils";

interface ButtonClick {
  action: any;
  ack: any;
  body: any;
  say: any;
}

export const basicButtonClick = ({ action, ack, body, say }: ButtonClick) => {
  ack();
  say(`<@${body.user.id}> clicked the button  ${action.type}`);
};
