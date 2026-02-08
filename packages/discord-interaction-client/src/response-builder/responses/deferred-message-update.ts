import type {
  InteractionRequest,
  InteractionResponseForResponseType,
} from "../../types";
import type { InteractionType } from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class DeferredMessageUpdateBuilder {
  constructor(
    private interaction: InteractionRequest[
      | InteractionType.MessageComponent
      | InteractionType.ModalSubmit],
    private response: InteractionResponseForResponseType<InteractionResponseType.DeferredMessageUpdate> = {
      type: InteractionResponseType.DeferredMessageUpdate,
    },
  ) {}

  build<T>(func: () => T | Promise<T>) {
    return [this.response, func] as const;
  }
}
