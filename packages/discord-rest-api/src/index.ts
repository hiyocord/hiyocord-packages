export * from "./discord-api-spec.gen";
import { paths } from "./discord-api-spec.gen";
import createClient, { ClientOptions } from "openapi-fetch";

export type DefaultClient = ReturnType<typeof getClient>;

export interface ExtendedClientOptions extends ClientOptions {
  /**
   * Base URL for the Discord API
   * @default "https://discord.com/api/v10"
   */
  baseUrl?: string;
}

export const getClient = (token: string, options?: ExtendedClientOptions) => {
  const client = createClient<paths>({
    baseUrl: options?.baseUrl ?? "https://discord.com/api/v10",
    ...options,
  });
  client.use({
    // TODO rate limit wait and try
    onRequest: (opt) => {
      opt.request.headers.set("Authorization", `Bot ${token}`);
    },
    // TODO rate limit wait and retry
    // onError: (opt) => {},
    // onResponse: (opt) => {}
  });

  return client;
};
