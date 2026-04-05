import type {
  APIInteractionByType,
  InteractionResponseForResponseType,
} from "../../types";
import type {
  InteractionType,
  MessageFlags,
  RESTPostAPIWebhookWithTokenJSONBody,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";
import type { FollowupReplyBuilder } from "../../response-builder/followup";

export class DeferredChannelMessageWithSourceBuilder {
  constructor(
    private interaction: APIInteractionByType<
      | InteractionType.ApplicationCommand
      | InteractionType.MessageComponent>,
    private response: InteractionResponseForResponseType<InteractionResponseType.DeferredChannelMessageWithSource> = {
      type: InteractionResponseType.DeferredChannelMessageWithSource,
      data: {},
    },
  ) {}

  flags(flags: MessageFlags) {
    return new DeferredChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, flags },
    });
  }

  build(
    func: (
      builder: FollowupReplyBuilder,
    ) =>
      | RESTPostAPIWebhookWithTokenJSONBody
      | Promise<RESTPostAPIWebhookWithTokenJSONBody>,
  ) {
    return {
      deferred: true,
      response: this.response,
      followup: func,
    } as const;
  }
}
