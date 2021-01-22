/**
 * Restructures ./state into a format to be directly re-exported by src/index.ts
 */
import { StateValidators } from "./StateValidators";

/**
 * Re-exports of types and functions in {@link StateValidators} relating to State messages
 */
export namespace StateMessage {
    export type CreateStateMessage = StateValidators.StateCreateSchema;
    export type UpdateStateMessage = StateValidators.StateUpdateSchema;
    export type DeleteStateMessage = StateValidators.StateDeleteSchema;
    export type ReadStateMessage = StateValidators.StateReadSchema;
    export type StateMessage = StateValidators.StateMessage;
    export const messageToJSON = StateValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link StateValidators} relating to the state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace StateResponse {
    export type InternalState = StateValidators.StateRepresentation;
    export type StateReadResponseMessage = Omit<StateValidators.StateResponseSchema, 'result'> & {
        result: StateValidators.StateRepresentation[],
    };
    export type StateResponseMessage = Omit<StateValidators.StateResponseSchema, 'result'> & {
        result: string[],
    };
}

export const StateMessageValidator = StateValidators.StateMessageValidator;
export const StateResponseValidator = StateValidators.StateResponseValidator;
