import type { MetadataByType } from "../../metadata";
import type { APIInteractionByType, BlankEnv } from "../../types";
import type { BaseInteractionHandler } from "../base-handler";
import type { InteractionType } from "discord-api-types/v10";

export type InteractionDefinition<
  Type extends InteractionType,
  Env extends BlankEnv = BlankEnv,
> = {
  type: Type;
  metadata: MetadataByType<Type>;
  handler(
    component: APIInteractionByType<Type>,
    context: { request: Request; env: Env },
  ): ReturnType<
    BaseInteractionHandler<Type, APIInteractionByType<Type>, boolean, Env>
  >;
};

export interface InteractionHandlerRegistry {
  register(define: InteractionDefinition<InteractionType>): void;
  get<K extends InteractionType>(type: K): InteractionDefinition<K>[];
}
