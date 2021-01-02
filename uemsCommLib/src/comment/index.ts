/**
* Restructures ./comment into a format to be directly re-exported by src/index.ts
*/
import { CommentValidators } from "./CommentValidators";

/**
* Re-exports of types and functions in {@link CommentValidators} relating to Comment messages
*/
export namespace CommentMessage {
    export type CreateCommentMessage = CommentValidators.CommentCreateSchema;
    export type UpdateCommentMessage = CommentValidators.CommentUpdateSchema;
    export type DeleteCommentMessage = CommentValidators.CommentDeleteSchema;
    export type ReadCommentMessage = CommentValidators.CommentReadSchema;
    export type CommentMessage = CommentValidators.CommentMessage;
    export const messageToJSON = CommentValidators.messageToJSON;
}

/**
* Re-exports of types and functions in {@link CommentValidators} relating to the comment messages. This overrides
* exported types with their correct result types for accuracy.
*/
export namespace CommentResponse {
    export type ShallowInternalComment = CommentValidators.ShallowCommentRepresentation;
	export type InternalComment = CommentValidators.CommentRepresentation;
    export type CommentReadResponseMessage = Omit<CommentValidators.CommentResponseSchema, 'result'> & {
        result: CommentValidators.CommentRepresentation[],
    };
    export type CommentResponseMessage = Omit<CommentValidators.CommentResponseSchema, 'result'> & {
        result: string[],
    };
}

export const CommentMessageValidator = CommentValidators.CommentMessageValidator;
export const CommentResponseValidator = CommentValidators.CommentResponseValidator;
