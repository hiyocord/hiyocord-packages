export * from "./application-command";

import type { InteractionHandlerRegistry } from "../../registry";
import { InteractionType } from "discord-api-types/v10";
import type { TypedHandlerResolver } from "../resolver";
import { DelegatingTypedInteractionHandlerResolver } from "../resolver";
import { SimpleApplicationCommandHandlerResolver } from "./application-command";
import { SimpleMessageComponentHandlerResolver } from "./message-component";
import { SimpleModalSubmitHandlerResolver } from "./modal-submit";

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
    resolvers.set(
      InteractionType.MessageComponent,
      new SimpleMessageComponentHandlerResolver(),
    );
    resolvers.set(
      InteractionType.ModalSubmit,
      new SimpleModalSubmitHandlerResolver(),
    );
    super(registry, resolvers);
  }
}
