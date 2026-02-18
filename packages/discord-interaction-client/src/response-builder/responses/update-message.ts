import type {
  InteractionRequest,
  InteractionResponseForResponseType,
} from "../../types";
import { InteractionResponseType } from "discord-api-types/v10";
import type {
  APIAllowedMentions,
  APIEmbed,
  APIMessageTopLevelComponent,
  InteractionType,
  MessageFlags,
  RESTAPIAttachment,
  RESTAPIPoll,
  Snowflake,
} from "discord-api-types/v10";

export class UpdateMessageBuilder {
  constructor(
    private interaction: InteractionRequest[
      | InteractionType.MessageComponent
      | InteractionType.ModalSubmit],
    private response: InteractionResponseForResponseType<InteractionResponseType.UpdateMessage> = {
      type: InteractionResponseType.UpdateMessage,
    },
  ) {}

  allowedMentions(value: APIAllowedMentions) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, allowed_mentions: value },
    });
  }

  appliedTags(value: Snowflake[]) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, applied_tags: value },
    });
  }

  attachments(value: RESTAPIAttachment[]) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, attachments: value },
    });
  }

  components(value: APIMessageTopLevelComponent[]) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, components: value },
    });
  }

  content(content: string) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, content },
    });
  }

  embeds(value: APIEmbed[]) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, embeds: value },
    });
  }

  flags(flags: MessageFlags) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, flags },
    });
  }

  poll(value: RESTAPIPoll) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, poll: value },
    });
  }

  threadName(value: string) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, thread_name: value },
    });
  }

  tts(value: boolean) {
    return new UpdateMessageBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, tts: value },
    });
  }

  build() {
    return {
      deferred: false,
      response: this.response,
    } as const;
  }
}
