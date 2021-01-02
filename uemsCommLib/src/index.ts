// export * as EventMsg from './messaging/types/event_message_schema';
// export * as EventRes from './messaging/types/event_response_schema';
import * as MessageValidator from './messaging/MessageValidator';
import {has as hasFunc} from './utilities/ObjectUtilities';

export enum MsgStatus {
    SUCCESS = 200,
    FAIL = 405
}

export const MessageIntention = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

export { VenueMessage, VenueResponse, VenueResponseValidator, VenueMessageValidator } from './venues/index';
export { EntStateMessage, EntStateResponse, EntStateResponseValidator, EntStateMessageValidator } from './ent/index';
export { UserMessage, UserResponse, UserResponseValidator, UserMessageValidator } from './user/index';

export { FileMessage, FileResponse, FileResponseValidator, FileMessageValidator } from './file/index';
export { StateMessage, StateResponse, StateResponseValidator, StateMessageValidator } from './state/index';
export { EquipmentMessage, EquipmentResponse, EquipmentResponseValidator, EquipmentMessageValidator } from './equipment/index';
export { VenueReportMessage, VenueReportResponse, VenueReportResponseValidator, VenueReportMessageValidator } from './venuereport/index';
export { CommentMessage, CommentResponse, CommentResponseValidator, CommentMessageValidator } from './comment/index';

export { EventMessage, EventResponse, EventResponseValidator, EventMessageValidator } from './event/index';

export namespace ObjectUtilities {
    export const has = hasFunc;
}

const fs = require('fs').promises;

const EVENT_SCHEMA_PATH: string = './schema/event_schema.json';
const EVENT_RESPONSE_SCHEMA_PATH: string = './schema/event_response_schema.json';

export class EventMsgValidatorDeprecated extends MessageValidator.MessageValidator {
    constructor(schema: Object) {
        super(schema);
    }

