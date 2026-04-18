import type { APIInteractionByType } from "../../types";
import { InteractionType } from "discord-api-types/v10";
import type { InteractionDefinition } from "../registry/registry";

/**
 * ハンドラの解決を行うためのインターフェース。
 */
export interface InteractionHandlerResolver {
  find<K extends InteractionType>(
    _interaction: APIInteractionByType<K>,
  ): Array<InteractionDefinition<K>>;

  findFirst<K extends InteractionType>(
    _interaction: APIInteractionByType<K>,
  ): InteractionDefinition<K> | null;
}

/**
 * 型ごとにハンドラの解決を行うためのインターフェース。
 */
export interface TypedInteractionHandlerResolver<K extends InteractionType> {
  find(_interaction: APIInteractionByType<K>): Array<InteractionDefinition<K>>;
  findFirst(
    _interaction: APIInteractionByType<K>,
  ): InteractionDefinition<K> | null;
}

/**
 * 何も解決しない実装。
 */
export class NullTypedHandlerResolver implements TypedInteractionHandlerResolver<InteractionType> {
  find<K extends InteractionType>(
    _interaction: APIInteractionByType<K>,
  ): Array<InteractionDefinition<K>> {
    return [];
  }

  findFirst<K extends InteractionType>(
    _interaction: APIInteractionByType<K>,
  ): InteractionDefinition<K> | null {
    return null;
  }
}

/**
 * {@link InteractionType}ごとにリゾルバを指定出来るリゾルバ
 */
export class DelegatingTypedInteractionHandlerResolver implements InteractionHandlerResolver {
  private typedHandlers: {
    [K in InteractionType]: TypedInteractionHandlerResolver<K>;
  };
  constructor(handlers: {
    [K in InteractionType]?: TypedInteractionHandlerResolver<K>;
  }) {
    const nullTypedHandlerResolver = new NullTypedHandlerResolver();
    this.typedHandlers = {
      [InteractionType.Ping]: nullTypedHandlerResolver,
      [InteractionType.ApplicationCommand]: nullTypedHandlerResolver,
      [InteractionType.MessageComponent]: nullTypedHandlerResolver,
      [InteractionType.ApplicationCommandAutocomplete]:
        nullTypedHandlerResolver,
      [InteractionType.ModalSubmit]: nullTypedHandlerResolver,
      ...handlers,
    };
  }

  find<K extends InteractionType>(
    interaction: APIInteractionByType<K>,
  ): Array<InteractionDefinition<K>> {
    return this.typedHandlers[interaction.type].find(interaction);
  }

  findFirst<K extends InteractionType>(
    interaction: APIInteractionByType<K>,
  ): InteractionDefinition<K> | null {
    return this.typedHandlers[interaction.type].findFirst(interaction);
  }
}
