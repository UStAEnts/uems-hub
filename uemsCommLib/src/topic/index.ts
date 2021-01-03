/**
 * Restructures ./state into a format to be directly re-exported by src/index.ts
 */
import { TopicValidators } from "./TopicValidators";

/**
 * Re-exports of types and functions in {@link TopicValidators} relating to Topic messages
 */
export namespace TopicMessage {
    export type CreateTopicMessage = TopicValidators.TopicCreateSchema;
    export type UpdateTopicMessage = TopicValidators.TopicUpdateSchema;
    export type DeleteTopicMessage = TopicValidators.TopicDeleteSchema;
    export type ReadTopicMessage = TopicValidators.TopicReadSchema;
    export type TopicMessage = TopicValidators.TopicMessage;
    export const messageToJSON = TopicValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link TopicValidators} relating to the state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace TopicResponse {
    export type InternalTopic = TopicValidators.TopicRepresentation;
    export type TopicReadResponseMessage = Omit<TopicValidators.TopicResponseSchema, 'result'> & {
        result: TopicValidators.TopicRepresentation[],
    };
    export type TopicResponseMessage = Omit<TopicValidators.TopicResponseSchema, 'result'> & {
        result: string[],
    };
}

export const TopicMessageValidator = TopicValidators.TopicMessageValidator;
export const TopicResponseValidator = TopicValidators.TopicResponseValidator;
