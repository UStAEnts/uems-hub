/**
 * Restructures ./signup into a format to be re-exported by src/index.ts
 */
import { SignupValidators } from './SignupValidators';

/**
 * Re-exports of types and functions in {@link SignupValidators} relating to signup messages
 */
export namespace SignupMessage {
    export type ReadSignupMessage = SignupValidators.SignupRead;
    export type CreateSignupMessage = SignupValidators.SignupCreate;
    export type UpdateSignupMessage = SignupValidators.SignupUpdate;
    export type DeleteSignupMessage = SignupValidators.SignupDelete;
    export type SignupMessage = SignupValidators.SignupMessage;
}

/**
 * Re-exports of types and functions in {@link SignupValidators} relating to the signup messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace SignupResponse {
    export type InternalSignup = SignupValidators.SignupRepresentation;
    export type ShallowInternalSignup = SignupValidators.SignupShallowRepresentation;
    export type SignupServiceReadResponseMessage = SignupValidators.SignupShallowReadResponse;
    export type SignupReadResponseMessage = SignupValidators.SignupReadResponse;
    export type SignupModifyResponseMessage = SignupValidators.SignupModifyResponse;
    export type SignupResponseMessage = SignupReadResponseMessage | SignupModifyResponseMessage;
}

export const SignupMessageValidator = SignupValidators.SignupMessageValidator;
export const SignupResponseValidator = SignupValidators.SignupResponseValidator;
