import { InteractionResponseType } from "discord-api-types/v10";
import { InteractionType } from "discord-api-types/v10";
import type { InteractionHandlerResolver } from "./resolver";
import type {
  RESTPostAPIWebhookWithTokenJSONBody,
  APIInteraction,
} from "discord-api-types/v10";
import {
  createBuilder,
  FollowupMessageUpdateBuilder,
  FollowupReplyBuilder,
} from "../response-builder";
import type { BaseInteractionHandler, BlankEnv } from "./handler";
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

type ExecuteParam<I extends InteractionType, Env extends BlankEnv> = {
  body: InteractionRequest[I];
  request: Request;
  env: Env;
  ctx: ExecutionContext | undefined;
};

const execute = async <I extends InteractionType, Env extends BlankEnv>(
  handler: BaseInteractionHandler<I, boolean> | null,
  { request, body, env, ctx }: ExecuteParam<I, Env>,
) => {
  if (handler === null) {
    return new Response(null, { status: 404 });
  }

  const result = await handler.handle(body, {
    request: new Request(request),
    env,
  });
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

const fetchApplicationCommand = async <Env extends BlankEnv>(
  resolver: InteractionHandlerResolver,
  param: ExecuteParam<InteractionType.ApplicationCommand, Env>,
) => {
  return await execute(
    resolver.findFirst<InteractionType.ApplicationCommand>(param.body),
    param,
  );
};

const fetchMessageComponent = async <Env extends BlankEnv>(
  resolver: InteractionHandlerResolver,
  param: ExecuteParam<InteractionType.MessageComponent, Env>,
) => {
  return await execute(
    resolver.findFirst<InteractionType.MessageComponent>(param.body),
    param,
  );
};

const fetchModalSubmit = async <Env extends BlankEnv>(
  resolver: InteractionHandlerResolver,
  param: ExecuteParam<InteractionType.ModalSubmit, Env>,
) => {
  return await execute(
    resolver.findFirst<InteractionType.ModalSubmit>(param.body),
    param,
  );
};

export const fetchHandler = (resolver: InteractionHandlerResolver) => {
  const fetch = async (
    request: Request,
    env?: BlankEnv,
    ctx?: ExecutionContext,
  ): Promise<Response> => {
    const body = (await request.clone().json()) as APIInteraction;
    const param = {
      request,
      env: env ?? {},
      ctx,
    };
    switch (body.type) {
      case InteractionType.Ping:
        return new Response(JSON.stringify(createBuilder(body).build()), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      case InteractionType.ApplicationCommand:
        return await fetchApplicationCommand(resolver, { body, ...param });
      case InteractionType.MessageComponent:
        return await fetchMessageComponent(resolver, { body, ...param });
      case InteractionType.ModalSubmit:
        return await fetchModalSubmit(resolver, { body, ...param });
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
