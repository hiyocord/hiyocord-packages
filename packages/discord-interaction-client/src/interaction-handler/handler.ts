import type {
  InteractionRequest,
  InteractionResponse,
  InteractionResponseForResponseType,
} from "../types";
import type {
  InteractionResponseType,
  InteractionType,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
} from "discord-api-types/v10";
import type { Snowflake } from "discord-api-types/globals";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";
import type {
  FollowupMessageUpdateBuilder,
  FollowupReplyBuilder,
} from "../response-builder";

export interface BaseInteractionHandler<
  Type extends InteractionType,
  Deferred extends boolean = false,
  Env = unknown,
> {
  handle(
    component: InteractionRequest[Type],
    context: {
      request: Request;
      env: Env;
    },
  ): Deferred extends true
    ? Promise<
        | {
            deferred: true;
            response: InteractionResponseForResponseType<InteractionResponseType.DeferredChannelMessageWithSource>;
            followup: (
              builder: FollowupReplyBuilder,
            ) =>
              | RESTPostAPIWebhookWithTokenJSONBody
              | Promise<RESTPostAPIWebhookWithTokenJSONBody>;
          }
        | {
            deferred: true;
            response: InteractionResponseForResponseType<InteractionResponseType.DeferredMessageUpdate>;
            followup: (
              builder: FollowupMessageUpdateBuilder,
            ) =>
              | RESTPatchAPIWebhookWithTokenMessageJSONBody
              | Promise<RESTPatchAPIWebhookWithTokenMessageJSONBody>;
          }
      >
    : Promise<{
        deferred: false;
        response: InteractionResponse[Type];
      }>;
}

interface BaseApplicationCommandHandler<
  Deferred extends boolean,
> extends BaseInteractionHandler<InteractionType.ApplicationCommand, Deferred> {
  name: string;
  description: string;
  guildIds: Snowflake[];
}

interface BaseMessageComponentHandler<
  Deferred extends boolean,
> extends BaseInteractionHandler<InteractionType.MessageComponent, Deferred> {
  customId: string;
}

type BaseAutocompleteHandler<Deferred extends boolean> = BaseInteractionHandler<
  InteractionType.ApplicationCommandAutocomplete,
  Deferred
>;

interface BaseModalSubmitHandler<
  Deferred extends boolean,
> extends BaseInteractionHandler<InteractionType.ModalSubmit, Deferred> {
  customId: string;
}

export type PingHandler = BaseInteractionHandler<InteractionType.Ping, false>;
export type ApplicationCommandHandler = BaseApplicationCommandHandler<false>;
export type DeferredApplicationCommandHandler =
  BaseApplicationCommandHandler<true>;
export type MessageComponentHandler = BaseMessageComponentHandler<false>;
export type DeferredMessageComponentHandler = BaseMessageComponentHandler<true>;
export type AutocompleteHandler = BaseAutocompleteHandler<false>;
export type DeferredAutocompleteHandler = BaseAutocompleteHandler<true>;
export type ModalSubmitHandler = BaseModalSubmitHandler<false>;
export type DeferredModalSubmitHandler = BaseModalSubmitHandler<true>;

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
            : BaseInteractionHandler<keyof InteractionRequest & { type: K }>;
