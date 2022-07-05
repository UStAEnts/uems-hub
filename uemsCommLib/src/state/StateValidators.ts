import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";

export namespace StateValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intention;

    export const STATE_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "id",
            "name",
            "color",
            "icon"
        ],
        "properties": {
            "id": {
                "type": "string",
                "description": ""
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type StateRepresentation = {
        id: string,
        name: string,
        color: string,
        icon: string,
    };
    export const STATE_CREATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "name",
            "color",
            "icon"
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type StateCreateSchema = CoreSchema<'CREATE'> & {
        name: string,
        color: string,
        icon: string,
    };
    export const STATE_READ_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "id": {
                "oneOf": [
                    {
                        "type": "string",
                        "description": "The ID of the state to fetch",
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
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type StateReadSchema = CoreSchema<'READ'> & {
        id?: string | string[],
        name?: string,
        color?: string,
        icon?: string,
    };
    export const STATE_DELETE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "id"
        ],
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "id": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type StateDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };
    export const STATE_UPDATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "minProperties": 2 + CORE_REQUIRED.length,
        "required": [
            ...CORE_REQUIRED,
            "id"
        ],
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "id": {
                "type": "string",
                "description": ""
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$"
            },
            "icon": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type StateUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        color?: string,
        icon?: string,
    };
    const STATE_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...STATE_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
        },
    };

    export type StateResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | StateRepresentation[],
    };
    export type StateMessage = StateCreateSchema | StateUpdateSchema | StateDeleteSchema | StateReadSchema;

    const STATE_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            STATE_CREATE_SCHEMA,
            STATE_UPDATE_SCHEMA,
            STATE_READ_SCHEMA,
            STATE_DELETE_SCHEMA,
        ],
    };

    const STATE_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            STATE_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming State messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class StateMessageValidator extends MessageValidator {

        constructor() {
            super(STATE_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new StateMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class StateResponseValidator extends MessageValidator {

        constructor() {
            super(STATE_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new StateResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: StateMessage) => JSON.stringify(message);

}
