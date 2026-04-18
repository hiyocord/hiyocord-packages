import type {
  APIInteraction,
  InteractionResponseType,
  InteractionType,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
  RESTPostAPIWebhookWithTokenJSONBody,
} from "discord-api-types/v10";
import type {
  APIInteractionByType,
  BlankEnv,
  InteractionResponse,
  InteractionResponseForResponseType,
} from "types";
import type {
  FollowupMessageUpdateBuilder,
  FollowupReplyBuilder,
} from "response-builder";

export type BaseInteractionHandler<
  Type extends InteractionType = InteractionType,
  Component extends APIInteraction = APIInteractionByType<Type>,
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = (
  component: Component,
  context: {
    request: Request;
    env: Env;
  },
) => Deferred extends true
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
