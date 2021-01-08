/**
* Restructures ./filebinding into a format to be directly re-exported by src/index.ts
*/
import { FileBindingValidators } from "./FileBindingValidators";

/**
* Re-exports of types and functions in {@link FileBindingValidators} relating to FileBinding messages
*/
export namespace FileBindingMessage {
    export type CreateFileBindingMessage = FileBindingValidators.FileBindingCreateSchema;
    export type UpdateFileBindingMessage = FileBindingValidators.FileBindingUpdateSchema;
    export type DeleteFileBindingMessage = FileBindingValidators.FileBindingDeleteSchema;
    export type ReadFileBindingMessage = FileBindingValidators.FileBindingReadSchema;
    export type FileBindingMessage = FileBindingValidators.FileBindingMessage;
    export const messageToJSON = FileBindingValidators.messageToJSON;
}

/**
* Re-exports of types and functions in {@link FileBindingValidators} relating to the filebinding messages. This overrides
* exported types with their correct result types for accuracy.
*/
export namespace FileBindingResponse {
    export type ShallowInternalFileBinding = FileBindingValidators.ShallowFileBindingRepresentation;
    export type InternalFileBinding = FileBindingValidators.FileBindingRepresentation;
    export type FileBindingReadResponseMessage = Omit<FileBindingValidators.FileBindingResponseSchema, 'result'> & {
        result: FileBindingValidators.FileBindingRepresentation[],
    };
    export type FileBindingServiceReadResponseMessage = Omit<FileBindingValidators.FileBindingResponseSchema, 'result'> & {
        result: FileBindingValidators.ShallowFileBindingRepresentation[],
    };
    export type FileBindingResponseMessage = Omit<FileBindingValidators.FileBindingResponseSchema, 'result'> & {
        result: string[],
    };
}

export const FileBindingMessageValidator = FileBindingValidators.FileBindingMessageValidator;
export const FileBindingResponseValidator = FileBindingValidators.FileBindingResponseValidator;
