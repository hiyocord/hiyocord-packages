import { InteractionRequest } from "../../types";
import type { InteractionType } from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class PongResponseBuilder {
  constructor(private interaction: InteractionRequest[InteractionType.Ping]) {}

  build() {
    return {
      type: InteractionResponseType.Pong,
    };
  }
}
