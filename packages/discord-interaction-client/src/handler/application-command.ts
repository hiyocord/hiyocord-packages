import type {
  ApplicationCommandType,
  InteractionType,
} from "discord-api-types/v10";
import type { BaseInteractionHandler } from "./base-handler";
import type {
  ApplicationCommandInteractionByType,
  ApplicationCommandOption,
} from "../wrapper";
import type {
  ChatInputApplicationCommandInteractionWrapper,
  MessageApplicationCommandInteractionWrapper,
  UserApplicationCommandInteractionWrapper,
} from "wrapper/application-command";
import type { BlankEnv } from "../types";

export type ApplicationCommandHandler<
  Type extends ApplicationCommandType,
  Deferred extends boolean,
  Env extends BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommand,
  ApplicationCommandInteractionByType<Type>,
  Deferred,
  Env
>;

export type ChatInputApplicationCommandHandler<
  Options extends ApplicationCommandOption = ApplicationCommandOption,
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommand,
  ChatInputApplicationCommandInteractionWrapper<Options>,
  Deferred,
  Env
>;

export type MessageApplicationCommandHandler<
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommand,
  MessageApplicationCommandInteractionWrapper,
  Deferred,
  Env
>;

export type UserApplicationCommandHandler<
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ApplicationCommand,
  UserApplicationCommandInteractionWrapper,
  Deferred,
  Env
>;
