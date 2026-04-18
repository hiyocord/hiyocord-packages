import type { InteractionType } from "discord-api-types/v10";
import type { BaseInteractionWrapper, ResolvedInteractionWrapper } from ".";
import { createResolvedInteractionWrapper } from ".";
import type { APIInteractionByType } from "../types";

export type ModalSubmitInteractionWrapper =
  BaseInteractionWrapper<InteractionType.ModalSubmit> &
    ResolvedInteractionWrapper;

export const createModalSubmitInteractionWrapper = (
  c: APIInteractionByType<InteractionType.ModalSubmit>,
): ModalSubmitInteractionWrapper => {
  return {
    ...c,
    raw: c,
    ...createResolvedInteractionWrapper(c.data.resolved),
  };
};
