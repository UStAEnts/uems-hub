/**
* Restructures ./signup into a format to be directly re-exported by src/index.ts
*/
import { SignupValidators } from "./SignupValidators";

/**
* Re-exports of types and functions in {@link SignupValidators} relating to Signup messages
*/
export namespace SignupMessage {
    export type CreateSignupMessage = SignupValidators.SignupCreateSchema;
    export type UpdateSignupMessage = SignupValidators.SignupUpdateSchema;
    export type DeleteSignupMessage = SignupValidators.SignupDeleteSchema;
    export type ReadSignupMessage = SignupValidators.SignupReadSchema;
    export type SignupMessage = SignupValidators.SignupMessage;
    export const messageToJSON = SignupValidators.messageToJSON;
}

/**
* Re-exports of types and functions in {@link SignupValidators} relating to the signup messages. This overrides
* exported types with their correct result types for accuracy.
*/
export namespace SignupResponse {
    export type ShallowInternalSignup = SignupValidators.ShallowSignupRepresentation;
    export type InternalSignup = SignupValidators.SignupRepresentation;
    export type SignupReadResponseMessage = Omit<SignupValidators.SignupResponseSchema, 'result'> & {
        result: SignupValidators.SignupRepresentation[],
    };
    export type SignupServiceReadResponseMessage = Omit<SignupValidators.SignupResponseSchema, 'result'> & {
        result: SignupValidators.ShallowSignupRepresentation[],
    }
    export type SignupResponseMessage = Omit<SignupValidators.SignupResponseSchema, 'result'> & {
        result: string[],
    };
}

export const SignupMessageValidator = SignupValidators.SignupMessageValidator;
export const SignupResponseValidator = SignupValidators.SignupResponseValidator;
