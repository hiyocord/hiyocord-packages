import type {
  APIInteractionByType,
  InteractionResponseForResponseType,
} from "../../types";
import type {
  APIApplicationCommandOptionChoice,
  InteractionType,
} from "discord-api-types/v10";
import { InteractionResponseType } from "discord-api-types/v10";

export class ApplicationCommandAutocompleteResultBuilder {
  constructor(
    private interaction: APIInteractionByType<InteractionType.ApplicationCommandAutocomplete>,
    private response: InteractionResponseForResponseType<InteractionResponseType.ApplicationCommandAutocompleteResult> = {
      type: InteractionResponseType.ApplicationCommandAutocompleteResult,
      data: {},
    },
  ) {}

  choices(choices: APIApplicationCommandOptionChoice[]) {
    return new ApplicationCommandAutocompleteResultBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, choices },
    });
  }

  build() {
    return {
      deferred: false,
      response: this.response,
    } as const;
  }
}
