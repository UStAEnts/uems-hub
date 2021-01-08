import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { EventValidators } from "../event/EventValidators";

export namespace FileBindingValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
	import EVENT_REPRESENTATION = EventValidators.EVENT_REPRESENTATION;
	import EventRepresentation = EventValidators.EventRepresentation;

	export const FILE_BINDING_REPRESENTATION = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    "events"
	  ],
	  "properties": {
	    "events": {
	      "type": "array",
	      "items": {
	        "oneOf": [
	          {...EVENT_REPRESENTATION},
	          {
	            "type": "string",
	            "description": ""
	          }
	        ]
	      }
	    }
	  }
	}

	export type ShallowFileBindingRepresentation = {
		events: string[],
	};
	export type FileBindingRepresentation = Omit<ShallowFileBindingRepresentation, 'events'> & {
		events: EventRepresentation[],
	}

	export const FILE_BINDING_CREATE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "fileID",
	    "eventIDs"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('CREATE'),
	    "fileID": {
	      "type": "string",
	      "description": ""
	    },
	    "eventIDs": {
	      "type": "array",
	      "items": {
	        "type": "string",
	        "description": ""
	      }
	    }
	  }
	}

	export type FileBindingCreateSchema = CoreSchema<'CREATE'> & {
		fileID: string,
		eventIDs: string[],
	};
	export const FILE_BINDING_READ_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "fileID"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('READ'),
	    "fileID": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type FileBindingReadSchema = CoreSchema<'READ'> & {
		fileID: string,
	};
	export const FILE_BINDING_DELETE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "fileID"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('DELETE'),
	    "fileID": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type FileBindingDeleteSchema = CoreSchema<'DELETE'> & {
		fileID: string,
	};
	export const FILE_BINDING_UPDATE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "minProperties": 2 + CORE_REQUIRED.length,
	  "required": [
	    ...CORE_REQUIRED,
	    "fileID"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('UPDATE'),
	    "fileID": {
	      "type": "string",
	      "description": ""
	    },
	    "eventIDs": {
	      "type": "array",
	      "items": {
	        "type": "string",
	        "description": ""
	      }
	    },
	    "addEvents": {
	      "type": "array",
	      "items": {
	        "type": "string",
	        "description": ""
	      }
	    },
	    "removeEvents": {
	      "type": "array",
	      "items": {
	        "type": "string",
	        "description": ""
	      }
	    }
	  }
	}

	export type FileBindingUpdateSchema = CoreSchema<'UPDATE'> & {
		fileID: string,
		eventIDs?: string[],
		addEvents?: string[],
		removeEvents?: string[],
	};
	const FILE_BINDING_RESPONSE_OBJECT_SCHEMA = {
	    "additionalProperties": false,
	    "required": [...CORE_REQUIRED, "result"],
	    "properties": {
	        ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
	        "result": {
	            "type": "array",
	            "items": {
	                "oneOf": [
	                    { ...FILE_BINDING_REPRESENTATION },
	                    { "type": "string" }
	                ]
	            },
	            "description": "The array of matched or manipulated responses",
	        },
	    },
	};

	export type FileBindingResponseSchema = CoreSchemaWithStatus<Intentions> & {
	    result: string[] | FileBindingRepresentation[] | ShallowFileBindingRepresentation[],
	};
	export type FileBindingMessage = FileBindingCreateSchema | FileBindingUpdateSchema | FileBindingDeleteSchema | FileBindingReadSchema;

	const FILE_BINDING_MESSAGE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        FILE_BINDING_CREATE_SCHEMA,
	        FILE_BINDING_UPDATE_SCHEMA,
	        FILE_BINDING_READ_SCHEMA,
	        FILE_BINDING_DELETE_SCHEMA,
	    ],
	};

	const FILE_BINDING_RESPONSE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        FILE_BINDING_RESPONSE_OBJECT_SCHEMA,
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
