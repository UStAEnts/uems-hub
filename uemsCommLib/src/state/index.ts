/**
 * Restructures ./state into a format to be re-exported by src/index.ts
 */
import { StateValidators } from './StateValidators';

/**
 * Re-exports of types and functions in {@link StateValidators} relating to state messages
 */
export namespace StateMessage {
	export type ReadStateMessage = StateValidators.StateRead;
	export type CreateStateMessage = StateValidators.StateCreate;
	export type UpdateStateMessage = StateValidators.StateUpdate;
	export type DeleteStateMessage = StateValidators.StateDelete;
	export type StateMessage = StateValidators.StateMessage;
}

/**
 * Re-exports of types and functions in {@link StateValidators} relating to the state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace StateResponse {
 	export type InternalState = StateValidators.StateRepresentation;
 	export type StateReadResponseMessage = StateValidators.StateReadResponse;
	export type StateModifyResponseMessage = StateValidators.StateModifyResponse;
	export type StateResponseMessage = StateReadResponseMessage | StateModifyResponseMessage;
}

export const StateMessageValidator = StateValidators.StateMessageValidator;
export const StateResponseValidator = StateValidators.StateResponseValidator;
