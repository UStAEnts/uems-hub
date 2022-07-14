/**
 * Restructures ./filebinding into a format to be directly re-exported by src/index.ts
 */
import { FileBindingValidators } from "./FileBindingValidators";

/**
 * Re-exports of types and functions in {@link FileBindingValidators} relating to FileBinding messages
 */
export namespace FileBindingMessage {
	export type QueryByFileMessage = FileBindingValidators.QueryByFileMessage;
	export type QueryByEventMessage = FileBindingValidators.QueryByEventMessage;

	export type BindEventsToFileMessage = FileBindingValidators.BindEventToFileMessage;
	export type BindFilesToEventMessage = FileBindingValidators.BindFileToEventMessage;

	export type UnbindEventsFromFileMessage = FileBindingValidators.UnbindEventFromFileMessage;
	export type UnbindFilesFromEventMessage = FileBindingValidators.UnbindFileFromEventMessage;

	export type SetEventsForFileMessage = FileBindingValidators.SetEventsForFileMessage;
	export type SetFilesForEventMessage = FileBindingValidators.SetFilesForEventMessage;

	export type FileBindingMessage = FileBindingValidators.FileBindingMessage;
}

/**
 * Re-exports of types and functions in {@link FileBindingValidators} relating to the filebinding messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace FileBindingResponse {
	export type QueryByFileResponse = FileBindingValidators.QueryByFileResponse;
	export type ShallowQueryByFileResponse = FileBindingValidators.QueryByFileShallowResponse;

	export type QueryByEventResponse = FileBindingValidators.QueryByEventResponse;
	export type ShallowQueryByEventResponse = FileBindingValidators.QueryByEventShallowResponse;

	export type BindEventsToFileResponse = FileBindingValidators.BindEventToFileResponse;
	export type BindFilesToEventResponse = FileBindingValidators.BindFileToEventResponse;

	export type UnbindEventsFromFileResponse = FileBindingValidators.UnbindEventFromFileResponse;
	export type UnbindFilesFromEventResponse = FileBindingValidators.UnbindFileFromEventResponse;

	export type SetEventsForFileResponse = FileBindingValidators.SetEventsForFileResponse;
	export type SetFilesForEventResponse = FileBindingValidators.SetFilesForEventResponse;

	export type FileBindingResponse = FileBindingValidators.FileBindingResponseSchema;
}

export const FileBindingMessageValidator = FileBindingValidators.FileBindingMessageValidator;
export const FileBindingResponseValidator = FileBindingValidators.FileBindingResponseValidator;
