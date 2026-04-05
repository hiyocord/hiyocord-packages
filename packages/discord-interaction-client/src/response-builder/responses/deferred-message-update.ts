import type {
  APIInteractionByType,
  InteractionResponseForResponseType,
} from "../../types";
import type {
  InteractionType,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";
import type { FollowupMessageUpdateBuilder } from "../../response-builder/followup";

export class DeferredMessageUpdateBuilder {
  constructor(
    private interaction: APIInteractionByType<
      | InteractionType.MessageComponent
      | InteractionType.ModalSubmit>,
    private response: InteractionResponseForResponseType<InteractionResponseType.DeferredMessageUpdate> = {
      type: InteractionResponseType.DeferredMessageUpdate,
    },
  ) {}

  build(
    func: (
      builder: FollowupMessageUpdateBuilder,
    ) =>
      | RESTPatchAPIWebhookWithTokenMessageJSONBody
      | Promise<RESTPatchAPIWebhookWithTokenMessageJSONBody>,
  ) {
    return {
      deferred: true,
      response: this.response,
      followup: func,
    } as const;
  }
}
