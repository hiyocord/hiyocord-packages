import type {
  APIMessageComponentInteraction,
  InteractionType,
} from "discord-api-types/v10";
import type { TypedHandlerResolver } from "../resolver";
import type { InteractionHandlerMap } from "interaction-handler/registry/registry";

export class SimpleMessageComponentHandlerResolver implements TypedHandlerResolver<InteractionType.MessageComponent> {
  get(
    handlers: InteractionHandlerMap[InteractionType.MessageComponent][],
    interaction: APIMessageComponentInteraction,
  ) {
    for (const handler of handlers) {
      if (handler.customId === interaction.data.custom_id) {
        return [handler];
      }
    }
    return [];
  }

  getFirst(
    handlers: InteractionHandlerMap[InteractionType.MessageComponent][],
    interaction: APIMessageComponentInteraction,
  ) {
    const handler = this.get(handlers, interaction);
    return handler[0] ?? null;
  }
}
