import type {
  APIAttachment,
  APIInteractionDataResolved,
  APIInteractionDataResolvedChannel,
  APIInteractionDataResolvedGuildMember,
  APIRole,
  APIUser,
  InteractionType,
  Snowflake,
} from "discord-api-types/v10";
import type { APIInteractionByType } from "../types";

export * from "./application-command";
export * from "./message-component";
export * from "./modal-submit";

export type BaseInteractionWrapper<Type extends InteractionType> =
  APIInteractionByType<Type> & {
    raw: APIInteractionByType<Type>;
  };

type ResolverMap = {
  attachment: {
    getAttachment: (id: Snowflake | undefined) => APIAttachment | undefined;
  };
  channel: {
    getChannel: (
      id: Snowflake | undefined,
    ) => APIInteractionDataResolvedChannel | undefined;
  };
  member: {
    getMember: (
      id: Snowflake | undefined,
    ) => APIInteractionDataResolvedGuildMember | undefined;
  };
  role: {
    getRole: (id: Snowflake | undefined) => APIRole | undefined;
  };
  user: {
    getUser: (id: Snowflake | undefined) => APIUser | undefined;
  };
};
export type ResolvedProp = keyof ResolverMap;

type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

export type ResolvedInteractionWrapper<
  Allowed extends ResolvedProp = ResolvedProp,
> = UnionToIntersection<
  Allowed extends keyof ResolverMap ? ResolverMap[Allowed] : never
>;

export const createResolvedInteractionWrapper = (
  resolved: APIInteractionDataResolved | undefined,
): ResolvedInteractionWrapper => {
  return {
    getAttachment: (id) => {
      if (id == undefined) {
        return undefined;
      }
      return resolved?.attachments?.[id];
    },

    getChannel: (id) => {
      if (id == undefined) {
        return undefined;
      }
      return resolved?.channels?.[id];
    },

    getMember: (id) => {
      if (id == undefined) {
        return undefined;
      }
      return resolved?.members?.[id];
    },

    getRole: (id) => {
      if (id == undefined) {
        return undefined;
      }
      return resolved?.roles?.[id];
    },

    getUser: (id) => {
      if (id == undefined) {
        return undefined;
      }
      return resolved?.users?.[id];
    },
  };
};
