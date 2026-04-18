import { equalsInteractionType } from "../types";
import {
  InteractionType,
  InteractionResponseType,
} from "discord-api-types/v10";
import type {
  APIApplicationCommandAutocompleteInteraction,
  APIApplicationCommandInteraction,
  APIInteraction,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
  APIPingInteraction,
} from "discord-api-types/v10";
import { PongResponseBuilder } from "./responses/pong";
import { ChannelMessageWithSourceBuilder } from "./responses/channel-message-with-source";
import { DeferredChannelMessageWithSourceBuilder } from "./responses/deferred-channel-message-with-source";
import { DeferredMessageUpdateBuilder } from "./responses/deferred-message-update";
import { UpdateMessageBuilder } from "./responses/update-message";
import { ModalBuilder } from "./responses";

export function createBuilder<T extends APIPingInteraction>(
  interaction: T,
): PongResponseBuilder;

export function createBuilder<T extends APIApplicationCommandInteraction>(
  interaction: T,
): {
  reply: () => ChannelMessageWithSourceBuilder;
  defer: () => DeferredChannelMessageWithSourceBuilder;
  modal: () => ModalBuilder;
};

export function createBuilder<T extends APIMessageComponentInteraction>(
  interaction: T,
): {
  reply: () => ChannelMessageWithSourceBuilder;
  update: () => UpdateMessageBuilder;
  deferUpdate: () => DeferredMessageUpdateBuilder;
  deferReply: () => DeferredChannelMessageWithSourceBuilder;
  modal: () => ModalBuilder;
};

export function createBuilder<
  T extends APIApplicationCommandAutocompleteInteraction,
>(interaction: T): InteractionResponseType.ApplicationCommandAutocompleteResult;

export function createBuilder<T extends APIModalSubmitInteraction>(
  interaction: T,
): {
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
      deferUpdate: () => new DeferredMessageUpdateBuilder(interaction),
      deferReply: () =>
        new DeferredChannelMessageWithSourceBuilder(interaction),
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
  return undefined;
}
