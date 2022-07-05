/**
 * Restructures ./comment into a format to be re-exported by src/index.ts
 */
import { CommentValidators } from './CommentValidators';

/**
 * Re-exports of types and functions in {@link CommentValidators} relating to comment messages
 */
export namespace CommentMessage {
    export type ReadCommentMessage = CommentValidators.CommentRead;
    export type CreateCommentMessage = CommentValidators.CommentCreate;
    export type UpdateCommentMessage = CommentValidators.CommentUpdate;
    export type DeleteCommentMessage = CommentValidators.CommentDelete;
    export type CommentMessage = CommentValidators.CommentMessage;
}

/**
 * Re-exports of types and functions in {@link CommentValidators} relating to the comment messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace CommentResponse {
    export type InternalComment = CommentValidators.CommentRepresentation;
    export type CommentServiceReadResponseMessage = CommentValidators.CommentShallowRepresentation;
    export type CommentReadResponseMessage = CommentValidators.CommentReadResponse;
    export type CommentModifyResponseMessage = CommentValidators.CommentModifyResponse;
    export type CommentResponseMessage = CommentReadResponseMessage | CommentModifyResponseMessage;
}

export const CommentMessageValidator = CommentValidators.CommentMessageValidator;
export const CommentResponseValidator = CommentValidators.CommentResponseValidator;
