export * from "./github-api-spec.gen";
import { paths } from "./github-api-spec.gen";
import createClient, { ClientOptions } from "openapi-fetch";

export type DefaultClient = ReturnType<typeof getClient>;

// TODO GitHub Apps / PAT
export const getClient = (token: string, options: ClientOptions) => {
    const client = createClient<paths>({
        baseUrl: "https://api.github.com",
        ...options,
    });

    return client;
};
