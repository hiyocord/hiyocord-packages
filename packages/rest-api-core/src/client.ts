import createOpenApiClient, { ClientOptions } from "openapi-fetch";
import { Client } from "openapi-fetch";
import { mergeShortcuts, Shortcut } from "./shortcut";

type Method =
    | "GET"
    | "PUT"
    | "POST"
    | "DELETE"
    | "OPTIONS"
    | "HEAD"
    | "PATCH"
    | "TRACE";

type ToLowerKeys<T> = {
    [K in keyof T as Lowercase<string & K>]: T[K];
};

export type FetchClient<paths extends {}> = ToLowerKeys<
    Pick<Client<paths>, Method>
>;

type ClientInit<paths extends {}> = Parameters<
    typeof createOpenApiClient<paths>
>;

export const createClient = <paths extends {}>(
    init: ClientOptions,
    ...shortcuts: Shortcut<paths, object>[]
) => {
    const client = createOpenApiClient<paths>(init);

    const fetchClient = {
        get: client.GET,
        put: client.PUT,
        post: client.POST,
        delete: client.DELETE,
        options: client.OPTIONS,
        head: client.HEAD,
        patch: client.PATCH,
        trace: client.TRACE,
    };

    return {
        ...mergeShortcuts(...shortcuts)(fetchClient),
        ...fetchClient,
        request: client.request,
        use: client.use,
        eject: client.eject,
    };
};
