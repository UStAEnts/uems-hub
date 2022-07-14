/**
 * Restructures ./state into a format to be directly re-exported by src/index.ts
 */
import { TopicValidators } from "./TopicValidators";

/**
 * Re-exports of types and functions in {@link TopicValidators} relating to Topic messages
 */
export namespace TopicMessage {
    export type CreateTopicMessage = TopicValidators.TopicCreate;
    export type UpdateTopicMessage = TopicValidators.TopicUpdate;
    export type DeleteTopicMessage = TopicValidators.TopicDelete;
    export type ReadTopicMessage = TopicValidators.TopicRead;
    export type TopicMessage = TopicValidators.TopicMessage;
}

/**
 * Re-exports of types and functions in {@link TopicValidators} relating to the state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace TopicResponse {
    export type InternalTopic = TopicValidators.TopicRepresentation;
    export type TopicReadResponseMessage = TopicValidators.TopicReadResponse;
    export type TopicResponseMessage = TopicValidators.TopicModifyResponse;
}

export const TopicMessageValidator = TopicValidators.TopicMessageValidator;
export const TopicResponseValidator = TopicValidators.TopicResponseValidator;