    static async setup() {
        // const schema = JSON.parse((await fs.readFile(EVENT_SCHEMA_PATH)).toString());
        const schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "anyOf": [
                {
                    "additionalProperties": false,
                    "properties": {
                        "msg_id": {
                            "type": "number",
                            "description": "An ID for this message which is unique within the system"
                        },
                        "status": {
                            "type": "number",
                            "description": "The status of the message, uses HTTP status codes, 0 value if unset"
                        },
                        "msg_intention": {
                            "type": "string",
                            "enum": ["READ"],
                            "description": "The purpose / intention of the message"
                        },
                        "event_id": {
                            "type": "string",
                            "description": "The unique ID of the event to fetch"
                        },
                        "event_name": {
                            "type": "string",
                            "description": "The new human-readable non-unique name of the event"
                        },
                        "event_start_date_range_begin": {
                            "type": "number",
                            "description": "The start of the event start_date range to use for querying events (as a UTC timestamp in seconds since epoch)"
                        },
                        "event_start_date_range_end": {
                            "type": "number",
                            "description": "The end of the event start_date range to use for querying events (as a UTC timestamp in seconds since epoch)"
                        },
                        "event_end_date_range_begin": {
                            "type": "number",
                            "description": "The start of the event end_date range to use for querying events (as a UTC timestamp in seconds since epoch)"
                        },
                        "event_end_date_range_end": {
                            "type": "number",
                            "description": "The end of the event end_date range to use for querying events (as a UTC timestamp in seconds since epoch)"
                        },
                        "venue_ids": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "The unique venue IDs to search for events in, default to all"
                            }
                        },
                        "predicted_attendance": {
                            "type": "integer",
                            "description": "The attendance of the event"
                        }
                    },
                    "required": ["msg_id", "status", "msg_intention"]
                },
                {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "msg_id": {
                            "type": "number",
                            "description": "An ID for this message which is unique within the system"
                        },
                        "status": {
                            "type": "integer",
                            "description": "The status of the message, uses HTTP status codes, 0 value if unset"
                        },
                        "msg_intention": {
                            "type": "string",
                            "enum": ["CREATE"],
                            "description": "The purpose / intention of the message"
                        },
                        "event_name": {
                            "type": "string",
                            "description": "The new human-readable non-unique name of the event"
                        },
                        "event_start_date": {
                            "type": "number",
                            "description": "The event start_date (as a UTC timestamp in seconds since epoch)"
                        },
                        "event_end_date": {
                            "type": "number",
                            "description": "The event end_date (as a UTC timestamp in seconds since epoch)"
                        },
                        "venue_ids": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "The unique venue IDs to search for events in"
                            }
                        },
                        "predicted_attendance": {
                            "type": "integer",
                            "description": "The predicted attendance of the event"
                        }
                    },
                    "required": ["msg_id", "status", "msg_intention", "event_name", "event_start_date", "event_end_date", "venue_ids", "predicted_attendance"]
                },
                {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "msg_id": {
                            "type": "number",
                            "description": "An ID for this message which is unique within the system"
                        },
                        "status": {
                            "type": "integer",
                            "description": "The status of the message, uses HTTP status codes, 0 value if unset"
                        },
                        "msg_intention": {
                            "type": "string",
                            "enum": ["UPDATE"],
                            "description": "The purpose / intention of the message"
                        },
                        "event_id": {
                            "type": "string",
                            "description": "The unique ID of the event to modify"
                        },
                        "event_name": {
                            "type": "string",
                            "description": "The new human-readable non-unique name of the event"
                        },
                        "event_start_date": {
                            "type": "number",
                            "description": "The new event start_date (as a UTC timestamp in seconds since epoch)"
                        },
                        "event_end_date": {
                            "type": "number",
                            "description": "The new event end_date (as a UTC timestamp in seconds since epoch)"
                        },
                        "venue_ids": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "The new unique venue IDs for the event"
                            }
                        },
                        "predicted_attendance": {
                            "type": "integer",
                            "description": "The new predicted attendance of the event"
                        }
                    },
                    "required": ["msg_id", "status", "msg_intention", "event_id"]
                },
                {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "msg_id": {
                            "type": "number",
                            "description": "An ID for this message which is unique within the system"
                        },
                        "status": {
                            "type": "integer",
                            "description": "The status of the message, uses HTTP status codes, 0 value if unset"
                        },
                        "msg_intention": {
                            "type": "string",
                            "enum": ["DELETE"],
                            "description": "The purpose / intention of the message"
                        },
                        "event_id": {
                            "type": "string",
                            "description": "The unique ID of the event to modify"
                        }
                    },
                    "required": ["msg_id", "status", "msg_intention", "event_id"]
                }
            ]
        };

        return new EventMsgValidatorDeprecated(schema);
    }
}

export class EventResponseValidatorDeprecated extends MessageValidator.MessageValidator {
    constructor(schema: Object) {
        super(schema);
    }

    static async setup() {
        // const schema = JSON.parse((await fs.readFile(EVENT_RESPONSE_SCHEMA_PATH)).toString());
        const schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "anyOf": [
                {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "msg_id": {
                            "type": "number",
                            "description": "An ID for this message which is unique within the system"
                        },
                        "status": {
                            "type": "number",
                            "description": "The status of the response, uses HTTP status codes, 0 value if unset",
                            "default": 0
                        },
                        "msg_intention": {
                            "type": "string",
                            "enum": ["READ", "CREATE", "UPDATE", "DELETE"],
                            "description": "The purpose / intention of the request for which this is the result"
                        },
                        "result": {
                            "type": "array",
                            "items": {
                                "event_id": {
                                    "type": "string",
                                    "description": "The unique ID of the event"
                                },
                                "event_name": {
                                    "type": "string",
                                    "description": "The new human-readable non-unique name of the event"
                                },
                                "event_start_date": {
                                    "type": "number",
                                    "description": "The event start_date to use for querying events (as a UTC timestamp in seconds since epoch)"
                                },
                                "event_end_date": {
                                    "type": "number",
                                    "description": "The event end_date to use for querying events (as a UTC timestamp in seconds since epoch)"
                                },
                                "venue_ids": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "description": "The unique venue IDs to search for events in, default to all"
                                    }
                                },
                                "attendance": {
                                    "type": "integer",
                                    "description": "The attendance of the event"
                                }
                            },
                            "required": ["event_id"]
                        }
                    },
                    "required": ["msg_id", "status", "msg_intention", "result"]
                }
            ]
        };

        return new EventResponseValidatorDeprecated(schema);
    }
}
