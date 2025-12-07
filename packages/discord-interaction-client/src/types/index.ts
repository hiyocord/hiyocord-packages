import {
  InteractionType,
  InteractionResponseType,
} from "discord-api-types/v10";

import { APIApplicationCommandInteraction } from "./applicationCommands";
import { APIApplicationCommandAutocompleteInteraction } from "./autocomplete";
import { APIModalSubmitInteraction } from "./modalSubmit";
import { APIMessageComponentInteraction } from "./messageComponents";
import { APIPingInteraction } from "./ping";
import { APIInteractionResponse } from "./responses";

// export types
export type { Snowflake } from "discord-api-types/globals";
export type {
  APIInteraction,
  APIAllowedMentions,
  RESTAPIAttachment,
  APIMessageTopLevelComponent,
  APIEmbed,
  RESTAPIPoll,
  APIApplicationCommandOptionChoice,
  APIModalInteractionResponseCallbackComponent,
} from "discord-api-types/v10";
export {
  MessageFlags,
  InteractionType,
  InteractionResponseType,
} from "discord-api-types/v10";
export * from "./applicationCommands";
export * from "./autocomplete";
export * from "./base";
export * from "./messageComponents";
export * from "./modalSubmit";
export * from "./ping";
export * from "./responses";

export interface InteractionRequest {
  [InteractionType.Ping]: APIPingInteraction;
  [InteractionType.ApplicationCommand]: APIApplicationCommandInteraction;
  [InteractionType.MessageComponent]: APIMessageComponentInteraction;
  [InteractionType.ApplicationCommandAutocomplete]: APIApplicationCommandAutocompleteInteraction;
  [InteractionType.ModalSubmit]: APIModalSubmitInteraction;
}

export const isPing = (
  interaction: InteractionRequest[keyof InteractionRequest],
): interaction is APIPingInteraction => {
  return interaction.type === InteractionType.Ping;
};

export const isApplicationCommand = (
  interaction: InteractionRequest[keyof InteractionRequest],
): interaction is APIApplicationCommandInteraction => {
  return interaction.type === InteractionType.ApplicationCommand;
};

export const isMessageComponent = (
  interaction: InteractionRequest[keyof InteractionRequest],
): interaction is APIMessageComponentInteraction => {
  return interaction.type === InteractionType.MessageComponent;
};

export const isApplicationCommandAutocomplete = (
  interaction: InteractionRequest[keyof InteractionRequest],
): interaction is APIApplicationCommandAutocompleteInteraction => {
  return interaction.type === InteractionType.ApplicationCommandAutocomplete;
};

export const isModalSubmit = (
  interaction: InteractionRequest[keyof InteractionRequest],
): interaction is APIModalSubmitInteraction => {
  return interaction.type === InteractionType.ModalSubmit;
};

export type AllowedInteractionResponseTypes = {
  [InteractionType.Ping]: InteractionResponseType.Pong;

  [InteractionType.ApplicationCommand]:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.DeferredChannelMessageWithSource
    | InteractionResponseType.Modal;

  [InteractionType.MessageComponent]:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.UpdateMessage
    | InteractionResponseType.DeferredMessageUpdate
    | InteractionResponseType.Modal;

  [InteractionType.ApplicationCommandAutocomplete]: InteractionResponseType.ApplicationCommandAutocompleteResult;

  [InteractionType.ModalSubmit]:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.UpdateMessage
    | InteractionResponseType.DeferredMessageUpdate
    | InteractionResponseType.Modal;
};

export type InteractionResponseForResponseType<
  T extends InteractionResponseType,
> = APIInteractionResponse & {
  type: T;
};

export type InteractionResponse = {
  [K in keyof AllowedInteractionResponseTypes]: AllowedInteractionResponseTypes[K] extends infer R
    ? R extends InteractionResponseType
      ? InteractionResponseForResponseType<R>
      : never
    : never;
};
