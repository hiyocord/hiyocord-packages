export * from "./application-command";

import { InteractionHandlerRegistry } from "../../registry";
import { InteractionType } from "../../../types";
import {
  DelegatingTypedInteractionHandlerResolver,
  TypedHandlerResolver,
} from "../resolver";
import { SimpleApplicationCommandHandlerResolver } from "./application-command";

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
      new SimpleApplicationCommandHandlerResolver(),
    );
    super(registry, resolvers);
  }
}
