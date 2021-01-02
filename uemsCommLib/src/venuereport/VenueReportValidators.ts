import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { EquipmentValidators } from "../equipment/EquipmentValidators";
import { UserValidators } from "../user/UserValidators";

export namespace VenueReportValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
    import EQUIPMENT_REPRESENTATION = EquipmentValidators.EQUIPMENT_REPRESENTATION;
    import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
    import EquipmentRepresentation = EquipmentValidators.EquipmentRepresentation;
    import UserRepresentation = UserValidators.UserRepresentation;

    export const VENUEREPORT_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "id",
            "equipment",
            "report",
            "reporter",
            "date",
            "state"
        ],
        "properties": {
            "id": {
                "type": "string",
                "description": ""
            },
            "equipment": {
                "oneOf": [
                    { ...EQUIPMENT_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            },
            "report": {
                "type": "string",
                "description": ""
            },
            "reporter": {
                "oneOf": [
                    { ...USER_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "state": {
                "type": "string",
                "description": ""
            },
            "resolvedDate": {
                "type": "number",
                "description": ""
            },
            "resolver": {
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

    export type ShallowVenueReportRepresentation = {
        id: string,
        equipment: string,
        report: string,
        reporter: string,
        date: number,
        state: string,
        resolvedDate?: number,
        resolver?: string,
    }

    export type VenueReportRepresentation = Omit<ShallowVenueReportRepresentation, 'equipment' | 'reporter' | 'resolver'> & {
        equipment: EquipmentRepresentation,
        reporter: UserRepresentation,
        resolver?: UserRepresentation,
    };

    export const VENUEREPORT_CREATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "equipmentID",
            "report"
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "equipmentID": {
                "type": "string",
                "description": ""
            },
            "report": {
                "type": "string",
                "description": ""
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "state": {
                "type": "string",
                "description": ""
            },
            "resolvedDate": {
                "type": "number",
                "description": ""
            },
            "resolverID": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type VenueReportCreateSchema = CoreSchema<'CREATE'> & {
        equipmentID: string,
        report: string,
        date?: number,
        state?: string,
        resolvedDate?: number,
        resolverID?: string,
    };
    export const VENUEREPORT_READ_SCHEMA = {
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
            "equipmentID": {
                "type": "string",
                "description": ""
            },
            "report": {
                "type": "string",
                "description": ""
            },
            "reporterID": {
                "type": "string",
                "description": ""
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "state": {
                "type": "string",
                "description": ""
            },
            "resolvedDate": {
                "type": "number",
                "description": ""
            },
            "resolved": {
                "type": "boolean",
                "description": ""
            },
            "resolverID": {
                "type": "string",
                "description": ""
            },
            "openFor": {
                "type": "number",
                "description": ""
            }
        }
    }

    export type VenueReportReadSchema = CoreSchema<'READ'> & {
        id?: string,
        equipmentID?: string,
        report?: string,
        reporterID?: string,
        date?: number,
        state?: string,
        resolvedDate?: number,
        resolved?: boolean,
        resolverID?: string,
        openFor?: number,
    };
    export const VENUEREPORT_DELETE_SCHEMA = {
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

    export type VenueReportDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };
    export const VENUEREPORT_UPDATE_SCHEMA = {
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
            "equipmentID": {
                "type": "string",
                "description": ""
            },
            "report": {
                "type": "string",
                "description": ""
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "state": {
                "type": "string",
                "description": ""
            },
            "resolved": {
                "type": "boolean",
                "description": ""
            },
            "resolverID": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type VenueReportUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        equipmentID?: string,
        report?: string,
        date?: number,
        state?: string,
        resolved?: boolean,
        resolverID?: string,
    };
    const VENUEREPORT_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...VENUEREPORT_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
        },
    };

    export type VenueReportResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | VenueReportRepresentation[],
    };
    export type VenueReportMessage =
        VenueReportCreateSchema
        | VenueReportUpdateSchema
        | VenueReportDeleteSchema
        | VenueReportReadSchema;

    const VENUEREPORT_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            VENUEREPORT_CREATE_SCHEMA,
            VENUEREPORT_UPDATE_SCHEMA,
            VENUEREPORT_READ_SCHEMA,
            VENUEREPORT_DELETE_SCHEMA,
        ],
    };

    const VENUEREPORT_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            VENUEREPORT_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming VenueReport messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class VenueReportMessageValidator extends MessageValidator {

        constructor() {
            super(VENUEREPORT_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new VenueReportMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class VenueReportResponseValidator extends MessageValidator {

        constructor() {
            super(VENUEREPORT_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new VenueReportResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: VenueReportMessage) => JSON.stringify(message);

}
