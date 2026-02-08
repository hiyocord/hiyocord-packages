import type {
  InteractionType,
  InteractionResponseType,
  APIInteraction,
  APIPingInteraction,
  APIApplicationCommandInteraction,
  APIMessageComponentInteraction,
  APIApplicationCommandAutocompleteInteraction,
  APIModalSubmitInteraction,
  APIInteractionResponse,
} from "discord-api-types/v10";

export interface InteractionRequest {
  [InteractionType.Ping]: APIPingInteraction;
  [InteractionType.ApplicationCommand]: APIApplicationCommandInteraction;
  [InteractionType.MessageComponent]: APIMessageComponentInteraction;
  [InteractionType.ApplicationCommandAutocomplete]: APIApplicationCommandAutocompleteInteraction;
  [InteractionType.ModalSubmit]: APIModalSubmitInteraction;
}

export const equalsInteractionType = <T extends InteractionType>(
  interaction: APIInteraction,
  type: T,
): interaction is InteractionRequest[T] => {
  return interaction.type === type;
};

export interface AllowedInteractionResponseTypes {
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
}

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
