import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { UserValidators } from "../user/UserValidators";
import { EventValidators } from "../event/EventValidators";

export namespace SignupValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
	import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
	import EVENT_REPRESENTATION = EventValidators.EVENT_REPRESENTATION;
	import UserRepresentation = UserValidators.UserRepresentation;
	import EventRepresentation = EventValidators.EventRepresentation;

	export const SIGNUP_REPRESENTATION = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    "id",
	    "user",
	    "event",
	    "role",
	    "date"
	  ],
	  "properties": {
	    "id": {
	      "type": "string",
	      "description": ""
	    },
	    "user": {
	      "oneOf": [
	        {...USER_REPRESENTATION},
	        {
	          "type": "string",
	          "description": ""
	        }
	      ]
	    },
	    "event": {
	      "oneOf": [
	        {...EVENT_REPRESENTATION},
	        {
	          "type": "string",
	          "description": ""
	        }
	      ]
	    },
	    "role": {
	      "type": "string",
	      "description": ""
	    },
	    "date": {
	      "type": "number",
	      "description": ""
	    }
	  }
	}

	export type ShallowSignupRepresentation = {
		id: string,
		user: string,
		event: string,
		role: string,
		date: number,
	};

	export type SignupRepresentation = Omit<ShallowSignupRepresentation, 'user' | 'event'> & {
		user: UserRepresentation,
		event: EventRepresentation,
	}

	export const SIGNUP_CREATE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "userid",
	    "eventID",
	    "role"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('CREATE'),
	    "userid": {
	      "type": "string",
	      "description": ""
	    },
	    "eventID": {
	      "type": "string",
	      "description": ""
	    },
	    "role": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type SignupCreateSchema = CoreSchema<'CREATE'> & {
		userid: string,
		eventID: string,
		role: string,
	};
	export const SIGNUP_READ_SCHEMA = {
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
	    "userid": {
	      "type": "string",
	      "description": ""
	    },
	    "eventID": {
	      "type": "string",
	      "description": ""
	    },
	    "role": {
	      "type": "string",
	      "description": ""
	    },
	    "date": {
	      "type": "number",
	      "description": ""
	    },
	    "dateRangeBegin": {
	      "type": "number",
	      "description": ""
	    },
	    "dateRangeEnd": {
	      "type": "number",
	      "description": ""
	    }
	  }
	}

	export type SignupReadSchema = CoreSchema<'READ'> & {
		id?: string,
		userid?: string,
		eventID?: string,
		role?: string,
		date?: number,
		dateRangeBegin?: number,
		dateRangeEnd?: number,
	};
	export const SIGNUP_DELETE_SCHEMA = {
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

	export type SignupDeleteSchema = CoreSchema<'DELETE'> & {
		id: string,
	};
	export const SIGNUP_UPDATE_SCHEMA = {
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
	    "role": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type SignupUpdateSchema = CoreSchema<'UPDATE'> & {
		id: string,
		role?: string,
	};
	const SIGNUP_RESPONSE_OBJECT_SCHEMA = {
	    "additionalProperties": false,
	    "required": [...CORE_REQUIRED, "result"],
	    "properties": {
	        ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
	        "result": {
	            "type": "array",
	            "items": {
	                "oneOf": [
	                    { ...SIGNUP_REPRESENTATION },
	                    { "type": "string" }
	                ]
	            },
	            "description": "The array of matched or manipulated responses",
	        },
	    },
	};

	export type SignupResponseSchema = CoreSchemaWithStatus<Intentions> & {
	    result: string[] | SignupRepresentation[] | ShallowSignupRepresentation[],
	};
	export type SignupMessage = SignupCreateSchema | SignupUpdateSchema | SignupDeleteSchema | SignupReadSchema;

	const SIGNUP_MESSAGE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        SIGNUP_CREATE_SCHEMA,
	        SIGNUP_UPDATE_SCHEMA,
	        SIGNUP_READ_SCHEMA,
	        SIGNUP_DELETE_SCHEMA,
	    ],
	};

	const SIGNUP_RESPONSE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        SIGNUP_RESPONSE_OBJECT_SCHEMA,
	    ],
	};
	/**
	    * A validator supporting only incoming Signup messages (read, create, delete and update). This uses the default
	    * validation scheme as the state schema does not have any additional validation rules
	    */
	export class SignupMessageValidator extends MessageValidator {

	    constructor() {
	        super(SIGNUP_MESSAGE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new SignupMessageValidator();
	    }

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class SignupResponseValidator extends MessageValidator {

	    constructor() {
	        super(SIGNUP_RESPONSE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new SignupResponseValidator();
	    }

	}

	/**
	 * Converts a message to JSON applying any additional manipulations, if required
	 * @param message the message to convert to JSON
	 */
	export const messageToJSON = (message: SignupMessage) => JSON.stringify(message);

}
