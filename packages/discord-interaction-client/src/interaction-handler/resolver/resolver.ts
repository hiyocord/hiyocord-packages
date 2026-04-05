import type { InteractionHandler } from "../handler";
import type { APIInteractionByType } from "../../types";
import type { InteractionType } from "discord-api-types/v10";
import type { InteractionHandlerRegistry } from "../registry";

/**
 * ハンドラの解決を行うためのインターフェース。
 */
export interface InteractionHandlerResolver {
  findFirst<K extends InteractionType>(
    interaction: APIInteractionByType<K>,
  ): InteractionHandler<K> | null;

  find<K extends InteractionType>(
    interaction: APIInteractionByType<K>,
  ): Array<InteractionHandler<K>>;
}

export abstract class TypedHandlerResolver<
  T extends InteractionType,
> {
  abstract get(
    handlers: InteractionHandler<T>[],
    interaction: APIInteractionByType<T>,
  ): InteractionHandler<T>[];

  abstract getFirst(
    handlers: InteractionHandler<T>[],
    interaction: APIInteractionByType<T>,
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
    interaction: APIInteractionByType<K>,
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
    interaction: APIInteractionByType<K>,
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
