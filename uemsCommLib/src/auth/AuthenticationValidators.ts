import { UserValidators } from "../user/UserValidators";
import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";

export namespace AuthenticationValidators {

    import UserRepresentation = UserValidators.UserRepresentation;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
    import Intentions = BaseSchema.Intentions;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    export const AUTHENTICATE_MESSAGE = {}

    export const INVALIDATE_TOKEN_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "token",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "token": {
                "type": "string",
                "description": "The token which should be rejected"
            },
        }
    }

    export type InvalidateTokenMessage = {
        token: string,
    }

    export type AuthenticateMessage = {
        identifierBundle: string,
        timestamp: string,
        nonce: string,
    }

    export const SUCCESSFUL_AUTHENTICATE_RESPONSE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "success",
            "user",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "success": {
                "type": "boolean",
                "const": true
            },
            "user": {
                "oneOf": [
                    { ...USER_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            }
        }
    }

    export const UNSUCCESSFUL_AUTHENTICATE_RESPONSE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "success",
            "error",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "success": {
                "type": "boolean",
                "const": false
            },
            "error": {
                "type": "string",
                "description": "The error that occurred when logging in",
            }
        }
    }

    export type SuccessfulAuthenticateResponse = CoreSchemaWithStatus<Intentions> & {
        success: true,
        user: UserRepresentation,
    }

    export type UnsuccessfulAuthenticateResponse = CoreSchemaWithStatus<Intentions> & {
        success: false,
        error: string,
    }

    export type AuthenticationResponseSchema = SuccessfulAuthenticateResponse | UnsuccessfulAuthenticateResponse;
    export type AuthenticationMessage = AuthenticateMessage | InvalidateTokenMessage;

    const AUTHENTICATION_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            AUTHENTICATE_MESSAGE,
            INVALIDATE_TOKEN_MESSAGE
        ],
    };

    const AUTHENTICATION_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            SUCCESSFUL_AUTHENTICATE_RESPONSE,
            UNSUCCESSFUL_AUTHENTICATE_RESPONSE,
        ],
    };

    /**
     * A validator supporting only incoming Authentication messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class AuthenticationMessageValidator extends MessageValidator {

        constructor() {
            super(AUTHENTICATION_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new AuthenticationMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class AuthenticationResponseValidator extends MessageValidator {

        constructor() {
            super(AUTHENTICATION_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new AuthenticationResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: AuthenticationMessage) => JSON.stringify(message);

}
