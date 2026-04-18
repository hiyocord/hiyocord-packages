import type { InteractionType } from "discord-api-types/v10";
import type { BlankEnv } from "../types";
import type { BaseInteractionHandler } from "./base-handler";
import type { ModalSubmitInteractionWrapper } from "../wrapper";

export type ModalSubmitHandler<
  Deferred extends boolean = boolean,
  Env extends BlankEnv = BlankEnv,
> = BaseInteractionHandler<
  InteractionType.ModalSubmit,
  ModalSubmitInteractionWrapper,
  Deferred,
  Env
>;
