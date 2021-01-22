import { AuthenticationValidators } from "./AuthenticationValidators";

export namespace AuthenticationMessage {
    export type InvalidateTokenMessage = AuthenticationValidators.InvalidateTokenMessage;
    export type AuthenticateMessage = AuthenticationValidators.AuthenticateMessage;
    export type AuthenticationMessage = AuthenticationValidators.AuthenticationMessage;
    export const messageToJSON = AuthenticationValidators.messageToJSON;
}

export namespace AuthenticationResponse {
    export type AuthenticateResponse = AuthenticationValidators.AuthenticationResponseSchema;
    export type SuccessfulAuthenticateResponse = AuthenticationValidators.SuccessfulAuthenticateResponse;
    export type UnsuccessfulAuthenticateResponse = AuthenticationValidators.UnsuccessfulAuthenticateResponse;
}

export const AuthenticationMessageValidator = AuthenticationValidators.AuthenticationMessageValidator;
export const AuthenticationResponseValidator = AuthenticationValidators.AuthenticationResponseValidator;
