import type {
  ApplicationCommandHandler,
  AutocompleteHandler,
  DeferredApplicationCommandHandler,
  DeferredAutocompleteHandler,
  DeferredMessageComponentHandler,
  DeferredModalSubmitHandler,
  InteractionHandler,
  MessageComponentHandler,
  ModalSubmitHandler,
  PingHandler,
} from "../handler";
import type { InteractionType } from "discord-api-types/v10";

export type InteractionHandlerMap = {
  [InteractionType.Ping]: PingHandler;
  [InteractionType.ApplicationCommand]:
    | ApplicationCommandHandler
    | DeferredApplicationCommandHandler;
  [InteractionType.MessageComponent]:
    | MessageComponentHandler
    | DeferredMessageComponentHandler;
  [InteractionType.ApplicationCommandAutocomplete]:
    | AutocompleteHandler
    | DeferredAutocompleteHandler;
  [InteractionType.ModalSubmit]:
    | ModalSubmitHandler
    | DeferredModalSubmitHandler;
};

export interface InteractionHandlerRegistry {
  register<K extends InteractionType>(
    type: K,
    handler: InteractionHandlerMap[K],
  ): void;

  get<K extends InteractionType>(type: K): InteractionHandlerMap[K][];
}

export interface InteractionHandlerRegistry {
  register<K extends InteractionType>(
    type: K,
    handler: InteractionHandler<K>,
  ): void;
  get<K extends InteractionType>(type: K): InteractionHandler<K>[];
}
