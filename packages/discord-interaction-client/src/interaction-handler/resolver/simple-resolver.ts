import { InteractionHandlerRegistry } from "../registry";
import { InteractionType } from "../../types";
import {
  DelegatingTypedInteractionHandlerResolver,
  TypedHandlerResolver,
} from "./resolver";

class SimpleApplicationCommandHandlerContainer implements TypedHandlerResolver<InteractionType.ApplicationCommand> {
  get(handlers, interaction) {
    for (const handler of handlers) {
      if (handler.name === interaction.data.name) {
        return handler;
      }
    }
    return null;
  }

  getFirst(handlers, interaction) {
    const handler = this.get(handlers, interaction);
    return handler ? handler[0] : null;
  }
}

/**
 * シンプルなハンドラ解決を行う`InteractionHandlerResolver`の実装。
 */
export class SimpleInteractionHandlerResolver extends DelegatingTypedInteractionHandlerResolver {
  constructor(registry: InteractionHandlerRegistry) {
    const resolvers = new Map<
      InteractionType,
      TypedHandlerResolver<InteractionType>
    >();
    resolvers.set(
      InteractionType.ApplicationCommand,
      new SimpleApplicationCommandHandlerContainer(),
    );
    super(registry, resolvers);
  }
}
