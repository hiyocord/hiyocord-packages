import type {
  APIModalSubmitInteraction,
  InteractionType,
} from "discord-api-types/v10";
import type { TypedHandlerResolver } from "../resolver";
import type { InteractionHandlerMap } from "interaction-handler/registry/registry";

export class SimpleModalSubmitHandlerResolver implements TypedHandlerResolver<InteractionType.ModalSubmit> {
  get(
    handlers: InteractionHandlerMap[InteractionType.ModalSubmit][],
    interaction: APIModalSubmitInteraction,
  ) {
    for (const handler of handlers) {
      if (handler.customId === interaction.data.custom_id) {
        return [handler];
      }
    }
    return [];
  }

  getFirst(
    handlers: InteractionHandlerMap[InteractionType.ModalSubmit][],
    interaction: APIModalSubmitInteraction,
  ) {
    const handler = this.get(handlers, interaction);
    return handler[0] ?? null;
  }
}
