import {
  InteractionRequest,
  InteractionResponse,
  InteractionType,
} from "types";

export interface BaseInteractionHandler<Type extends InteractionType> {
  handle(
    component: InteractionRequest[Type],
  ): Promise<InteractionResponse[Type]>;
}

export interface PingHandler extends BaseInteractionHandler<InteractionType.Ping> {}

export interface ApplicationCommandHandler extends BaseInteractionHandler<InteractionType.ApplicationCommand> {
  name: string;
  description: string;
}

export interface MessageComponentHandler extends BaseInteractionHandler<InteractionType.MessageComponent> {}
export interface AutocompleteHandler extends BaseInteractionHandler<InteractionType.ApplicationCommandAutocomplete> {}
export interface ModalSubmitHandler extends BaseInteractionHandler<InteractionType.ModalSubmit> {}

export type InteractionHandler<K extends InteractionType> =
  K extends InteractionType.Ping
    ? PingHandler
    : K extends InteractionType.ApplicationCommand
      ? ApplicationCommandHandler
      : K extends InteractionType.MessageComponent
        ? MessageComponentHandler
        : K extends InteractionType.ApplicationCommandAutocomplete
          ? AutocompleteHandler
          : K extends InteractionType.ModalSubmit
            ? ModalSubmitHandler
            : never;
