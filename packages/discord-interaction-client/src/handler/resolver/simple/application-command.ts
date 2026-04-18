import type { APIApplicationCommandInteraction } from "discord-api-types/v10";
import { InteractionType } from "discord-api-types/v10";
import type { InteractionHandlerRegistry } from "../../registry/registry";
import type { TypedInteractionHandlerResolver } from "../..";

export class SimpleApplicationCommandHandlerResolver implements TypedInteractionHandlerResolver<InteractionType.ApplicationCommand> {
  constructor(private registry: InteractionHandlerRegistry) {}

  find(interaction: APIApplicationCommandInteraction) {
    for (const define of this.registry.get(
      InteractionType.ApplicationCommand,
    )) {
      if (define.metadata.name === interaction.data.name) {
        return [define];
      }
    }
    return [];
  }

  findFirst(interaction: APIApplicationCommandInteraction) {
    const handler = this.find(interaction);
    return handler[0] ?? null;
  }
}
