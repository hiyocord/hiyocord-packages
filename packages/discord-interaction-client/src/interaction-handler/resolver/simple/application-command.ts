import type {
  APIApplicationCommandInteraction,
  InteractionType,
} from "discord-api-types/v10";
import {
  ApplicationCommandHandler,
  DeferredApplicationCommandHandler,
} from "../../handler";
import { TypedHandlerResolver } from "../resolver";

export class SimpleApplicationCommandHandlerResolver implements TypedHandlerResolver<InteractionType.ApplicationCommand> {
  get(
    handlers: (ApplicationCommandHandler | DeferredApplicationCommandHandler)[],
    interaction: APIApplicationCommandInteraction,
  ): (ApplicationCommandHandler | DeferredApplicationCommandHandler)[] {
    for (const handler of handlers) {
      if (handler.name === interaction.data.name) {
        return [handler];
      }
    }
    return [];
  }

  getFirst(
    handlers: (ApplicationCommandHandler | DeferredApplicationCommandHandler)[],
    interaction: APIApplicationCommandInteraction,
  ): ApplicationCommandHandler | DeferredApplicationCommandHandler | null {
    const handler = this.get(handlers, interaction);
    return handler ? (handler[0] ?? null) : null;
  }
}
