import {
  APIAllowedMentions,
  APIEmbed,
  APIMessageTopLevelComponent,
  InteractionRequest,
  InteractionResponseForResponseType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
  RESTAPIAttachment,
  RESTAPIPoll,
  Snowflake,
} from "types";

export class ChannelMessageWithSourceBuilder {
  constructor(
    private interaction: InteractionRequest[InteractionType.Ping],
    private response: InteractionResponseForResponseType<InteractionResponseType.ChannelMessageWithSource> = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {},
    },
  ) {}

  allowedMentions(value: APIAllowedMentions) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, allowed_mentions: value },
    });
  }

  appliedTags(value: Snowflake[]) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, applied_tags: value },
    });
  }

  attachments(value: RESTAPIAttachment[]) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, attachments: value },
    });
  }

  components(value: APIMessageTopLevelComponent[]) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, components: value },
    });
  }

  content(content: string) {
    this.response.data.content = content;
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, content },
    });
  }

  embeds(value: APIEmbed[]) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, embeds: value },
    });
  }

  flags(flags: MessageFlags) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, flags },
    });
  }

  poll(value: RESTAPIPoll) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, poll: value },
    });
  }

  threadName(value: string) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, thread_name: value },
    });
  }

  tts(value: boolean) {
    return new ChannelMessageWithSourceBuilder(this.interaction, {
      ...this.response,
      data: { ...this.response.data, tts: value },
    });
  }

  build() {
    return this.response;
  }
}
