import {
  APIApplicationCommandInteraction,
  APIInteraction,
  InteractionType,
} from "../types";
import { InteractionHandlerResolver } from "./resolver";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";

// Cloudflare Workers ExecutionContext type
type ExecutionContext = {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
};

// Type guard to check if response is a deferred tuple
function isDeferredResponse(res: any): res is readonly [any, () => any | Promise<any>] {
  return (
    Array.isArray(res) &&
    res.length === 2 &&
    typeof res[1] === 'function'
  );
}

const fetchApplicationCommand = async (
  resolver: InteractionHandlerResolver,
  body: APIApplicationCommandInteraction,
  ctx?: ExecutionContext,
) => {
  const handler = resolver.findFirst<InteractionType.ApplicationCommand>(body);
  if (handler) {
    const res = await handler.handle(body);

    // Check if response is a deferred tuple [response, func]
    if (isDeferredResponse(res)) {
      const deferResponse = res[0];
      const afterFunc = res[1];

      // Execute afterFunc in background and send followup message
      const sendFollowup = async () => {
        try {
          const followupData = await afterFunc();

          if (followupData) {
            // Send followup message to Discord
            const followupUrl = `https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}`;

            await fetch(followupUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(followupData as RESTPostAPIWebhookWithTokenJSONBody),
            });
          }
        } catch (error: any) {
          console.error('Error executing deferred function:', error);
        }
      };

      if (ctx) {
        ctx.waitUntil(sendFollowup());
      } else {
        // Fallback: execute without waiting
        sendFollowup();
      }

      return new Response(JSON.stringify(deferResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Normal response
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(null, { status: 404 });
  }
};

export const fetchHandler = (resolver: InteractionHandlerResolver) => {
  const fetch = async (
    request: Request,
    env?: unknown,
    ctx?: ExecutionContext,
  ): Promise<Response> => {
    const body = (await request.json()) as APIInteraction;
    switch (body.type) {
      case InteractionType.ApplicationCommand:
        return await fetchApplicationCommand(resolver, body, ctx);
      default:
        break;
    }
    return new Response(null, { status: 404 });
  };

  return {
    fetch,
  };
};
