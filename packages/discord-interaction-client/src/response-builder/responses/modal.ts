import {
  APIModalInteractionResponseCallbackComponent,
  InteractionRequest,
  InteractionResponseType,
  InteractionType,
} from "types";

export class ModalBuilder {
  constructor(private interaction: InteractionRequest[InteractionType.Ping]) {}

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
