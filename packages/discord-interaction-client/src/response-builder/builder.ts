import {
  AllowedInteractionResponseTypes,
  InteractionRequest,
  InteractionResponseType,
  InteractionType,
} from "types";
import { PongResponseBuilder } from "./responses/pong";
import { ChannelMessageWithSourceBuilder } from "./responses/channel-message-with-source";
import { DeferredChannelMessageWithSourceBuilder } from "./responses/deferred-channel-message-with-source";
import { DeferredMessageUpdateBuilder } from "./responses/deferred-message-update";
import { UpdateMessageBuilder } from "./responses/update-message";
import {
  ApplicationCommandAutocompleteResultBuilder,
  ModalBuilder,
} from "./responses";

interface InteractionResponseTypeBuilder {
  [InteractionResponseType.Pong]: PongResponseBuilder;
  [InteractionResponseType.ChannelMessageWithSource]: ChannelMessageWithSourceBuilder;
  [InteractionResponseType.DeferredChannelMessageWithSource]: DeferredChannelMessageWithSourceBuilder;
  [InteractionResponseType.DeferredMessageUpdate]: DeferredMessageUpdateBuilder;
  [InteractionResponseType.UpdateMessage]: UpdateMessageBuilder;
  [InteractionResponseType.ApplicationCommandAutocompleteResult]: ApplicationCommandAutocompleteResultBuilder;
  [InteractionResponseType.Modal]: ModalBuilder;
}

export class Builder<T extends InteractionType> {
  constructor(
    private interaction: InteractionRequest[keyof InteractionRequest],
  ) {}

  type<E extends AllowedInteractionResponseTypes[T]>(
    type: E,
  ): InteractionResponseTypeBuilder[E] {
    let builder: any = null;
    const interaction = this.interaction as any;
    switch (type) {
      case InteractionResponseType.Pong:
        builder = new PongResponseBuilder(interaction);
        break;
      case InteractionResponseType.ChannelMessageWithSource:
        builder = new ChannelMessageWithSourceBuilder(interaction);
        break;
      case InteractionResponseType.DeferredChannelMessageWithSource:
        builder = new DeferredChannelMessageWithSourceBuilder(interaction);
        break;
      case InteractionResponseType.DeferredMessageUpdate:
        builder = new DeferredMessageUpdateBuilder(interaction);
        break;
      case InteractionResponseType.UpdateMessage:
        builder = new UpdateMessageBuilder(interaction);
        break;
      case InteractionResponseType.ApplicationCommandAutocompleteResult:
        builder = new ApplicationCommandAutocompleteResultBuilder(interaction);
        break;
      case InteractionResponseType.Modal:
        builder = new ModalBuilder(interaction);
        break;
    }
    return builder;
  }
}
