/**
 * Restructures ./file into a format to be re-exported by src/index.ts
 */
import { FileValidators } from './FileValidators';

/**
 * Re-exports of types and functions in {@link FileValidators} relating to file messages
 */
export namespace FileMessage {
    export type ReadFileMessage = FileValidators.FileRead;
    export type CreateFileMessage = FileValidators.FileCreate;
    export type UpdateFileMessage = FileValidators.FileUpdate;
    export type DeleteFileMessage = FileValidators.FileDelete;
    export type FileMessage = FileValidators.FileMessage;
}

/**
 * Re-exports of types and functions in {@link FileValidators} relating to the file messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace FileResponse {
    export type InternalFile = FileValidators.FileRepresentation;
    export type ShallowInternalFile = FileValidators.FileShallowRepresentation;
    export type FileServiceReadResponseMessage = FileValidators.FileShallowReadResponse;
    export type FileReadResponseMessage = FileValidators.FileReadResponse;
    export type FileModifyResponseMessage = FileValidators.FileModifyResponse;
    export type FileResponseMessage = FileReadResponseMessage | FileModifyResponseMessage;
}

export const FileMessageValidator = FileValidators.FileMessageValidator;
export const FileResponseValidator = FileValidators.FileResponseValidator;
