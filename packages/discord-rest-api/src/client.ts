import { createClient, Shortcut } from "@hiyocord/rest-api-core";
import { shortcuts } from "./shortcuts";
import { paths } from "./discord-api-spec.gen";

export type DefaultClient = ReturnType<typeof getClient>;

export const getClient = (token: string) => {
    return getCustomClient(token, ...shortcuts);
};

export const getCustomClient = <T extends Shortcut<paths, object>[]>(
    token: string,
    ...shortcuts: T
) => {
    const client = createClient<paths>(
        { baseUrl: "https://discord.com/api/v10" },
        ...shortcuts,
    );
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
