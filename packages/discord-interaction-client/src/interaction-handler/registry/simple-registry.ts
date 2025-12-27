import { InteractionHandler } from "../handler";
import { InteractionType } from "../../types";
import { InteractionHandlerRegistry } from "./registry";

export class SimpleInteractionHandlerRegistry implements InteractionHandlerRegistry {
  private handlers: {
    [K in InteractionType]: Array<InteractionHandler<K>>;
  } = {
    [InteractionType.Ping]: [],
    [InteractionType.ApplicationCommand]: [],
    [InteractionType.MessageComponent]: [],
    [InteractionType.ApplicationCommandAutocomplete]: [],
    [InteractionType.ModalSubmit]: [],
  };

  register<K extends InteractionType>(type: K, handler: InteractionHandler<K>) {
    this.handlers[type].push(handler);
  }

  get<K extends InteractionType>(type: K) {
    return [...this.handlers[type]];
  }
}
