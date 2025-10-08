import { createClient, Shortcut } from "@hiyocord/rest-api-core";
import { paths } from "./github-api-spec.gen";

export type DefaultClient = ReturnType<typeof getClient>;

export const getClient = (token: string) => {
    return getCustomClient(token);
};

// TODO GitHub Apps / PAT
export const getCustomClient = <T extends Shortcut<paths, object>[]>(
    token: string,
    ...shortcuts: T
) => {
    const client = createClient<paths>(
        { baseUrl: "https://api.github.com" },
        ...shortcuts,
    );

    return client;
};
