import type { InteractionRequest } from "../../types";
import type {
  APIModalInteractionResponseCallbackComponent,
  InteractionType,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class ModalBuilder {
  constructor(
    private interaction: InteractionRequest[
      | InteractionType.ApplicationCommand
      | InteractionType.MessageComponent
      | InteractionType.ModalSubmit],
  ) {}

  build(
    title: string,
    custom_id: string,
    components: APIModalInteractionResponseCallbackComponent[],
  ) {
    return {
      type: InteractionResponseType.Modal,
      data: {
        title,
        custom_id,
        components,
      },
    };
  }
}
