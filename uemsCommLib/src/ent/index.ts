/**
 * Restructures ./ent into a format to be directly re-exported by src/index.ts
 */
import { EntStateValidators } from "./EntStateValidators";

/**
 * Re-exports of types and functions in {@link EntStateValidators} relating to ent state messages
 */
export namespace EntStateMessage {
    export type CreateEntStateMessage = EntStateValidators.EntStateCreationSchema;
    export type UpdateEntStateMessage = EntStateValidators.EntStateUpdateSchema;
    export type DeleteEntStateMessage = EntStateValidators.EntStateDeleteSchema;
    export type ReadEntStateMessage = EntStateValidators.EntStateReadSchema;
    export type EntStateMessage = EntStateValidators.EntStateMessage;
    export const messageToJSON = EntStateValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link EntStateValidators} relating to the ent state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace EntStateResponse {
    export type InternalEntState = EntStateValidators.EntStateRepresentation;
    export type EntStateReadResponseMessage = Omit<EntStateValidators.EntStateResponseSchema, 'result'> & {
        result: EntStateValidators.EntStateRepresentation[],
    };
    export type EntStateResponseMessage = Omit<EntStateValidators.EntStateResponseSchema, 'result'> & {
        result: string[],
    };
}

export const EntStateMessageValidator = EntStateValidators.EntStateMessageValidator;
export const EntStateResponseValidator = EntStateValidators.EntStateResponseValidator;
