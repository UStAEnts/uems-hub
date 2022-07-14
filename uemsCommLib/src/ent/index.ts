/**
 * Restructures ./ent-state into a format to be re-exported by src/index.ts
 */
import { EntStateValidators } from './EntStateValidators';

/**
 * Re-exports of types and functions in {@link EntStateValidators} relating to ent state messages
 */
export namespace EntStateMessage {
    export type ReadEntStateMessage = EntStateValidators.EntStateRead;
    export type CreateEntStateMessage = EntStateValidators.EntStateCreate;
    export type UpdateEntStateMessage = EntStateValidators.EntStateUpdate;
    export type DeleteEntStateMessage = EntStateValidators.EntStateDelete;
    export type EntStateMessage = EntStateValidators.EntStateMessage;
}

/**
 * Re-exports of types and functions in {@link EntStateValidators} relating to the ent state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace EntStateResponse {
    export type InternalEntState = EntStateValidators.EntStateRepresentation;
    export type EntStateReadResponseMessage = EntStateValidators.EntStateReadResponse;
    export type EntStateModifyResponseMessage = EntStateValidators.EntStateModifyResponse;
    export type EntStateResponseMessage = EntStateReadResponseMessage | EntStateModifyResponseMessage;
}

export const EntStateMessageValidator = EntStateValidators.EntStateMessageValidator;
export const EntStateResponseValidator = EntStateValidators.EntStateResponseValidator;
