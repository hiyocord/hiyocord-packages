import { InteractionResponseType } from "discord-api-types/v10";
import { InteractionType } from "discord-api-types/v10";
import type { InteractionHandlerResolver } from "./resolver";
import type {
  RESTPostAPIWebhookWithTokenJSONBody,
  APIApplicationCommandInteraction,
  APIInteraction,
  APIMessageComponentInteraction,
  APIModalSubmitInteraction,
} from "discord-api-types/v10";
import {
  createBuilder,
  FollowupMessageUpdateBuilder,
  FollowupReplyBuilder,
} from "../response-builder";
import type { BaseInteractionHandler } from "./handler";
import type {
  InteractionRequest,
  InteractionResponseForResponseType,
} from "../types";

// Cloudflare Workers ExecutionContext type
type ExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

type PromiseType<T> = T extends Promise<infer P> ? P : T;
type DeferredHandler = BaseInteractionHandler<InteractionType, true>["handle"];

function isDeferredChannelMessageWithSource(
  response: PromiseType<ReturnType<DeferredHandler>>,
): response is PromiseType<ReturnType<DeferredHandler>> & {
  response: InteractionResponseForResponseType<InteractionResponseType.DeferredChannelMessageWithSource>;
  followup: (
    builder: FollowupReplyBuilder,
  ) =>
    | RESTPostAPIWebhookWithTokenJSONBody
    | Promise<RESTPostAPIWebhookWithTokenJSONBody>;
} {
  return (
    response.response.type ===
    InteractionResponseType.DeferredChannelMessageWithSource
  );
}

const execute = async <I extends InteractionType>(
  handler: BaseInteractionHandler<I, boolean> | null,
  request: Request,
  body: InteractionRequest[I],
  ctx?: ExecutionContext,
) => {
  if (handler === null) {
    return new Response(null, { status: 404 });
  }

  const result = await handler.handle(body, request);
  const { response } = result;

  // Check if response is a deferred tuple [response, func]
  if (result.deferred) {
    // Execute afterFunc in background and send followup message
    const sendFollowup = async () => {
      let followupData;
      if (isDeferredChannelMessageWithSource(result)) {
        followupData = await result.followup(new FollowupReplyBuilder());
      } else {
        followupData = await result.followup(
          new FollowupMessageUpdateBuilder(),
        );
      }

      if (followupData) {
        // Send followup message to Discord
        let method: string;
        let followupUrl = "https://discord.com/api/v10/webhooks";
        switch (response.type) {
          case InteractionResponseType.DeferredChannelMessageWithSource:
            method = "POST";
            followupUrl += `/${body.application_id}/${body.token}`;
            break;
          case InteractionResponseType.DeferredMessageUpdate:
            method = "PATCH";
            followupUrl += `/${body.application_id}/${body.token}/messages/@original`;
            break;
          default:
            throw new Error("not deferred response");
        }
        await fetch(followupUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(followupData),
        });
      }
    };

    if (ctx) {
      ctx.waitUntil(sendFollowup());
    } else {
      // Fallback: execute without waiting
      sendFollowup();
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Normal response
  return new Response(JSON.stringify(result.response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchApplicationCommand = async (
  resolver: InteractionHandlerResolver,
  request: Request,
  body: APIApplicationCommandInteraction,
  ctx?: ExecutionContext,
) => {
  return await execute(
    resolver.findFirst<InteractionType.ApplicationCommand>(body),
    request,
    body,
    ctx,
  );
};

const fetchMessageComponent = async (
  resolver: InteractionHandlerResolver,
  request: Request,
  body: APIMessageComponentInteraction,
  ctx?: ExecutionContext,
) => {
  return await execute(
    resolver.findFirst<InteractionType.MessageComponent>(body),
    request,
    body,
    ctx,
  );
};

const fetchModalSubmit = async (
  resolver: InteractionHandlerResolver,
  request: Request,
  body: APIModalSubmitInteraction,
  ctx?: ExecutionContext,
) => {
  return await execute(
    resolver.findFirst<InteractionType.ModalSubmit>(body),
    request,
    body,
    ctx,
  );
};

export const fetchHandler = (resolver: InteractionHandlerResolver) => {
  const fetch = async (
    request: Request,
    env?: unknown,
    ctx?: ExecutionContext,
  ): Promise<Response> => {
    const body = (await request.json()) as APIInteraction;
    switch (body.type) {
      case InteractionType.Ping:
        return new Response(JSON.stringify(createBuilder(body).build()), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      case InteractionType.ApplicationCommand:
        return await fetchApplicationCommand(
          resolver,
          request.clone(),
          body,
          ctx,
        );
      case InteractionType.MessageComponent:
        return await fetchMessageComponent(
          resolver,
          request.clone(),
          body,
          ctx,
        );
      case InteractionType.ModalSubmit:
        return await fetchModalSubmit(resolver, request.clone(), body, ctx);
      // case InteractionType.ApplicationCommandAutocomplete:
      // TODO ApplicationCommandHandlerからよしなにやりたい
      default:
        break;
    }
    return new Response(null, { status: 404 });
  };

  return {
    fetch,
  };
};
