import type { InteractionType } from "discord-api-types/v10";
import type { BaseInteractionWrapper } from ".";
import type { APIInteractionByType } from "../types";

export type MessageComponentInteractionWrapper =
  BaseInteractionWrapper<InteractionType.MessageComponent>;

export const createMessageComponentInteractionWrapper = (
  c: APIInteractionByType<InteractionType.MessageComponent>,
): MessageComponentInteractionWrapper => {
  return {
    ...c,
    raw: c,
  };
};
