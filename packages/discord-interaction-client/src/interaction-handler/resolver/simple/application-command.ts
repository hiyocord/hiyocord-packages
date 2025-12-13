import { InteractionType } from "../../../types";
import { TypedHandlerResolver } from "../resolver";

export class SimpleApplicationCommandHandlerResolver implements TypedHandlerResolver<InteractionType.ApplicationCommand> {
  get(handlers, interaction) {
    for (const handler of handlers) {
      if (handler.name === interaction.data.name) {
        return [handler];
      }
    }
    return [];
  }

  getFirst(handlers, interaction) {
    const handler = this.get(handlers, interaction);
    return handler ? handler[0] : null;
  }
}
