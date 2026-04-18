import type {
  APIApplicationCommandAttachmentOption,
  APIApplicationCommandBooleanOption,
  APIApplicationCommandChannelOption,
  APIApplicationCommandIntegerOption,
  APIApplicationCommandMentionableOption,
  APIApplicationCommandNumberOption,
  APIApplicationCommandRoleOption,
  APIApplicationCommandStringOption,
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandSubcommandOption,
  APIApplicationCommandUserOption,
  InteractionType,
  Snowflake,
} from "discord-api-types/v10";

export type ApplicationCommandMetadata = {
  type: InteractionType.ApplicationCommand;
  name: string;
  description: string;
  guildIds?: Snowflake[] | (() => Snowflake[]);
  options?: (
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
  )[];
};
