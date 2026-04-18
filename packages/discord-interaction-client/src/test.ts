import type { InteractionType } from "discord-api-types/v10";
import {
  ApplicationCommandOptionType,
  ButtonStyle,
  ComponentType,
} from "discord-api-types/v10";
import { createBuilder } from "./response-builder";
import { createSlashCommand } from "./factory";
import {
  fetchHandler,
  SimpleInteractionHandlerRegistry,
  SimpleInteractionHandlerResolver,
} from "./handler";

export const authinit = createSlashCommand("authinit", "test command")
  .guildIds(["1195385456976724068", "1463504106210590732"])
  .option({
    type: ApplicationCommandOptionType.Role,
    name: "role",
    description: "認証時に付与するロール",
    required: true,
  })
  .option({
    type: ApplicationCommandOptionType.Channel,
    name: "channel",
    description: "認証時のログを送るチャンネル",
  })
  .handler(async (c) => {
    return createBuilder(c)
      .reply()
      .components([
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: "認証",
              style: ButtonStyle.Primary,
              custom_id: "auth_init_button",
            },
          ],
        },
      ])
      .build();
  });

const registry = new SimpleInteractionHandlerRegistry();
registry.register<InteractionType.ApplicationCommand>(authinit);

const resolver = new SimpleInteractionHandlerResolver(registry);

export default fetchHandler(resolver);
