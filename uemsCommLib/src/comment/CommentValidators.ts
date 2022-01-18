import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { UserValidators } from "../user/UserValidators";
import {TopicValidators} from "../topic/TopicValidators";

export namespace CommentValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
	import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
	import UserRepresentation = UserValidators.UserRepresentation;
	import TopicRepresentation = TopicValidators.TopicRepresentation;
	import TOPIC_REPRESENTATION = TopicValidators.TOPIC_REPRESENTATION;

	export const COMMENT_REPRESENTATION = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    "id",
	    "assetType",
	    "assetID",
	    "poster",
	    "posted",
        "body",
	  ],
	  "properties": {
	    "id": {
	      "type": "string",
	      "description": ""
	    },
	    "assetType": {
	      "type": "string",
	      "description": ""
	    },
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
        "body": {
          "type": "string",
          "description": "",
        },
	    "poster": {
	      "oneOf": [
	        {...USER_REPRESENTATION},
	        {
	          "type": "string",
	          "description": ""
	        }
	      ]
	    },
	    "posted": {
	      "type": "number",
	      "description": ""
	    },
	    "topic": {
			"oneOf": [
				{...TOPIC_REPRESENTATION},
				{
					"type": "string",
					"description": ""
				}
			]
	    },
	    "requiresAttention": {
	      "type": "boolean",
	      "description": ""
	    },
	    "attendedDate": {
	      "type": "number",
	      "description": ""
	    },
	    "attendedBy": {
	      "oneOf": [
	        {...USER_REPRESENTATION},
	        {
	          "type": "string",
	          "description": ""
	        }
	      ]
	    }
	  }
	}

	export type ShallowCommentRepresentation = {
		id: string,
		assetType: string,
		assetID: string,
		poster: string,
		posted: number,
		topic?: string,
		requiresAttention?: boolean,
		attendedDate?: number,
		attendedBy?: string,
        body: string,
	}

	export type CommentRepresentation = Omit<ShallowCommentRepresentation, 'poster' | 'attendedBy' | 'topic'> & {
		poster: UserRepresentation,
		attendedBy?: UserRepresentation,
		topic?: TopicRepresentation,
	};

	export const COMMENT_CREATE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "assetType",
	    "assetID",
	    "posterID"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('CREATE'),
	    "assetType": {
	      "type": "string",
	      "description": ""
	    },
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "posterID": {
	      "type": "string",
	      "description": ""
	    },
	    "topic": {
	      "type": "string",
	      "description": ""
	    },
	    "requiresAttention": {
	      "type": "boolean",
	      "description": ""
	    },
        "body": {
	      "type": "string",
          "description": "",
        },
		  "localAssetOnly": {
			  "type": "boolean",
			  "description": "If the query should only create a comment on data created by the user identified by " +
				  "userID. If anonymous it will do nothing. This refers to the asset, not the comments"
		  }
	  }
	}

	export type CommentCreateSchema = CoreSchema<'CREATE'> & {
		assetType: string,
		assetID: string,
		posterID: string,
		topic?: string,
		requiresAttention?: boolean,
        body: string,
		localAssetOnly?: boolean,
	};
	export const COMMENT_READ_SCHEMA = {
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
	    "assetType": {
	      "type": "string",
	      "description": ""
	    },
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "posterID": {
	      "type": "string",
	      "description": ""
	    },
	    "posted": {
	      "type": "number",
	      "description": ""
	    },
	    "topic": {
	      "type": "string",
	      "description": ""
	    },
	    "requiresAttention": {
	      "type": "boolean",
	      "description": ""
	    },
	    "attended": {
	      "type": "boolean",
	      "description": ""
	    },
	    "body": {
	      "type": "string",
          "description": "",
        },
		  "localAssetOnly": {
			  "type": "boolean",
			  "description": "If the query should only return data created by the user identified by userID. If " +
				  "anonymous it will do nothing. This refers to the asset, not the comments"
		  }
	  }
	}

	export type CommentReadSchema = CoreSchema<'READ'> & {
		id?: string,
		assetType?: string,
		assetID?: string,
		posterID?: string,
		posted?: number,
		topic?: string,
		requiresAttention?: boolean,
		attended?: boolean,
        body?: string,
		localAssetOnly?: boolean,
	};
	export const COMMENT_DELETE_SCHEMA = {
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

	export type CommentDeleteSchema = CoreSchema<'DELETE'> & {
		id: string,
		localOnly?: boolean,
	};
	export const COMMENT_UPDATE_SCHEMA = {
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
	    "topic": {
	      "type": "string",
	      "description": ""
	    },
	    "requiresAttention": {
	      "type": "boolean",
	      "description": ""
	    },
	    "attendedBy": {
	      "type": "string",
	      "description": ""
	    },
        "body": {
	        "type": "string",
            "description": "",
        },
		"localOnly": {
			"type": "boolean",
			"description": "If the update should only modify data created by the user identified by userID. If " +
				"anonymous it will do nothing"
		}
	  }
	}

	export type CommentUpdateSchema = CoreSchema<'UPDATE'> & {
		id: string,
		topic?: string,
		requiresAttention?: boolean,
		attendedBy?: string,
        body?: string,
		localOnly?: boolean,
	};
	const COMMENT_RESPONSE_OBJECT_SCHEMA = {
	    "additionalProperties": false,
	    "required": [...CORE_REQUIRED, "result"],
	    "properties": {
	        ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
	        "result": {
	            "type": "array",
	            "items": {
	                "oneOf": [
	                    { ...COMMENT_REPRESENTATION },
	                    { "type": "string" }
	                ]
	            },
	            "description": "The array of matched or manipulated responses",
	        },
	    },
	};

	export type CommentResponseSchema = CoreSchemaWithStatus<Intentions> & {
	    result: string[] | ShallowCommentRepresentation[] | CommentRepresentation[],
	};
	export type CommentMessage = CommentCreateSchema | CommentUpdateSchema | CommentDeleteSchema | CommentReadSchema;

	const COMMENT_MESSAGE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        COMMENT_CREATE_SCHEMA,
	        COMMENT_UPDATE_SCHEMA,
	        COMMENT_READ_SCHEMA,
	        COMMENT_DELETE_SCHEMA,
	    ],
	};

	const COMMENT_RESPONSE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        COMMENT_RESPONSE_OBJECT_SCHEMA,
	    ],
	};
	/**
	    * A validator supporting only incoming Comment messages (read, create, delete and update). This uses the default
	    * validation scheme as the state schema does not have any additional validation rules
	    */
	export class CommentMessageValidator extends MessageValidator {

	    constructor() {
	        super(COMMENT_MESSAGE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new CommentMessageValidator();
	    }

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class CommentResponseValidator extends MessageValidator {

	    constructor() {
	        super(COMMENT_RESPONSE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new CommentResponseValidator();
	    }

	}

	/**
	 * Converts a message to JSON applying any additional manipulations, if required
	 * @param message the message to convert to JSON
	 */
	export const messageToJSON = (message: CommentMessage) => JSON.stringify(message);

}
