import {
  InteractionRequest,
  InteractionResponseType,
  InteractionType,
} from "../../types";

export class PongResponseBuilder {
  constructor(private interaction: InteractionRequest[InteractionType.Ping]) {}

  build() {
    return {
      type: InteractionResponseType.Pong,
    };
  }
}
