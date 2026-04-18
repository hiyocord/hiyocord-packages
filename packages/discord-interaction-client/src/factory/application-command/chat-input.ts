import type { Snowflake } from "discord-api-types/globals";
import type { ApplicationCommandMetadata } from "../../metadata/application-command";
import type {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
} from "discord-api-types/v10";
import { InteractionType } from "discord-api-types/v10";
import type { ChatInputApplicationCommandHandler } from "../../handler/application-command";
import type { ApplicationCommandOption } from "../../wrapper";
import type { BlankEnv } from "../../types";
import type { InteractionDefinition } from "../../handler/registry/registry";

export class ChatInputApplicationCommandFactory<
  Env extends BlankEnv,
  Option extends ApplicationCommandOption = ApplicationCommandOption,
> {
  constructor(private metadata: ApplicationCommandMetadata) {}

  guildIds(guildIds: Snowflake[] | (() => Snowflake[])) {
    if (guildIds) {
      return new ChatInputApplicationCommandFactory<Env, Option>({
        ...this.metadata,
        guildIds: typeof guildIds === "function" ? guildIds() : guildIds,
      });
    } else {
      return this;
    }
  }

  option<
    Type extends ApplicationCommandOptionType,
    Name extends string,
    Required extends boolean = false,
  >(
    option: APIApplicationCommandOption & {
      type: Type;
      name: Name;
      required?: Required;
    },
  ) {
    return new ChatInputApplicationCommandFactory<
      Env,
      Option & { [key in Name]: { type: Type; required: Required } }
    >({
      ...this.metadata,
      options: [...(this.metadata.options ?? []), option],
    });
  }

  handler(handler: ChatInputApplicationCommandHandler<Option, boolean, Env>) {
    return {
      type: InteractionType.ApplicationCommand,
      metadata: this.metadata,
      handler,
    } satisfies InteractionDefinition<InteractionType.ApplicationCommand>;
  }
}

export const createSlashCommand = <Env extends BlankEnv = BlankEnv>(
  name: string,
  description: string,
) => {
  return new ChatInputApplicationCommandFactory<Env>({
    type: InteractionType.ApplicationCommand,
    name,
    description,
  });
};
