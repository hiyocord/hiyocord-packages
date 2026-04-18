import { InteractionType } from "discord-api-types/v10";
import { ApplicationCommandMetadata } from "./application-command";
import { ApplicationCommandAutocompleteMetadata } from "./autocomplete";
import { MessageComponentMetadata } from "./message-component";
import { ModalSubmitMetadata } from "./modal-submit";

export * from "./application-command";
export * from "./autocomplete";
export * from "./message-component";
export * from "./modal-submit";

export type Metadata =
  | ApplicationCommandMetadata
  | ApplicationCommandAutocompleteMetadata
  | MessageComponentMetadata
  | ModalSubmitMetadata;

export type MetadataByType<Type extends InteractionType> = Metadata & {
  type: Type;
};
