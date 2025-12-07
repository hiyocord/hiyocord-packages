import { InteractionHandler } from "../handler";
import { InteractionType } from "../../types";

export interface InteractionHandlerRegistry {
  register<K extends InteractionType>(
    type: K,
    handler: InteractionHandler<K>,
  ): void;
  get<K extends InteractionType>(type: K): ReadonlyArray<InteractionHandler<K>>;
}
