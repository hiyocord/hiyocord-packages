import {
  InteractionRequest,
  InteractionResponseForResponseType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "types";

export class DeferredMessageUpdateBuilder {
  constructor(
    private interaction: InteractionRequest[InteractionType.Ping],
    private response: InteractionResponseForResponseType<InteractionResponseType.DeferredMessageUpdate> = {
      type: InteractionResponseType.DeferredMessageUpdate,
    },
  ) {}

  build() {
    return this.response;
  }
}
