import {
  InteractionRequest,
  InteractionResponseForResponseType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "../../types";

export class DeferredChannelMessageWithSourceBuilder {
  constructor(
    private interaction: InteractionRequest[InteractionType.Ping],
    private response: InteractionResponseForResponseType<InteractionResponseType.DeferredChannelMessageWithSource> = {
      type: InteractionResponseType.DeferredChannelMessageWithSource,
      data: {},
    },
  ) {}

  flags(flags: MessageFlags) {
    return new DeferredChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, flags },
    });
  }

  build() {
    return this.response;
  }
}
