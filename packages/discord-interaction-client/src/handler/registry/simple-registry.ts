import { InteractionType } from "discord-api-types/v10";

import type {
  InteractionDefinition,
  InteractionHandlerRegistry,
} from "./registry";

export class SimpleInteractionHandlerRegistry implements InteractionHandlerRegistry {
  private handlers: {
    [K in InteractionType]: InteractionDefinition<K>[];
  } = {
    [InteractionType.Ping]: [],
    [InteractionType.ApplicationCommand]: [],
    [InteractionType.MessageComponent]: [],
    [InteractionType.ApplicationCommandAutocomplete]: [],
    [InteractionType.ModalSubmit]: [],
  };

  register<K extends InteractionType>(define: InteractionDefinition<K>) {
    this.handlers[define.type].push(define);
  }

  get<K extends InteractionType>(type: K): InteractionDefinition<K>[] {
    return this.handlers[type].slice(0);
  }
}
