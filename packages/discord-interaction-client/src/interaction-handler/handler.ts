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

export type BlankEnv = Record<string, string>;

export interface BaseInteractionHandler<
  Type extends InteractionType,
  Deferred extends boolean = false,
  Env extends BlankEnv = BlankEnv,
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
  Env extends BlankEnv = BlankEnv,
> extends BaseInteractionHandler<
  InteractionType.ApplicationCommand,
  Deferred,
  Env
> {
  name: string;
  description: string;
  guildIds: Snowflake[];
}

interface BaseMessageComponentHandler<
  Deferred extends boolean,
  Env extends BlankEnv = BlankEnv,
> extends BaseInteractionHandler<
  InteractionType.MessageComponent,
  Deferred,
  Env
> {
  customId: string;
}

type BaseAutocompleteHandler<
  Deferred extends boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommandAutocomplete,
  Deferred,
  Env
>;

interface BaseModalSubmitHandler<
  Deferred extends boolean,
  Env extends BlankEnv = BlankEnv,
> extends BaseInteractionHandler<InteractionType.ModalSubmit, Deferred, Env> {
  customId: string;
}

export type PingHandler<Env extends BlankEnv = BlankEnv> =
  BaseInteractionHandler<InteractionType.Ping, false, Env>;
export type ApplicationCommandHandler<Env extends BlankEnv = BlankEnv> =
  BaseApplicationCommandHandler<false, Env>;
export type DeferredApplicationCommandHandler<Env extends BlankEnv = BlankEnv> =
  BaseApplicationCommandHandler<true, Env>;
export type MessageComponentHandler<Env extends BlankEnv = BlankEnv> =
  BaseMessageComponentHandler<false, Env>;
export type DeferredMessageComponentHandler<Env extends BlankEnv = BlankEnv> =
  BaseMessageComponentHandler<true, Env>;
export type AutocompleteHandler<Env extends BlankEnv = BlankEnv> =
  BaseAutocompleteHandler<false, Env>;
export type DeferredAutocompleteHandler<Env extends BlankEnv = BlankEnv> =
  BaseAutocompleteHandler<true, Env>;
export type ModalSubmitHandler<Env extends BlankEnv = BlankEnv> =
  BaseModalSubmitHandler<false, Env>;
export type DeferredModalSubmitHandler<Env extends BlankEnv = BlankEnv> =
  BaseModalSubmitHandler<true, Env>;

export type InteractionHandler<
  K extends InteractionType,
  Env extends BlankEnv = BlankEnv,
> = K extends InteractionType.Ping
  ? PingHandler
  : K extends InteractionType.ApplicationCommand
    ? ApplicationCommandHandler | DeferredApplicationCommandHandler
    : K extends InteractionType.MessageComponent
      ? MessageComponentHandler | DeferredMessageComponentHandler
      : K extends InteractionType.ApplicationCommandAutocomplete
        ? AutocompleteHandler | DeferredAutocompleteHandler
        : K extends InteractionType.ModalSubmit
          ? ModalSubmitHandler | DeferredModalSubmitHandler
          : BaseInteractionHandler<
              keyof InteractionRequest & { type: K },
              boolean,
              Env
            >;
