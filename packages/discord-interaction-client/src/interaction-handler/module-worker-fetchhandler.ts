import {
  APIApplicationCommandInteraction,
  APIInteraction,
  InteractionType,
} from "../types";
import { InteractionHandlerResolver } from "./resolver";

const fetchApplicationCommand = async (
  resolver: InteractionHandlerResolver,
  body: APIApplicationCommandInteraction,
) => {
  const handler = resolver.findFirst<InteractionType.ApplicationCommand>(body);
  const res = await handler.handle(body);

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const fetchHandler = (resolver: InteractionHandlerResolver) => {
  const fetch = async (request: Request): Promise<Response> => {
    const body = (await request.json()) as APIInteraction;
    try {
      switch (body.type) {
        case InteractionType.ApplicationCommand:
          return await fetchApplicationCommand(resolver, body);
        default:
          break;
      }
    } catch (e) {
      return new Response(null, {
        status: 500,
      });
    }
  };

  return {
    fetch,
  };
};
