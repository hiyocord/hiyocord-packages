import type { InteractionRequest, InteractionResponse } from "../types";
import type { InteractionType } from "discord-api-types/v10";
import type { Snowflake } from "discord-api-types/globals";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";

export interface BaseInteractionHandler<
  Type extends InteractionType,
  Deferred extends boolean = false,
> {
  handle(
    component: InteractionRequest[Type],
  ): Deferred extends true
    ? Promise<
        readonly [
          InteractionResponse[Type],
          () =>
            | RESTPostAPIWebhookWithTokenJSONBody
            | Promise<RESTPostAPIWebhookWithTokenJSONBody | void>
            | void,
        ]
      >
    : Promise<InteractionResponse[Type]>;
}

interface BaseApplicationCommandHandler<
  Deferred extends boolean,
> extends BaseInteractionHandler<InteractionType.ApplicationCommand, Deferred> {
  name: string;
  description: string;
  guildIds: Snowflake[];
}

type BaseMessageComponentHandler<
  Deferred extends boolean,
> = BaseInteractionHandler<InteractionType.MessageComponent, Deferred>

type BaseAutocompleteHandler<
  Deferred extends boolean,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommandAutocomplete,
  Deferred
>

type BaseModalSubmitHandler<Deferred extends boolean> = BaseInteractionHandler<InteractionType.ModalSubmit, Deferred>

export type PingHandler = BaseInteractionHandler<
  InteractionType.Ping,
  false
>
export type ApplicationCommandHandler = BaseApplicationCommandHandler<false>
export type DeferredApplicationCommandHandler = BaseApplicationCommandHandler<true>
export type MessageComponentHandler = BaseMessageComponentHandler<false>
export type DeferredMessageComponentHandler = BaseMessageComponentHandler<true>
export type AutocompleteHandler = BaseAutocompleteHandler<false>
export type DeferredAutocompleteHandler = BaseAutocompleteHandler<true>
export type ModalSubmitHandler = BaseModalSubmitHandler<false>
export type DeferredModalSubmitHandler = BaseModalSubmitHandler<true>

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
