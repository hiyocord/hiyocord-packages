import { InteractionHandler } from "../handler";
import { InteractionRequest, InteractionType } from "../../types";

export interface InteractionHandlerResolver {
  findFirst<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): InteractionHandler<K> | null;
  find<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): Array<InteractionHandler<K>> | null;
}
