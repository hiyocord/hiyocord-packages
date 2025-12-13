import {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandInteraction,
  APIInteraction,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
  APIPingInteraction,
  equalsInteractionType,
  InteractionResponseType,
  InteractionType,
} from "../types";
import { PongResponseBuilder } from "./responses/pong";
import { ChannelMessageWithSourceBuilder } from "./responses/channel-message-with-source";
import { DeferredChannelMessageWithSourceBuilder } from "./responses/deferred-channel-message-with-source";
import { DeferredMessageUpdateBuilder } from "./responses/deferred-message-update";
import { UpdateMessageBuilder } from "./responses/update-message";
import { ModalBuilder } from "./responses";

export function createBuilder(
  interaction: APIPingInteraction,
): PongResponseBuilder;

export function createBuilder(interaction: APIApplicationCommandInteraction): {
  reply: () => ChannelMessageWithSourceBuilder;
  defer: () => DeferredChannelMessageWithSourceBuilder;
  modal: () => ModalBuilder;
};

export function createBuilder(interaction: APIMessageComponentInteraction): {
  reply: () => ChannelMessageWithSourceBuilder;
  update: () => UpdateMessageBuilder;
  defer: () => DeferredMessageUpdateBuilder;
  modal: () => ModalBuilder;
};

export function createBuilder(
  interaction: APIApplicationCommandAutocompleteInteraction,
): InteractionResponseType.ApplicationCommandAutocompleteResult;

export function createBuilder(interaction: APIModalSubmitInteraction): {
  reply: () => ChannelMessageWithSourceBuilder;
  update: () => UpdateMessageBuilder;
  defer: () => DeferredMessageUpdateBuilder;
  modal: () => ModalBuilder;
};

export function createBuilder<T extends APIInteraction>(interaction: T) {
  if (equalsInteractionType(interaction, InteractionType.Ping)) {
    return new PongResponseBuilder(interaction);
  } else if (
    equalsInteractionType(interaction, InteractionType.ApplicationCommand)
  ) {
    return {
      reply: () => new ChannelMessageWithSourceBuilder(interaction),
      defer: () => new DeferredChannelMessageWithSourceBuilder(interaction),
      modal: () => new ModalBuilder(interaction),
    };
  } else if (
    equalsInteractionType(interaction, InteractionType.MessageComponent)
  ) {
    return {
      reply: () => new ChannelMessageWithSourceBuilder(interaction),
      update: () => new UpdateMessageBuilder(interaction),
      defer: () => new DeferredMessageUpdateBuilder(interaction),
      modal: () => new ModalBuilder(interaction),
    };
  } else if (
    equalsInteractionType(
      interaction,
      InteractionType.ApplicationCommandAutocomplete,
    )
  ) {
    return InteractionResponseType.ApplicationCommandAutocompleteResult;
  } else if (equalsInteractionType(interaction, InteractionType.ModalSubmit)) {
    return {
      reply: () => new ChannelMessageWithSourceBuilder(interaction),
      update: () => new UpdateMessageBuilder(interaction),
      defer: () => new DeferredMessageUpdateBuilder(interaction),
      modal: () => new ModalBuilder(interaction),
    };
  }
}
