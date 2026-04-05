import { APIApplicationCommandAttachmentOption, APIApplicationCommandBooleanOption, APIApplicationCommandChannelOption, APIApplicationCommandIntegerOption, APIApplicationCommandMentionableOption, APIApplicationCommandNumberOption, APIApplicationCommandRoleOption, APIApplicationCommandStringOption, APIApplicationCommandSubcommandGroupOption, APIApplicationCommandSubcommandOption, APIApplicationCommandUserOption, APIInteractionDataResolved, ApplicationCommandOptionType, ApplicationCommandType, InteractionResponseType, InteractionType, RESTPatchAPIWebhookWithTokenMessageJSONBody, RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10"
import { APIInteractionByType, InteractionResponse, InteractionResponseForResponseType } from "types";
import { BlankEnv } from "./handler";
import { FollowupMessageUpdateBuilder, FollowupReplyBuilder } from "response-builder";

export type BaseInteractionHandler<
  Deferred extends boolean,
  Type extends InteractionType,
  Env extends BlankEnv,
  Data
> = {
  type: Type
  deferred: Deferred
  handle(
    component: APIInteractionByType<Type>,
    context: {
      request: Request;
      env: Env;
    },
  ): Promise<
    Deferred extends true
      ? {
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
      : {
        deferred: false;
        response: InteractionResponse[Type];
      }
    >
}

export type ApplicationCommandOption =
  | APIApplicationCommandAttachmentOption
  | APIApplicationCommandBooleanOption
  | APIApplicationCommandChannelOption
  | APIApplicationCommandIntegerOption
  | APIApplicationCommandMentionableOption
  | APIApplicationCommandNumberOption
  | APIApplicationCommandRoleOption
  | APIApplicationCommandStringOption
  | APIApplicationCommandSubcommandGroupOption
  | APIApplicationCommandSubcommandOption
  | APIApplicationCommandUserOption

export type OptionNames<Options extends ApplicationCommandOption[]> = Options[number]["name"]
export type OptionTypeByName<Options extends ApplicationCommandOption[], Name extends string> = Options[number] & {
  name: Name
}

export type ApplicationCommandDataOption<Options extends ApplicationCommandOption[]> = {
    [K in OptionNames<Options>]: {
      name: K,
      type: OptionTypeByName<Options, K>["type"]
      value: string
    }
  }[OptionNames<Options>][]

export type ApplicationCommandHandler<
  Deferred extends boolean,
  Env extends BlankEnv,
  Type extends ApplicationCommandType,
  Options extends ApplicationCommandOption[]
> = BaseInteractionHandler<
  Deferred,
  InteractionType.ApplicationCommand,
  Env,
  {
    type: Type,
    options: ApplicationCommandDataOption<Options>
  }
> & {
  name: string,
  description: string,
  guildIds: string[],
  options: Options
}

