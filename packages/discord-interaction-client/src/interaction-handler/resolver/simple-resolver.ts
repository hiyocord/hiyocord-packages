import {
  ApplicationCommandHandler,
  InteractionHandler,
} from "interaction-handler/handler";
import { InteractionHandlerRegistry } from "interaction-handler/registry/registry";
import { InteractionRequest, InteractionType } from "types";
import { InteractionHandlerResolver } from "./resolver";

export class SimpleInteractionHandlerResolver implements InteractionHandlerResolver {
  constructor(private registry: InteractionHandlerRegistry) {}

  private isMatch<T extends InteractionType>(
    interaction: InteractionRequest[T],
    handler: InteractionHandler<T>,
  ): boolean {
    if (interaction.type === InteractionType.ApplicationCommand) {
      return (
        (handler as ApplicationCommandHandler).name === interaction.data.name
      );
    }
    // TODO implement other matching logic
    throw new Error("unsupported interaction type");
  }

  findFirst<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): InteractionHandler<K> | null {
    const handlers = this.registry.get(
      interaction.type,
    ) as InteractionHandler<K>[];
    if (interaction.type === InteractionType.Ping) {
      return handlers ? handlers[0] : null;
    }

    for (const handler of handlers) {
      if (this.isMatch(interaction, handler)) {
        return handler;
      }
    }

    return null;
  }

  find<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): Array<InteractionHandler<K>> | null {
    const handlers = this.registry.get(
      interaction.type,
    ) as InteractionHandler<K>[];
    if (interaction.type === InteractionType.Ping) {
      return handlers;
    }

    let result: Array<InteractionHandler<K>> = [];
    for (const handler of handlers) {
      if (this.isMatch(interaction, handler)) {
        result.push(handler);
      }
    }

    return result;
  }
}
