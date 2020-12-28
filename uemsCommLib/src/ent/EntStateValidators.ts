import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";

export namespace EntStateValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchema = BaseSchema.CoreSchema;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;

    /**
     * JSON schema for representing an ent state containing id, name, color and icon. Color is pattern required to be a
     * hex colour code with optional hash character
     * @private
     */
    const ENT_STATE_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of this ent state",
            },
            "name": {
                "type": "string",
                "description": "The name of this ent state",
            },
            "color": {
                "type": "string",
                "description": "The hex colour of the ent state",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
            },
            "icon": {
                "type": "string",
                "icon": "The icon of this ent state, in a format that can be displayed using the frontend client",
            }
        },
        "required": ["id", "name", "color", "icon"],
    };

    /**
     * A type representation of {@link ENT_STATE_REPRESENTATION}. Does not have pattern support so colour is represented
     * as a string, does not fully match the JSON schema
     */
    export type EntStateRepresentation = {
        id: string,
        name: string,
        color: string,
        icon: string,
    };

    /**
     * JSON schema representing a message to create an ent state. Contains a core schema without status as its a message
     * @private
     */
    const ENT_STATE_CREATE_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": "The name of this ent state",
            },
            "color": {
                "type": "string",
                "description": "The hex colour of the ent state",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
            },
            "icon": {
                "type": "string",
                "icon": "The icon of this ent state, in a format that can be displayed using the frontend client",
            }
        },
        "required": [...CORE_REQUIRED, "name", "color", "icon"],
    };

    /**
     * Type representation of {@link ENT_STATE_CREATE_SCHEMA}. Color is defined as a string without pattern requirements
     */
    export type EntStateCreationSchema = CoreSchema<'CREATE'> & {
        name: string,
        color: string,
        icon: string,
    };

    /**
     * JSON schema representing a query for ent states. All parameters are optional, if all are omitted then all are
     * returned. There is no additional validation required beyond this schema.
     * @private
     */
    const ENT_STATE_READ_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('READ'),
            "name": {
                "type": "string",
                "description": "The name or substring of the desired ent state to read",
            },
            "color": {
                "type": "string",
                "description": "The color by which to filter",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
            },
            "icon": {
                "type": "string",
                "description": "The icon or substring of the desired ent state to read",
            }
        },
        "required": [...CORE_REQUIRED],
    }

    /**
     * Type representation of {@link ENT_STATE_READ_SCHEMA}. Color is represented as a string without regex support
     */
    export type EntStateReadSchema = CoreSchema<'READ'> & {
        name?: string,
        color?: string,
        icon?: string,
    };

    /**
     * JSON schema representing deleting an ent state via their ID
     * @private
     */
    const ENT_STATE_DELETE_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "id": {
                "type": "string",
                "description": "The ID of the ent state to delete"
            }
        },
        "required": [...CORE_REQUIRED, "id"],
    };

    /**
     * Type representing {@link ENT_STATE_DELETE_SCHEMA}
     */
    export type EntStateDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };

    /**
     * JSON schema representing updating a venue. It requires at least one property beyond the ID to ensure that at
     * least one property is updated
     * @private
     */
    const ENT_STATE_UPDATE_SCHEMA = {
        "additionalProperties": false,
        "minProperties": 2 + CORE_REQUIRED.length,
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of the ent state to be updated",
            },
            "name": {
                "type": "string",
                "description": "The new name of the ent state",
            },
            "color": {
                "type": "string",
                "description": "The new color of the ent state",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
            },
            "icon": {
                "type": "string",
                "description": "The new icon for the state",
            }
        },
        "required": [...CORE_REQUIRED, "id"],
    }

    /**
     * Type representation of {@link ENT_STATE_UPDATE_SCHEMA}. This does not place a requirement on the number of
     * properties (at least one easily) so all are marked as optional beyond ID. This should be validated in another way
     */
    export type EntStateUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        color?: string,
        icon?: string,
    };


    /**
     * Represents the generic response message object. Implements core schema with any intention and a status value. The
     * result is an array either of strings (ids of the results) or ent state schemas.
     * @private
     */
    const ENT_STATE_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA(['READ', 'DELETE', 'UPDATE', 'CREATE'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        {
                            ...ENT_STATE_REPRESENTATION,
                        },
                        {
                            "type": "string",
                        }
                    ]
                },
                "description": "The array of ent states or IDs manipulated by the query",
            }
        },
        "required": [...CORE_REQUIRED, "result"],
    }

    /**
     * Type representation of {@link ENT_STATE_RESPONSE_OBJECT_SCHEMA}
     */
    export type EntStateResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | EntStateRepresentation[],
    };

    /**
     * A composite type of all the ent state message schemas (READ, UPDATE, DELETE and CREATE)
     */
    export type EntStateMessage = EntStateCreationSchema
        | EntStateUpdateSchema
        | EntStateDeleteSchema
        | EntStateReadSchema;


    /**
     * A JSON schema composite of all the message schemas wrapped in an anyOf expression
     * @private
     */
    const ENT_STATE_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            ENT_STATE_CREATE_SCHEMA,
            ENT_STATE_UPDATE_SCHEMA,
            ENT_STATE_READ_SCHEMA,
            ENT_STATE_DELETE_SCHEMA,
        ]
    };

    /**
     * A composite of the response schema wrapped in a JSON schema (anyOf)
     * @private
     */
    const ENT_STATE_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            ENT_STATE_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming venue messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class EntStateMessageValidator extends MessageValidator {

        constructor() {
            super(ENT_STATE_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new EntStateMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class EntStateResponseValidator extends MessageValidator {

        constructor() {
            super(ENT_STATE_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new EntStateResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: EntStateMessage) => JSON.stringify(message);

}
