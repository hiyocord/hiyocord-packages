import type { InteractionType } from "discord-api-types/v10";

export type ModalSubmitMetadata = {
  type: InteractionType.ModalSubmit;
  customId: string;
};
