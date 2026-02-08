import type { InteractionHandler } from "../handler";
import type { InteractionRequest } from "../../types";
import type { InteractionType } from "discord-api-types/v10";
import type { InteractionHandlerRegistry } from "../registry";

/**
 * ハンドラの解決を行うためのインターフェース。
 */
export interface InteractionHandlerResolver {
  findFirst<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): InteractionHandler<K> | null;

  find<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): Array<InteractionHandler<K>> | null;
}

export abstract class TypedHandlerResolver<
  T extends InteractionType & keyof InteractionRequest,
> {
  abstract get(
    handlers: InteractionHandler<T>[],
    interaction: InteractionRequest[T],
  ): InteractionHandler<T>[];

  abstract getFirst(
    handlers: InteractionHandler<T>[],
    interaction: InteractionRequest[T],
  ): InteractionHandler<T> | null;
}

/**
 * 何も解決しない`TypedHandlerResolver`の実装。
 */
export class NullTypedHandlerResolver<
  T extends InteractionType,
> implements TypedHandlerResolver<T> {
  get(): InteractionHandler<T>[] {
    return [];
  }

  getFirst(): InteractionHandler<T> | null {
    return null;
  }
}

export class DelegatingTypedInteractionHandlerResolver implements InteractionHandlerResolver {
  constructor(
    private registry: InteractionHandlerRegistry,
    private resolvers: Map<
      InteractionType,
      TypedHandlerResolver<InteractionType>
    >,
  ) {}

  private getResolver<T extends InteractionType>(
    type: T,
  ): TypedHandlerResolver<T> {
    return (
      (this.resolvers.get(type) as TypedHandlerResolver<T>) ||
      new NullTypedHandlerResolver<T>()
    );
  }

  findFirst<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): InteractionHandler<K> | null {
    const handlers = this.registry.get(
      interaction.type,
    ) as InteractionHandler<K>[];
    console.log("Handlers for type", interaction.type, handlers);

    const resolver = this.getResolver(
      interaction.type,
    ) as TypedHandlerResolver<K>;

    console.log("Using resolver", JSON.stringify(resolver));
    return resolver.getFirst(handlers, interaction);
  }

  find<K extends InteractionType>(
    interaction: InteractionRequest[K],
  ): InteractionHandler<K>[] {
    const handlers = this.registry.get(
      interaction.type,
    ) as InteractionHandler<K>[];
    const resolver = this.getResolver(
      interaction.type,
    ) as TypedHandlerResolver<K>;
    return resolver.get(handlers, interaction);
  }
}
