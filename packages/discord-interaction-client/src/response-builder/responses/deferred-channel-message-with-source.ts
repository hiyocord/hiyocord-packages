import type {
  InteractionRequest,
  InteractionResponseForResponseType,
} from "../../types";
import type { InteractionType, MessageFlags } from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class DeferredChannelMessageWithSourceBuilder {
  constructor(
    private interaction: InteractionRequest[InteractionType.ApplicationCommand],
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

  build<T>(func: () => T | Promise<T>) {
    return [this.response, func] as const;
  }
}
