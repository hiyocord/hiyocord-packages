import type {
  APIApplicationCommandInteractionDataOption,
  APIMessage,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionType,
  Snowflake,
} from "discord-api-types/v10";
import type { APIInteractionByType } from "../types";
import type { BaseInteractionWrapper, ResolvedInteractionWrapper } from ".";
import { createResolvedInteractionWrapper } from ".";

export type ApplicationCommandInteractionByType<
  Type extends ApplicationCommandType = ApplicationCommandType,
> = APIInteractionByType<InteractionType.ApplicationCommand> & {
  data: {
    type: Type;
  };
};

export type ApplicationCommandInteractionWrapper<
  Type extends ApplicationCommandType,
> = BaseInteractionWrapper<InteractionType.ApplicationCommand> &
  ApplicationCommandInteractionByType<Type>;

export type ApplicationCommandOption = Record<
  string,
  {
    type: ApplicationCommandOptionType;
    required: boolean;
  }
>;

export type GetOptionByName<
  Option extends ApplicationCommandOption,
  Name extends keyof Option,
> = Option[Name]["required"] extends true
  ? APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommand> & {
      type: Option[Name]["type"];
    }
  :
      | undefined
      | (APIApplicationCommandInteractionDataOption<InteractionType.ApplicationCommand> & {
          type: Option[Name]["type"];
        });

export type ChatInputApplicationCommandInteractionWrapper<
  Option extends ApplicationCommandOption,
> = ApplicationCommandInteractionWrapper<ApplicationCommandType.ChatInput> &
  ResolvedInteractionWrapper & {
    getOption<Name extends keyof Option>(
      name: Name,
    ): GetOptionByName<Option, Name>;
  };

export const createChatInputApplicationCommandInteractionWrapper = <
  Option extends ApplicationCommandOption,
>(
  c: ApplicationCommandInteractionByType<ApplicationCommandType.ChatInput>,
): ChatInputApplicationCommandInteractionWrapper<Option> => {
  return {
    ...c,
    raw: c,
    getOption: (name) =>
      c.data.options?.find((it) => it.name === name) as GetOptionByName<
        Option,
        typeof name
      >,
    ...createResolvedInteractionWrapper(c.data.resolved),
  };
};

export type MessageApplicationCommandInteractionWrapper =
  ApplicationCommandInteractionWrapper<ApplicationCommandType.Message> & {
    getMessage: (id?: Snowflake) => APIMessage | undefined;
  };

export const createMessageApplicationCommandInteractionWrapper = (
  c: ApplicationCommandInteractionByType<ApplicationCommandType.Message>,
): MessageApplicationCommandInteractionWrapper => {
  return {
    ...c,
    raw: c,
    getMessage: (id) => {
      if (id) {
        return c.data.resolved.messages[id];
      } else {
        return undefined;
      }
    },
  };
};

export type PrimaryEntryPointApplicationCommandInteractionWrapper =
  ApplicationCommandInteractionWrapper<ApplicationCommandType.PrimaryEntryPoint>;

export const createPrimaryEntryPointApplicationCommandInteractionWrapper = (
  c: ApplicationCommandInteractionByType<ApplicationCommandType.PrimaryEntryPoint>,
): PrimaryEntryPointApplicationCommandInteractionWrapper => {
  return {
    ...c,
    raw: c,
  };
};

export type UserApplicationCommandInteractionWrapper =
  ApplicationCommandInteractionWrapper<ApplicationCommandType.User> &
    ResolvedInteractionWrapper<"member" | "user">;

export const createUserApplicationCommandInteractionWrapper = (
  c: ApplicationCommandInteractionByType<ApplicationCommandType.User>,
): UserApplicationCommandInteractionWrapper => {
  return {
    ...c,
    raw: c,
    ...createResolvedInteractionWrapper(c.data.resolved),
  };
};
