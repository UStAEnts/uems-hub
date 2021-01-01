/**
 * Restructures ./file into a format to be directly re-exported by src/index.ts
 */
import { FileValidators } from "./FileValidators";

/**
 * Re-exports of types and functions in {@link FileValidators} relating to File messages
 */
export namespace FileMessage {
    export type CreateFileMessage = FileValidators.FileCreateSchema;
    export type UpdateFileMessage = FileValidators.FileUpdateSchema;
    export type DeleteFileMessage = FileValidators.FileDeleteSchema;
    export type ReadFileMessage = FileValidators.FileReadSchema;
    export type FileMessage = FileValidators.FileMessage;
    export const messageToJSON = FileValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link FileValidators} relating to the file messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace FileResponse {
    export type InternalFile = FileValidators.FileRepresentation;
    export type FileReadResponseMessage = Omit<FileValidators.FileResponseSchema, 'result'> & {
        result: FileValidators.FileRepresentation[],
    };
    export type FileResponseMessage = Omit<FileValidators.FileResponseSchema, 'result'> & {
        result: string[],
    };
}

export const FileMessageValidator = FileValidators.FileMessageValidator;
export const FileResponseValidator = FileValidators.FileResponseValidator;
