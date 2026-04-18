import type { APIInteractionByType } from "../../types";
import type { InteractionType } from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class PongResponseBuilder {
  constructor(
    private interaction: APIInteractionByType<InteractionType.Ping>,
  ) {}

  build() {
    return {
      deferred: false,
      response: {
        type: InteractionResponseType.Pong,
      },
    } as const;
  }
}
