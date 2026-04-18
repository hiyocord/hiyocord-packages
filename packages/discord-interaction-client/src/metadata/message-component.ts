import type { InteractionType } from "discord-api-types/v10";

export type MessageComponentMetadata = {
  type: InteractionType.MessageComponent;
  customId: string;
};
