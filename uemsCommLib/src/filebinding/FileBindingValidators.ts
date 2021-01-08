import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { EventValidators } from "../event/EventValidators";
import { FileValidators } from "../file/FileValidators";

export namespace FileBindingValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
    import EVENT_REPRESENTATION = EventValidators.EVENT_REPRESENTATION;
    import EventRepresentation = EventValidators.EventRepresentation;
    import FileRepresentation = FileValidators.FileRepresentation;
    import FILE_REPRESENTATION = FileValidators.FILE_REPRESENTATION;

    //==============================================================

    export const BOOLEAN_BINDING_RESPONSE = (x: Intentions) => ({
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "result",
        ],
        "properties": {
            ...CORE_SCHEMA(x),
            "result": {
                "type": "boolean",
                "description": "Indicating if the operation were successful"
            }
        }
    })

    // == READ
    // = Query By File

    export const QUERY_BY_FILE_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "fileID",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "fileID": {
                "type": "string",
                "description": "The file ID for which to retrieve all events",
            }
        }
    }

    export const QUERY_BY_FILE_RESPONSE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "result",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...EVENT_REPRESENTATION },
                        {
                            "type": "string",
                            "description": ""
                        }
                    ]
                }
            }
        }
    }

    export type QueryByFileMessage = CoreSchema<'READ'> & {
        fileID: string,
    }

    export type QueryByFileResponse = CoreSchemaWithStatus<'READ'> & {
        result: EventRepresentation[],
    }

    export type ShallowQueryByFileResponse = CoreSchemaWithStatus<'READ'> & {
        result: string[],
    }

    // = Query By Event

    export const QUERY_BY_EVENT_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "eventID",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "eventID": {
                "type": "string",
                "description": "The event ID for which to fetch files",
            }
        }
    }

    export const QUERY_BY_EVENT_RESPONSE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "result",
        ],
        "properties": {
            ...CORE_SCHEMA('READ'),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...FILE_REPRESENTATION },
                        {
                            "type": "string",
                            "description": ""
                        }
                    ]
                }
            }
        }
    }

    export type QueryByEventMessage = CoreSchema<'READ'> & {
        eventID: string,
    }

    export type QueryByEventResponse = CoreSchemaWithStatus<'READ'> & {
        result: FileRepresentation[],
    }

    export type ShallowQueryByEventResponse = CoreSchemaWithStatus<'READ'> & {
        result: string[],
    }

    // == CREATE
    // = Bind Event to File

    export const BIND_EVENTS_TO_FILE_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "fileID",
            "eventIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "fileID": {
                "type": "string",
                "description": "The file which should be updated with the additional events",
            },
            "eventIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
            }
        }
    }

    export const BIND_EVENTS_TO_FILE_RESPONSE = BOOLEAN_BINDING_RESPONSE('CREATE');

    export type BindEventsToFileMessage = CoreSchema<'CREATE'> & {
        fileID: string,
        eventIDs: string[],
    }

    export type BindEventsToFileResponse = CoreSchemaWithStatus<'CREATE'> & {
        result: boolean,
    }

    // = Bind File to Event

    export const BIND_FILES_TO_EVENT_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "eventID",
            "fileIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "eventID": {
                "type": "string",
                "description": "The event which should have the files attached",
            },
            "fileIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
                "description": "The additional file IDs to bind to the event",
            }
        }
    }

    export const BIND_FILES_TO_EVENT_RESPONSE = BOOLEAN_BINDING_RESPONSE('CREATE');

    export type BindFilesToEventMessage = CoreSchema<'CREATE'> & {
        eventID: string,
        fileIDs: string[],
    }

    export type BindFilesToEventResponse = CoreSchemaWithStatus<'CREATE'> & {
        result: boolean,
    }

    // == DELETE
    // = Unbind Event from File

    export const UNBIND_EVENTS_FROM_FILE_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "fileID",
            "eventIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "fileID": {
                "type": "string",
                "description": "The file to remove these events from",
            },
            "eventIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
                "description": "The events to remove from this file",
            }
        }
    }

    export const UNBIND_EVENTS_FROM_FILE_RESPONSE = BOOLEAN_BINDING_RESPONSE('DELETE');

    export type UnbindEventsFromFileMessage = CoreSchema<'DELETE'> & {
        fileID: string,
        eventIDs: string[],
    }

    export type UnbindEventsFromFileResponse = CoreSchemaWithStatus<'DELETE'> & {
        result: boolean,
    }

    // = Unbind File from Event

    export const UNBIND_FILES_FROM_EVENT_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "eventID",
            "fileIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('DELETE'),
            "eventID": {
                "type": "string",
                "description": "The event id for which files should be removed",
            },
            "fileIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
                "description": "The file ids which should be removed from this event"
            }
        }
    }

    export const UNBIND_FILES_FROM_EVENT_RESPONSE = BOOLEAN_BINDING_RESPONSE('DELETE');

    export type UnbindFilesFromEventMessage = CoreSchema<'DELETE'> & {
        eventID: string,
        fileIDs: string[],
    }

    export type UnbindFilesFromEventResponse = CoreSchemaWithStatus<'DELETE'> & {
        result: boolean,
    }

    // == UPDATE
    // = Set Event for File

    export const SET_EVENTS_FOR_FILE_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "fileID",
            "eventIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "fileID": {
                "type": "string",
                "description": "The file to set these events for",
            },
            "eventIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
                "description": "The only events to be attached to this file",
            }
        }
    }

    export const SET_EVENTS_FOR_FILE_RESPONSE = BOOLEAN_BINDING_RESPONSE('UPDATE');

    export type SetEventsForFileMessage = CoreSchema<'UPDATE'> & {
        fileID: string,
        eventIDs: string[],
    }

    export type SetEventsForFileResponse = CoreSchemaWithStatus<'UPDATE'> & {
        result: boolean,
    }

    // = Set File for Event

    export const SET_FILES_FOR_EVENT_MESSAGE = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "eventID",
            "fileIDs",
        ],
        "properties": {
            ...CORE_SCHEMA('UPDATE'),
            "eventID": {
                "type": "string",
                "description": "The event id for which files should be set",
            },
            "fileIDs": {
                "type": "array",
                "items": {
                    "type": "string",
                },
                "description": "The only file ids which should be present on this event"
            }
        }
    }

    export const SET_FILES_FOR_EVENT_RESPONSE = BOOLEAN_BINDING_RESPONSE('UPDATE');

    export type SetFilesForEventMessage = CoreSchema<'UPDATE'> & {
        eventID: string,
        fileIDs: string[],
    }

    export type SetFilesForEventResponse = CoreSchemaWithStatus<'UPDATE'> & {
        result: boolean,
    }

    // ===========================================================

    export type FileBindingResponseSchema = QueryByFileResponse | ShallowQueryByFileResponse | QueryByEventResponse |
        ShallowQueryByEventResponse | BindEventsToFileResponse | BindFilesToEventResponse |
        UnbindEventsFromFileResponse | UnbindFilesFromEventResponse | SetEventsForFileResponse |
        SetFilesForEventResponse;

    export type FileBindingMessage = QueryByFileMessage | QueryByEventMessage | BindEventsToFileMessage |
        BindFilesToEventMessage | UnbindEventsFromFileMessage | UnbindFilesFromEventMessage |
        SetEventsForFileMessage | SetFilesForEventMessage;

    const FILE_BINDING_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            QUERY_BY_FILE_MESSAGE,
            QUERY_BY_EVENT_MESSAGE,

            BIND_EVENTS_TO_FILE_MESSAGE,
            BIND_FILES_TO_EVENT_MESSAGE,

            UNBIND_EVENTS_FROM_FILE_MESSAGE,
            UNBIND_FILES_FROM_EVENT_MESSAGE,

            SET_EVENTS_FOR_FILE_MESSAGE,
            SET_FILES_FOR_EVENT_MESSAGE,
        ],
    };

    const FILE_BINDING_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            QUERY_BY_FILE_RESPONSE,
            QUERY_BY_EVENT_RESPONSE,

            BIND_EVENTS_TO_FILE_RESPONSE,
            BIND_FILES_TO_EVENT_RESPONSE,

            UNBIND_EVENTS_FROM_FILE_RESPONSE,
            UNBIND_FILES_FROM_EVENT_RESPONSE,

            SET_EVENTS_FOR_FILE_RESPONSE,
            SET_FILES_FOR_EVENT_RESPONSE,
        ],
    };

    /**
     * A validator supporting only incoming FileBinding messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class FileBindingMessageValidator extends MessageValidator {

        constructor() {
            super(FILE_BINDING_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new FileBindingMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class FileBindingResponseValidator extends MessageValidator {

        constructor() {
            super(FILE_BINDING_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new FileBindingResponseValidator();
        }

    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: FileBindingMessage) => JSON.stringify(message);

}
