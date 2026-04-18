import type { Snowflake } from "discord-api-types/globals";
import type { ApplicationCommandMetadata } from "../../metadata/application-command";
import { InteractionType } from "discord-api-types/v10";
import type { InteractionDefinition } from "../../handler/registry/registry";
import type { MessageApplicationCommandHandler } from "../../handler/application-command";
import type { BlankEnv } from "../../types";

export class MessageApplicationCommandFactory<Env extends BlankEnv> {
  constructor(private metadata: ApplicationCommandMetadata) {}

  guildIds(guildIds: Snowflake[] | (() => Snowflake[])) {
    if (guildIds) {
      return new MessageApplicationCommandFactory<Env>({
        ...this.metadata,
        guildIds: typeof guildIds === "function" ? guildIds() : guildIds,
      });
    } else {
      return this;
    }
  }

  handler(handler: MessageApplicationCommandHandler<boolean, Env>) {
    return {
      type: InteractionType.ApplicationCommand,
      metadata: this.metadata,
      handler,
    } satisfies InteractionDefinition<InteractionType.ApplicationCommand>;
  }
}

export const createMessageCommand = (name: string, description: string) => {
  return new MessageApplicationCommandFactory({
    type: InteractionType.ApplicationCommand,
    name,
    description,
  });
};
