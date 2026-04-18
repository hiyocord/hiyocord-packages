export * from "./application-command";

import type { InteractionHandlerRegistry } from "../../registry";
import { InteractionType } from "discord-api-types/v10";
import { DelegatingTypedInteractionHandlerResolver } from "../resolver";
import { SimpleApplicationCommandHandlerResolver } from "./application-command";

/**
 * シンプルなハンドラ解決を行う`InteractionHandlerResolver`の実装。
 */
export class SimpleInteractionHandlerResolver extends DelegatingTypedInteractionHandlerResolver {
  constructor(registry: InteractionHandlerRegistry) {
    super({
      [InteractionType.ApplicationCommand]:
        new SimpleApplicationCommandHandlerResolver(registry),
    });
  }
}
