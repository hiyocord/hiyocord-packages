import { InteractionType } from "discord-api-types/v10";
import type { InteractionDefinition } from "../handler/registry/registry";
import type { MessageComponentMetadata } from "../metadata/message-component";
import type { BlankEnv } from "../types";
import type { MessageComponentHandler } from "../handler/message-component";

export class MessageComponent<Env extends BlankEnv> {
  constructor(private metadata: MessageComponentMetadata) {}

  handler(handler: MessageComponentHandler<boolean, Env>) {
    return {
      type: InteractionType.MessageComponent,
      metadata: this.metadata,
      handler: handler,
    } satisfies InteractionDefinition<InteractionType.MessageComponent>;
  }
}

export const createMessageComponent = (customId: string) => {
  return new MessageComponent({
    type: InteractionType.MessageComponent,
    customId,
  });
};
