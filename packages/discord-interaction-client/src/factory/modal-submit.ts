import { InteractionType } from "discord-api-types/v10";
import type { InteractionDefinition } from "../handler/registry/registry";
import type { ModalSubmitMetadata } from "../metadata/modal-submit";
import type { BlankEnv } from "../types";
import type { ModalSubmitHandler } from "../handler/modal-submit";

export class ModalSubmitFactory<Env extends BlankEnv> {
  constructor(private metadata: ModalSubmitMetadata) {}

  handler(handler: ModalSubmitHandler<boolean, Env>) {
    return {
      type: InteractionType.ModalSubmit,
      metadata: this.metadata,
      handler: handler,
    } satisfies InteractionDefinition<InteractionType.ModalSubmit, Env>;
  }
}

export const createModal = (customId: string) => {
  return new ModalSubmitFactory({
    type: InteractionType.ModalSubmit,
    customId,
  });
};
