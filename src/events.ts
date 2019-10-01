import { app } from "./app";
import { errorDescription } from "./utils";
import * as WebApi from "seratch-slack-types/web-api";

interface MentionAction {
  event: any;
  say: any;
  context: any;
}
export const appMentionAction = async ({
  event,
  say,
  context
}: MentionAction) => {
  console.log("event: ", event.user);
  try {
    const res: WebApi.UsersInfoResponse = await app.client.users.info({
      token: context.botToken,
      user: event.user
    });
    if (res.ok) {
      if (res.user) {
        say({
          text: `Hi! <@${res.user.name}>`
        });
      }
    }
  } catch (reason) {
    errorDescription(reason);
  }
};
