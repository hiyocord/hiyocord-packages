import { InteractionType } from "discord-api-types/v10";
import type { TypedInteractionHandlerResolver } from "../resolver";
import type { APIInteractionByType } from "../../../types";
import type { InteractionHandlerRegistry } from "../../registry";

export class SimpleMessageComponentHandlerResolver implements TypedInteractionHandlerResolver<InteractionType.MessageComponent> {
  constructor(private registry: InteractionHandlerRegistry) {}

  find(interaction: APIInteractionByType<InteractionType.MessageComponent>) {
    for (const handler of this.registry.get(InteractionType.MessageComponent)) {
      if (handler.metadata.customId === interaction.data.custom_id) {
        return [handler];
      }
    }
    return [];
  }

  findFirst(
    interaction: APIInteractionByType<InteractionType.MessageComponent>,
  ) {
    const handler = this.find(interaction);
    return handler[0] ?? null;
  }
}
