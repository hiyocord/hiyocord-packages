import type {
  APIApplicationCommandInteraction,
  InteractionType,
} from "discord-api-types/v10";
import type { TypedHandlerResolver } from "../resolver";
import type { InteractionHandlerMap } from "interaction-handler/registry/registry";

export class SimpleApplicationCommandHandlerResolver implements TypedHandlerResolver<InteractionType.ApplicationCommand> {
  get(
    handlers: InteractionHandlerMap[InteractionType.ApplicationCommand][],
    interaction: APIApplicationCommandInteraction,
  ) {
    for (const handler of handlers) {
      if (handler.name === interaction.data.name) {
        return [handler];
      }
    }
    return [];
  }

  getFirst(
    handlers: InteractionHandlerMap[InteractionType.ApplicationCommand][],
    interaction: APIApplicationCommandInteraction,
  ) {
    const handler = this.get(handlers, interaction);
    return handler[0] ?? null;
  }
}
