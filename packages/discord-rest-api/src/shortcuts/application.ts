import { FetchClient, Shortcut } from "@hiyocord/rest-api-core";
import type { paths } from "../discord-api-spec.gen";

export class AppShortcut {
    constructor(private readonly client: FetchClient<paths>) {}

    async getCommands(p: {
        application_id: string;
        guild_id?: string | undefined;
    }) {
        if (p.guild_id) {
            const response = await this.client.get(
                "/applications/{application_id}/guilds/{guild_id}/commands",
                {
                    params: {
                        path: {
                            application_id: p.application_id,
                            guild_id: p.guild_id,
                        },
                    },
                },
            );
            return response.data;
        } else {
            const response = await this.client.get(
                "/applications/{application_id}/commands",
                {
                    params: {
                        path: {
                            application_id: p.application_id,
                        },
                    },
                },
            );
            return response.data;
        }
    }

    async deleteCommand(p: {
        application_id: string;
        command_id: string;
        guild_id?: string;
    }) {
        if (p?.guild_id) {
            const response = await this.client.delete(
                "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
                {
                    params: {
                        path: {
                            application_id: p.application_id,
                            command_id: p.command_id,
                            guild_id: p.guild_id,
                        },
                    },
                },
            );
            return response.data;
        } else {
            const response = await this.client.delete(
                "/applications/{application_id}/commands/{command_id}",
                {
                    params: {
                        path: {
                            application_id: p.application_id,
                            command_id: p.command_id,
                        },
                    },
                },
            );
            return response.data;
        }
    }
}

export const createApplicationShortcut: Shortcut<paths, AppShortcut> = (
    client,
) => {
    return new AppShortcut(client);
};
