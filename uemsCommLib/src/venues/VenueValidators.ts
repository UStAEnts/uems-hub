import {MessageValidator} from "../messaging/MessageValidator";
import {has} from "../utilities/ObjectUtilities";
import {BaseSchema} from "../BaseSchema";
import {UserValidators} from "../user/UserValidators";

export namespace VenueValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchema = BaseSchema.CoreSchema;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intention;
    import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
    import UserRepresentation = UserValidators.UserRepresentation;
    /**
     * The JSON schema for an internal representation of venues containing name, capacity and color. Color is defined
     * as a HEX color code.
     * @private
     */
    export const VENUE_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of this venue",
            },
            "name": {
                "type": "string",
                "description": "Name of the venue"
            },
            "capacity": {
                "type": "number",
                "description": "Maximum capacity in any configuration of the venue"
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
                "description": "The optional color for this venue",
            },
            "user": {
                "anyOf": [
                    {...USER_REPRESENTATION},
                    {
                        "type": "string",
                        "description": "The user ID that needs to be resolved",
                    }
                ]
            },
            "date": {
                "type": "number",
                "description": "The date at which this venue was created",
            }
        },
        "required": ["name", "capacity"],
    };

    export type ShallowVenueRepresentation = {
        id: string,
        name: string,
        capacity: number,
        color?: string,
        user: string,
    }

    /**
     * A Typescript type to represent {@link VENUE_REPRESENTATION}. This does not have support for format checking on
     * color so does not exactly match the JSON schema.
     * @public
     */
    export type VenueRepresentation = Omit<ShallowVenueRepresentation, 'user'> & {
        user: UserRepresentation,
    };

    /**
     * JSON schema representing a create venue message. It copies in the core schema for creating without a status
     * because it is a request message.
     * @private
     */
    const VENUE_CREATE_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": "Name of the venue to be created"
            },
            "capacity": {
                "type": "number",
                "description": "Maximum capacity in any configuration of the venue to be created"
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
                "description": "The optional color for this venue",
            },
            "userid": {
                "type": "string",
                "description": "The user identifier",
            }
        },
        "required": [...CORE_REQUIRED, "name", "capacity", "userid"],
    };

    /**
     * A Typescript type to represent {@link VENUE_CREATE_SCHEMA}. This does not have support for format checking on
     * color so does not exactly match the JSON schema.
     * @public
     */
    export type VenueCreateSchema = CoreSchema<'CREATE'> & {
        name: string,
        capacity: number,
        color?: string,
        userid: string,
    }

    /**
     * JSON schema representing the query of a set of venues. Mutual exclusivity is implemented in the validator
     * {@link VenueMessageValidator} and not here for the time being. Therefore for complete validation the message
     * should be run through the validator and not against this schema only
     * @private
     */
    const VENUE_READ_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('READ'),
            "id": {
                "oneOf": [
                    {
                        "type": "string",
                        "description": "The ID of the venue to fetch",
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
                "description": "A name search query"
            },
            "capacity": {
                "type": "number",
                "description": "A capacity search query, this must exactly match the capacity of the venue"
            },
            "approximate_capacity": {
                "type": "number",
                "description": "A capacity search query, this will match anything +/- 50 of the venue, unless overridden by approximate_fuzziness",
            },
            "approximate_fuzziness": {
                "type": "number",
                "description": "How far on each side of approximate_capacity capacities should match",
            },
            "minimum_capacity": {
                "type": "number",
                "description": "A minimum capacity query, returning all venues with a capacity beyond the given value",
            },
            "maximum_capacity": {
                "type": "number",
                "description": "A maximum capacity query, returning all venues with a capacity less than the given value"
            }
        },
        "required": [...CORE_REQUIRED]
    }

    /**
     * A Typescript type to represent {@link VENUE_READ_SCHEMA}. Further verifications applied by the validator
     * {@link VenueMessageValidator} are not represented in this type.
     * @public
     */
    export type VenueReadSchema = CoreSchema<'READ'> & {
        id?: string | string[],
        name?: string,
        capacity?: number,
        approximate_capacity?: number,
        approximate_fuzziness?: number,
        minimum_capacity?: number,
        maximum_capacity?: number,
    };


    /**
     * JSON schema representing the deleting message for a venue.
     * @private
     */
    const VENUE_DELETE_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "id": {
                "type": "string",
                "description": "The ID of the venue to delete",
            }
        },
        "required": [...CORE_REQUIRED, "id"],
    }

    /**
     * A typescript representation of {@link VENUE_DELETE_SCHEMA}
     */
    export type VenueDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    }

    /**
     * JSON schema representing the updating of a venue (basically the venue representation but with no required fields)
     * It requires at least one property so empty updates are not supported
     * @private
     */
    const VENUE_UPDATE_SCHEMA = {
        "additionalProperties": false,
        "minProperties": 2 + CORE_REQUIRED.length,
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "id": {
                "type": "string",
                "description": "The ID of the venue to be updated"
            },
            "name": {
                "type": "string",
                "description": "Name of the venue to be updated"
            },
            "capacity": {
                "type": "number",
                "description": "Maximum capacity in any configuration of the venue to be updated"
            },
            "color": {
                "type": "string",
                "pattern": "^#?([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?)$",
                "description": "The optional color for this venue",
            }
        },
        "required": [...CORE_REQUIRED, "id"],
    }

    /**
     * A typescript representation of {@link VENUE_UPDATE_SCHEMA} the additional requirements on at least one property
     * being defined is not reflected in this type.
     * @public
     */
    export type VenueUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        capacity?: number,
        color?: string,
    }

    /**
     * Represents the generic response message object. It implements the core schema with any possible intention and
     * any status value. The result can either be an array of ids that are impacted by the request or an array of venues
     * to be returned.
     * @private
     */
    const VENUE_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "properties": {
            ...CORE_SCHEMA(['READ', 'DELETE', 'UPDATE', 'CREATE'], true),
            "result":
                {
                    "type": "array",
                    "items": {
                        "oneOf": [
                            {
                                ...VENUE_REPRESENTATION,
                            },
                            {
                                "type": "string",
                            }
                        ]
                    },
                    "description": "The array of created venues",
                }
        },
        "required": [...CORE_REQUIRED, "result"],
    }

    /**
     * A typescript representation of {@link VENUE_RESPONSE_OBJECT_SCHEMA}
     * @public
     */
    export type VenueResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | VenueRepresentation[] | ShallowVenueRepresentation[],
    }

    /**
     * A composite type of all the venue message schemas (READ, UPDATE, DELETE and CREATE)
     * @public
     */
    export type VenueMessage = VenueCreateSchema | VenueUpdateSchema | VenueDeleteSchema | VenueReadSchema;

    /**
     * A composite of all the message schemas wrapped in JSON schema.
     * @private
     */
    const VENUE_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            VENUE_CREATE_SCHEMA,
            VENUE_UPDATE_SCHEMA,
            VENUE_READ_SCHEMA,
            VENUE_DELETE_SCHEMA,
        ],
    }

    /**
     * A composite of all the response schemas wrapped in JSON schema
     * @private
     */
    const VENUE_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            VENUE_RESPONSE_OBJECT_SCHEMA,
        ],
    }

    /**
     * A validator supporting only incoming venue messages (read, create, delete and update) and applying additional
     * validation rules on top of the defined schemas
     */
    export class VenueMessageValidator extends MessageValidator {

        constructor() {
            super(VENUE_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator.
         * @deprecated this is not an async action so you can directly call the constructor
         */
        static async setup() {
            return new VenueMessageValidator()
        }

        /**
         * Validates an incoming message. This also applies the following validation rules
         * * `capacity` cannot be provided alongside any other capacity query
         * * `approximate_capacity` cannot be provided alongside any other capacity query, excluding `approximate_fuzziness`
         * * `approximate_fuzziness` cannot be provided without `approximate_capacity`
         * * `minimum_capacity` and `maximum_capacity` cannot be provided alongside any other capacity query
         * @param msg the incoming message to be validated
         */
        async validate(msg: any): Promise<boolean> {
            if (!await super.validate(msg)) return false;

            // The following checks only apply to READ messages
            if (has(msg, 'msg_intention') && msg['msg_intention'] !== 'READ') return true;

            // If an id is specified you cannot specify any other filters
            if (has(msg, 'id') && (has(msg, 'name') || has(msg, 'capacity') || has(msg, 'approximate_capacity') || has(msg, 'approximate_fuzziness') || has(msg, 'maximum_capacity') || has(msg, 'minimum_capacity'))) {
                return false;
            }
            // If a capacity is specified, you cannot specify other capacity measures
            if (has(msg, 'capacity') && (has(msg, 'approximate_capacity') || has(msg, 'approximate_fuzziness') || has(msg, 'maximum_capacity') || has(msg, 'minimum_capacity'))) {
                return false;
            }
            // If you specify an approximate you cannot specify other capacity measures
            if (has(msg, 'approximate_capacity') && (has(msg, 'capacity') || has(msg, 'maximum_capacity') || has(msg, 'minimum_capacity'))) {
                return false;
            }
            // You cannot specify a fuzzy without an approximate
            if (has(msg, 'approximate_fuzziness') && !has(msg, 'approximate_capacity')) {
                return false;
            }
            // If you specify a minimum/maximum you cannot specify other capacity measures
            return !((has(msg, 'minimum_capacity') || has(msg, 'maximum_capacity')) && (has(msg, 'capacity') || has(msg, 'approximate_capacity') || has(msg, 'approximate_fuzziness')));
        }
    }

    /**
     * A validator supporting only outgoing venue messages (responses)
     */
    export class VenueResponseValidator extends MessageValidator {

        constructor() {
            super(VENUE_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new response validator.
         * @deprecated this is not an async action so you can directly call the constructor
         */
        static async setup() {
            return new VenueResponseValidator()
        }
    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: VenueMessage) => JSON.stringify(message);
}
