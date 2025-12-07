import {
  APIApplicationCommandOptionChoice,
  InteractionRequest,
  InteractionResponseForResponseType,
  InteractionResponseType,
  InteractionType,
} from "types";

export class ApplicationCommandAutocompleteResultBuilder {
  constructor(
    private interaction: InteractionRequest[InteractionType.Ping],
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
    return this.response;
  }
}
