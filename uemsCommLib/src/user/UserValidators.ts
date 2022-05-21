import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";

export namespace UserValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;

    export const USER_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of this user on the backend store, this is distinct from their username",
            },
            "name": {
                "type": "string",
                "description": "The real name of the user",
            },
            "username": {
                "type": "string",
                "description": "The username of this user",
            },
            "profile": {
                "type": "string",
                "format": "uri",
                "description": "The profile picture for this user, if not provided it means the user has not uploaded one"
            },
            "email": {
                "type": "string",
                "format": "email",
                "description": "The email address of this user, optionally provided depending on the query",
            },
            "hash": {
                "type": "string",
                "description": "The hash of the users password, optionally provided depending on the query",
            }
        },
        "required": ["id", "name", "username"]
    }

    export type UserRepresentation = {
        id: string,
        name: string,
        username: string,
        profile?: string,
        email?: string,
        hash?: string,
    };

    const USER_CREATE_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "id": {
                "type": "string",
                "description": "A unique identifier for this user, unique to the system",
            },
            "name": {
                "type": "string",
                "description": "The real name of the user",
            },
            "username": {
                "type": "string",
                "description": "The username of this user",
            },
            "profile": {
                "type": "string",
                "format": "uri",
                "description": "The profile picture for this user, if not provided it means the user has not uploaded one"
            },
            "email": {
                "type": "string",
                "description": "The email address of the user registering",
            },
            "hash": {
                "type": "string",
                "description": "The hashed password of this user, for direct storage in the database"
            },
        },
        "required": [...CORE_REQUIRED, "name", "username", "email", "hash", "id"],
    };

    export type UserCreateSchema = CoreSchema<'CREATE'> & {
        id: string,
        name: string,
        username: string,
        profile?: string,
        email: string,
        hash: string,
    }

    // Identical to create but with the assert keyword
    const USER_ASSERT_SCHEMA = {
        ...USER_CREATE_SCHEMA,
        "properties": {
            ...USER_CREATE_SCHEMA.properties,
            ...CORE_SCHEMA('ASSERT'),
        },
    };

    export type UserAssertSchema = CoreSchema<'ASSERT'> & {
        id: string,
        name: string,
        username: string,
        profile?: string,
        email: string,
        hash: string,
    };

    const USER_READ_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "id": {
                "oneOf": [
                    {
                        "type": "string",
                        "description": "The ID of the user to fetch",
                    },
                    {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "The set of IDs which should be fetched in this request"
                        }
                    },
                ]
            },
            "name": {
                "type": "string",
                "description": "The name or substring of the users name",
            },
            "username": {
                "type": "string",
                "description": "The name or substring of the users username",
            },
            "email": {
                "type": "string",
                "description": "The value or substring of the users email",
            },
            "includeEmail": {
                "type": "boolean",
                "description": "Whether to include email addresses in the response of the query",
            },
            "includeHash": {
                "type": "boolean",
                "description": "Whether to include hashes in the response of the query",
            }
        },
    }

    export type UserReadSchema = CoreSchema<'READ'> & {
        id?: string | string[],
        name?: string,
        username?: string,
        email?: string,
        includeEmail?: boolean,
        includeHash?: boolean,
    };

    /**
     * JSON schema representing the deleting message for a user.
     * @private
     */
    const USER_DELETE_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "id"],
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "id": {
                "type": "string",
                "description": "The ID of the user to delete",
            }
        },
    }

    /**
     * A typescript representation of {@link USER_DELETE_SCHEMA}
     */
    export type UserDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    }

    const USER_UPDATE_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "id"],
        "minProperties": 2 + CORE_REQUIRED.length,
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "id": {
                "type": "string",
                "description": "The ID of the user to be udpated",
            },
            "name": {
                "type": "string",
                "description": "The new real name of the user",
            },
            "username": {
                "type": "string",
                "description": "The new username of the user",
            },
            "email": {
                "type": "string",
                "description": "The new email address for the user. This will be used for all future communications",
            },
            "hash": {
                "type": "string",
                "description": "The new password hash which will replace the old one",
            },
            "profile": {
                "type": "string",
                "format": "uri",
                "description": "The new profile URI",
            }
        },
    }

    export type UserUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        username?: string,
        email?: string,
        hash?: string,
        profile?: string,
    };


    const USER_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...USER_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
        },
    }

    export type UserResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | UserRepresentation[],
    };

    export type UserMessage = UserCreateSchema | UserUpdateSchema | UserDeleteSchema | UserReadSchema | UserAssertSchema;

    const USER_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            USER_CREATE_SCHEMA,
            USER_UPDATE_SCHEMA,
            USER_READ_SCHEMA,
            USER_DELETE_SCHEMA,
            USER_ASSERT_SCHEMA,
        ],
    };

    const USER_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            USER_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming venue messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class UserMessageValidator extends MessageValidator {

        constructor() {
            super(USER_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new UserMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class UserResponseValidator extends MessageValidator {

        constructor() {
            super(USER_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new UserResponseValidator();
        }

    }

    export const messageToJSON = (message: UserMessage) => JSON.stringify(message);

}
