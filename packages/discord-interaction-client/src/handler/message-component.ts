import type { InteractionType } from "discord-api-types/v10";
import type { BlankEnv } from "../types";
import type { BaseInteractionHandler } from "./base-handler";
import type { MessageComponentInteractionWrapper } from "../wrapper";

export type MessageComponentHandler<
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.MessageComponent,
  MessageComponentInteractionWrapper,
  Deferred,
  Env
>;
