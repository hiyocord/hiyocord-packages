import {
  InteractionRequest,
  InteractionResponse,
  InteractionType,
} from "../types";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";

export interface BaseInteractionHandler<
  Type extends InteractionType,
  Deferred extends Boolean = false,
> {
  handle(
    component: InteractionRequest[Type],
  ): Deferred extends true
    ? Promise<readonly [InteractionResponse[Type], () => RESTPostAPIWebhookWithTokenJSONBody | Promise<RESTPostAPIWebhookWithTokenJSONBody | void> | void]>
    : Promise<InteractionResponse[Type]>;
}

interface BaseApplicationCommandHandler<
  Deferred extends Boolean,
> extends BaseInteractionHandler<InteractionType.ApplicationCommand, Deferred> {
  name: string;
  description: string;
}

interface BaseMessageComponentHandler<
  Deferred extends Boolean,
> extends BaseInteractionHandler<InteractionType.MessageComponent, Deferred> {}

interface BaseAutocompleteHandler<
  Deferred extends Boolean,
> extends BaseInteractionHandler<
  InteractionType.ApplicationCommandAutocomplete,
  Deferred
> {}

interface BaseModalSubmitHandler<
  Deferred extends Boolean,
> extends BaseInteractionHandler<InteractionType.ModalSubmit, Deferred> {}

export interface PingHandler extends BaseInteractionHandler<
  InteractionType.Ping,
  false
> {}
export interface ApplicationCommandHandler extends BaseApplicationCommandHandler<false> {}
export interface DeferredApplicationCommandHandler extends BaseApplicationCommandHandler<true> {}
export interface MessageComponentHandler extends BaseMessageComponentHandler<false> {}
export interface DeferredMessageComponentHandler extends BaseMessageComponentHandler<true> {}
export interface AutocompleteHandler extends BaseAutocompleteHandler<false> {}
export interface DeferredAutocompleteHandler extends BaseAutocompleteHandler<true> {}
export interface ModalSubmitHandler extends BaseModalSubmitHandler<false> {}
export interface DeferredModalSubmitHandler extends BaseModalSubmitHandler<true> {}

export type InteractionHandler<K extends InteractionType> =
  K extends InteractionType.Ping
    ? PingHandler
    : K extends InteractionType.ApplicationCommand
      ? ApplicationCommandHandler | DeferredApplicationCommandHandler
      : K extends InteractionType.MessageComponent
        ? MessageComponentHandler | DeferredMessageComponentHandler
        : K extends InteractionType.ApplicationCommandAutocomplete
          ? AutocompleteHandler | DeferredAutocompleteHandler
          : K extends InteractionType.ModalSubmit
            ? ModalSubmitHandler | DeferredModalSubmitHandler
            : never;
