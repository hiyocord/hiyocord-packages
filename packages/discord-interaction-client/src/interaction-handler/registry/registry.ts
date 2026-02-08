import type { InteractionHandler } from "../handler";
import type { InteractionType } from "discord-api-types/v10";

export interface InteractionHandlerRegistry {
  register<K extends InteractionType>(
    type: K,
    handler: InteractionHandler<K>,
  ): void;
  get<K extends InteractionType>(type: K): InteractionHandler<K>[];
}
