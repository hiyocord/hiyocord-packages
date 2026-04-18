import type {
  InteractionType,
  InteractionResponseType,
  APIInteraction,
  APIInteractionResponse,
} from "discord-api-types/v10";

export type BlankEnv = object;

export type APIInteractionByType<Type extends InteractionType> =
  APIInteraction & {
    type: Type;
  };

export const equalsInteractionType = <T extends InteractionType>(
  interaction: APIInteraction,
  type: T,
): interaction is APIInteractionByType<T> => {
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
    | InteractionResponseType.DeferredChannelMessageWithSource
    | InteractionResponseType.UpdateMessage
    | InteractionResponseType.DeferredMessageUpdate
    | InteractionResponseType.Modal;

  [InteractionType.ApplicationCommandAutocomplete]: InteractionResponseType.ApplicationCommandAutocompleteResult;

  [InteractionType.ModalSubmit]:
    | InteractionResponseType.ChannelMessageWithSource
    | InteractionResponseType.DeferredChannelMessageWithSource
    | InteractionResponseType.UpdateMessage
    | InteractionResponseType.DeferredMessageUpdate
    | InteractionResponseType.Modal;
}

export type InteractionResponseForResponseType<
  T extends InteractionResponseType,
> = APIInteractionResponse & { type: T };

export type InteractionResponse = {
  [K in keyof AllowedInteractionResponseTypes]: AllowedInteractionResponseTypes[K] extends infer R
    ? R extends InteractionResponseType
      ? InteractionResponseForResponseType<R>
      : never
    : never;
};
