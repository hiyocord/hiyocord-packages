import type {
  APIAllowedMentions,
  APIEmbed,
  APIMessageTopLevelComponent,
  MessageFlags,
  RESTAPIAttachment,
  RESTAPIPoll,
  RESTPostAPIWebhookWithTokenJSONBody,
  Snowflake,
} from "discord-api-types/v10";

export class FollowupReplyBuilder {
  constructor(private data: RESTPostAPIWebhookWithTokenJSONBody = {}) {}

  content(value: string) {
    return new FollowupReplyBuilder({ ...this.data, content: value });
  }

  username(value: string) {
    return new FollowupReplyBuilder({ ...this.data, username: value });
  }

  avatar_url(value: string) {
    return new FollowupReplyBuilder({ ...this.data, avatar_url: value });
  }

  tts(value: boolean) {
    return new FollowupReplyBuilder({ ...this.data, tts: value });
  }

  embeds(value: APIEmbed[]) {
    return new FollowupReplyBuilder({ ...this.data, embeds: value });
  }

  allowed_mentions(value: APIAllowedMentions) {
    return new FollowupReplyBuilder({ ...this.data, allowed_mentions: value });
  }

  components(value: APIMessageTopLevelComponent[]) {
    return new FollowupReplyBuilder({ ...this.data, components: value });
  }

  attachments(value: RESTAPIAttachment[]) {
    return new FollowupReplyBuilder({ ...this.data, attachments: value });
  }

  flags(value: MessageFlags) {
    return new FollowupReplyBuilder({ ...this.data, flags: value });
  }

  thread_name(value: string) {
    return new FollowupReplyBuilder({ ...this.data, thread_name: value });
  }

  applied_tags(value: Snowflake[]) {
    return new FollowupReplyBuilder({ ...this.data, applied_tags: value });
  }

  poll(value: RESTAPIPoll) {
    return new FollowupReplyBuilder({ ...this.data, poll: value });
  }

  build() {
    return this.data;
  }
}
