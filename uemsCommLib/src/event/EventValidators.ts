import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { VenueValidators } from "../venues/VenueValidators";
import { EntStateValidators } from "../ent/EntStateValidators";
import { StateValidators } from "../state/StateValidators";
import {UserValidators} from "../user/UserValidators";

export namespace EventValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
    import VENUE_REPRESENTATION = VenueValidators.VENUE_REPRESENTATION;
    import VenueRepresentation = VenueValidators.VenueRepresentation;
    import ENT_STATE_REPRESENTATION = EntStateValidators.ENT_STATE_REPRESENTATION;
    import STATE_REPRESENTATION = StateValidators.STATE_REPRESENTATION;
    import EntStateRepresentation = EntStateValidators.EntStateRepresentation;
    import StateRepresentation = StateValidators.StateRepresentation;
    import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
    import UserRepresentation = UserValidators.UserRepresentation;

    export const EVENT_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "id",
            "name",
            "start",
            "end",
            "venues",
            "attendance"
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
            "start": {
                "type": "number",
                "description": ""
            },
            "end": {
                "type": "number",
                "description": ""
            },
            "venues": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...VENUE_REPRESENTATION },
                        {
                            "type": "string",
                            "description": ""
                        }
                    ]
                }
            },
            "attendance": {
                "type": "number",
                "description": ""
            },
            "ents": {
                "oneOf": [
                    { ...ENT_STATE_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            },
            "state": {
                "oneOf": [
                    { ...STATE_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            },
            "author": {
                "oneOf": [
                    {...USER_REPRESENTATION},
                    {
                        "type": "string",
                        "description": "",
                    }
                ]
            }
        }
    }

    export type ShallowEventRepresentation = {
        id: string,
        name: string,
        start: number,
        end: number,
        venues: string[],
        attendance: number,
        ents?: string,
        state?: string,
        author: string,
    }

    export type EventRepresentation = Omit<ShallowEventRepresentation, 'ents' | 'state' | 'venues' | 'author'> & {
        venues: VenueRepresentation[],
        ents?: EntStateRepresentation,
        state?: StateRepresentation,
        author: UserRepresentation,
    };

    export const EVENT_CREATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "name",
            "start",
            "end",
            "attendance",
            "venueIDs"
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": ""
            },
            "start": {
                "type": "number",
                "description": ""
            },
            "end": {
                "type": "number",
                "description": ""
            },
            "attendance": {
                "type": "number",
                "description": ""
            },
            "venueIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "entsID": {
                "type": "string",
                "description": ""
            },
            "stateID": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type EventCreateSchema = CoreSchema<'CREATE'> & {
        name: string,
        start: number,
        end: number,
        attendance: number,
        venueIDs: string[],
        entsID?: string,
        stateID?: string,
    };
    export const EVENT_READ_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "id": {
                "type": "string",
                "description": ""
            },
            "name": {
                "type": "string",
                "description": ""
            },
            "start": {
                "type": "number",
                "description": ""
            },
            "end": {
                "type": "number",
                "description": ""
            },
            "attendance": {
                "type": "number",
                "description": ""
            },
            "venueIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "entsID": {
                "type": "string",
                "description": ""
            },
            "stateID": {
                "type": "string",
                "description": ""
            },
            "startRangeBegin": {
                "type": "number",
                "description": ""
            },
            "startRangeEnd": {
                "type": "number",
                "description": ""
            },
            "endRangeBegin": {
                "type": "number",
                "description": ""
            },
            "endRangeEnd": {
                "type": "number",
                "description": ""
            },
            "attendanceRangeBegin": {
                "type": "number",
                "description": ""
            },
            "attendanceRangeEnd": {
                "type": "number",
                "description": ""
            },
            "allVenues": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "anyVenues": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "localOnly": {
                "type": "boolean",
                "description": "If the query should only return data created by the user identified by userID. If " +
                    "anonymous it will return nothing"
            }
        }
    }

    export type EventReadSchema = CoreSchema<'READ'> & {
        id?: string,
        name?: string,
        start?: number,
        end?: number,
        attendance?: number,
        venueIDs?: string[],
        entsID?: string,
        stateID?: string,
        startRangeBegin?: number,
        startRangeEnd?: number,
        endRangeBegin?: number,
        endRangeEnd?: number,
        attendanceRangeBegin?: number,
        attendanceRangeEnd?: number,
        allVenues?: string[],
        anyVenues?: string[],
        localOnly?: boolean,
    };
    export const EVENT_DELETE_SCHEMA = {
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
            },
            "localOnly": {
                "type": "boolean",
                "description": "If the delete should only affect data created by the user identified by userID. If " +
                    "anonymous it will perform nothing"
            }
        }
    }

    export type EventDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };
    export const EVENT_UPDATE_SCHEMA = {
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
            "start": {
                "type": "number",
                "description": ""
            },
            "end": {
                "type": "number",
                "description": ""
            },
            "attendance": {
                "type": "number",
                "description": ""
            },
            "venueIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "addVenues": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "removeVenues": {
                "type": "array",
                "items": {
                    "type": "string",
                    "description": ""
                }
            },
            "entsID": {
                "type": "string",
                "description": ""
            },
            "stateID": {
                "type": "string",
                "description": ""
            },
            "localOnly": {
                "type": "boolean",
                "description": "If the update should only affect data created by the user identified by userID. If " +
                    "anonymous it will perform nothing"
            }
        }
    }

    export type EventUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        start?: number,
        end?: number,
        attendance?: number,
        venueIDs?: string[],
        addVenues?: string[],
        removeVenues?: string[],
        entsID?: string,
        stateID?: string,
        localOnly?: boolean,
    };
    const EVENT_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...EVENT_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
        },
    };

    export type EventResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | EventRepresentation[] | ShallowEventRepresentation[],
    };
    export type EventMessage = EventCreateSchema | EventUpdateSchema | EventDeleteSchema | EventReadSchema;

    const EVENT_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            EVENT_CREATE_SCHEMA,
            EVENT_UPDATE_SCHEMA,
            EVENT_READ_SCHEMA,
            EVENT_DELETE_SCHEMA,
        ],
    };

    const EVENT_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            EVENT_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming Event messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class EventMessageValidator extends MessageValidator {

        constructor() {
            super(EVENT_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new EventMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class EventResponseValidator extends MessageValidator {

        constructor() {
            super(EVENT_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new EventResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: EventMessage) => JSON.stringify(message);

}
