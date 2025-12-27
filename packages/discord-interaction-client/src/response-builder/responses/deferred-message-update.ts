import {
  InteractionRequest,
  InteractionResponseForResponseType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "../../types";

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
