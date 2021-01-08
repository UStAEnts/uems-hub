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

    export type BindEventsToFileMessage = FileBindingValidators.BindEventsToFileMessage;
    export type BindFilesToEventMessage = FileBindingValidators.BindFilesToEventMessage;

    export type UnbindEventsFromFileMessage = FileBindingValidators.UnbindEventsFromFileMessage;
    export type UnbindFilesFromEventMessage = FileBindingValidators.UnbindFilesFromEventMessage;

    export type SetEventsForFileMessage = FileBindingValidators.SetEventsForFileMessage;
    export type SetFilesForEventMessage = FileBindingValidators.SetFilesForEventMessage;

    export type FileBindingMessage = FileBindingValidators.FileBindingMessage;

    export const messageToJSON = FileBindingValidators.messageToJSON;
}

/**
* Re-exports of types and functions in {@link FileBindingValidators} relating to the filebinding messages. This overrides
* exported types with their correct result types for accuracy.
*/
export namespace FileBindingResponse {
    export type QueryByFileResponse = FileBindingValidators.QueryByFileResponse;
    export type ShallowQueryByFileResponse = FileBindingValidators.ShallowQueryByFileResponse;

    export type QueryByEventResponse = FileBindingValidators.QueryByEventResponse;
    export type ShallowQueryByEventResponse = FileBindingValidators.ShallowQueryByEventResponse;

    export type BindEventsToFileResponse = FileBindingValidators.BindEventsToFileResponse;
    export type BindFilesToEventResponse = FileBindingValidators.BindFilesToEventResponse;

    export type UnbindEventsFromFileResponse = FileBindingValidators.UnbindEventsFromFileResponse;
    export type UnbindFilesFromEventResponse = FileBindingValidators.UnbindFilesFromEventResponse;

    export type SetEventsForFileResponse = FileBindingValidators.SetEventsForFileResponse;
    export type SetFilesForEventResponse = FileBindingValidators.SetFilesForEventResponse;

    export type FileBindingResponse = FileBindingValidators.FileBindingResponseSchema;
}

export const FileBindingMessageValidator = FileBindingValidators.FileBindingMessageValidator;
export const FileBindingResponseValidator = FileBindingValidators.FileBindingResponseValidator;
