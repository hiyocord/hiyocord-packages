import type {
  _AddUndefinedToPossiblyUndefinedPropertiesOfInterface,
  APIAllowedMentions,
  APIEmbed,
  APIMessageTopLevelComponent,
  MessageFlags,
  RESTAPIAttachment,
  RESTAPIPoll,
  RESTPatchAPIWebhookWithTokenMessageJSONBody,
} from "discord-api-types/v10";

export class FollowupMessageUpdateBuilder {
  constructor(private data: RESTPatchAPIWebhookWithTokenMessageJSONBody = {}) {}

  content(
    value: _AddUndefinedToPossiblyUndefinedPropertiesOfInterface<
      string | null | undefined
    >,
  ) {
    return new FollowupMessageUpdateBuilder({ ...this.data, content: value });
  }

  embeds(value: APIEmbed[]) {
    return new FollowupMessageUpdateBuilder({ ...this.data, embeds: value });
  }

  flags(value: MessageFlags) {
    return new FollowupMessageUpdateBuilder({ ...this.data, flags: value });
  }

  allowed_mentions(value: APIAllowedMentions) {
    return new FollowupMessageUpdateBuilder({
      ...this.data,
      allowed_mentions: value,
    });
  }

  components(value: APIMessageTopLevelComponent[]) {
    return new FollowupMessageUpdateBuilder({
      ...this.data,
      components: value,
    });
  }

  attachments(value: RESTAPIAttachment[]) {
    return new FollowupMessageUpdateBuilder({
      ...this.data,
      attachments: value,
    });
  }

  poll(value: RESTAPIPoll) {
    return new FollowupMessageUpdateBuilder({ ...this.data, poll: value });
  }

  build() {
    return this.data;
  }
}
