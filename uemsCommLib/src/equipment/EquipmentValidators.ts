import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { VenueValidators } from "../venues/VenueValidators";
import { UserValidators } from "../user/UserValidators";

export namespace EquipmentValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
	import VENUE_REPRESENTATION = VenueValidators.VENUE_REPRESENTATION;
	import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
	import VenueRepresentation = VenueValidators.VenueRepresentation;
	import UserRepresentation = UserValidators.UserRepresentation;

	export const EQUIPMENT_REPRESENTATION = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    "id",
	    "name",
	    "manufacturer",
	    "model",
	    "amount",
	    "location",
	    "manager",
	    "date",
	    "category"
	  ],
	  "properties": {
	    "id": {
	      "type": "string",
	      "description": ""
	    },
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "name": {
	      "type": "string",
	      "description": ""
	    },
	    "manufacturer": {
	      "type": "string",
	      "description": ""
	    },
	    "model": {
	      "type": "string",
	      "description": ""
	    },
	    "miscIdentifier": {
	      "type": "string",
	      "description": ""
	    },
	    "amount": {
	      "type": "number",
	      "description": ""
	    },
	    "location": {
	      "oneOf": [
	        {...VENUE_REPRESENTATION},
	        {
	          "type": "string",
	          "description": ""
	        }
	      ]
	    },
	    "locationSpecifier": {
	      "type": "string",
	      "description": ""
	    },
	    "manager": {
	      "oneOf": [
	        {...USER_REPRESENTATION},
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
	    "category": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type ShallowEquipmentRepresentation = {
		id: string,
		assetID?: string,
		name: string,
		manufacturer: string,
		model: string,
		miscIdentifier?: string,
		amount: number,
		location: string,
		locationSpecifier?: string,
		manager: string,
		date: number,
		category: string,
	}

	export type EquipmentRepresentation = Omit<ShallowEquipmentRepresentation, 'location' | 'manager'> & {
		location: VenueRepresentation,
		manager: UserRepresentation,
	};

	export const EQUIPMENT_CREATE_SCHEMA = {
	  "type": "object",
	  "additionalProperties": false,
	  "required": [
	    ...CORE_REQUIRED,
	    "name",
	    "manufacturer",
	    "model",
	    "amount",
	    "locationID",
	    "category"
	  ],
	  "properties": {
	    ...CORE_SCHEMA('CREATE'),
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "name": {
	      "type": "string",
	      "description": ""
	    },
	    "manufacturer": {
	      "type": "string",
	      "description": ""
	    },
	    "model": {
	      "type": "string",
	      "description": ""
	    },
	    "miscIdentifier": {
	      "type": "string",
	      "description": ""
	    },
	    "amount": {
	      "type": "number",
	      "description": ""
	    },
	    "locationID": {
	      "type": "string",
	      "description": ""
	    },
	    "locationSpecifier": {
	      "type": "string",
	      "description": ""
	    },
	    "category": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type EquipmentCreateSchema = CoreSchema<'CREATE'> & {
		assetID?: string,
		name: string,
		manufacturer: string,
		model: string,
		miscIdentifier?: string,
		amount: number,
		locationID: string,
		locationSpecifier?: string,
		category: string,
	};
	export const EQUIPMENT_READ_SCHEMA = {
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
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "name": {
	      "type": "string",
	      "description": ""
	    },
	    "manufacturer": {
	      "type": "string",
	      "description": ""
	    },
	    "model": {
	      "type": "string",
	      "description": ""
	    },
	    "miscIdentifier": {
	      "type": "string",
	      "description": ""
	    },
	    "amount": {
	      "type": "number",
	      "description": ""
	    },
	    "locationID": {
	      "type": "string",
	      "description": ""
	    },
	    "locationSpecifier": {
	      "type": "string",
	      "description": ""
	    },
	    "managerID": {
	      "type": "string",
	      "description": ""
	    },
	    "date": {
	      "type": "number",
	      "description": ""
	    },
	    "category": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type EquipmentReadSchema = CoreSchema<'READ'> & {
		id?: string,
		assetID?: string,
		name?: string,
		manufacturer?: string,
		model?: string,
		miscIdentifier?: string,
		amount?: number,
		locationID?: string,
		locationSpecifier?: string,
		managerID?: string,
		date?: number,
		category?: string,
	};
	export const EQUIPMENT_DELETE_SCHEMA = {
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

	export type EquipmentDeleteSchema = CoreSchema<'DELETE'> & {
		id: string,
	};
	export const EQUIPMENT_UPDATE_SCHEMA = {
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
	    "assetID": {
	      "type": "string",
	      "description": ""
	    },
	    "name": {
	      "type": "string",
	      "description": ""
	    },
	    "manufacturer": {
	      "type": "string",
	      "description": ""
	    },
	    "model": {
	      "type": "string",
	      "description": ""
	    },
	    "miscIdentifier": {
	      "type": "string",
	      "description": ""
	    },
	    "amount": {
	      "type": "number",
	      "description": ""
	    },
	    "locationID": {
	      "type": "string",
	      "description": ""
	    },
	    "locationSpecifier": {
	      "type": "string",
	      "description": ""
	    },
	    "managerID": {
	      "type": "string",
	      "description": ""
	    },
	    "category": {
	      "type": "string",
	      "description": ""
	    }
	  }
	}

	export type EquipmentUpdateSchema = CoreSchema<'UPDATE'> & {
		id: string,
		assetID?: string,
		name?: string,
		manufacturer?: string,
		model?: string,
		miscIdentifier?: string,
		amount?: number,
		locationID?: string,
		locationSpecifier?: string,
		managerID?: string,
		category?: string,
	};
	const EQUIPMENT_RESPONSE_OBJECT_SCHEMA = {
	    "additionalProperties": false,
	    "required": [...CORE_REQUIRED, "result"],
	    "properties": {
	        ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
	        "result": {
	            "type": "array",
	            "items": {
	                "oneOf": [
	                    { ...EQUIPMENT_REPRESENTATION },
	                    { "type": "string" }
	                ]
	            },
	            "description": "The array of matched or manipulated responses",
	        },
	    },
	};

	export type EquipmentResponseSchema = CoreSchemaWithStatus<Intentions> & {
	    result: string[] | EquipmentRepresentation[] | ShallowEquipmentRepresentation[],
	};
	export type EquipmentMessage = EquipmentCreateSchema | EquipmentUpdateSchema | EquipmentDeleteSchema | EquipmentReadSchema;

	const EQUIPMENT_MESSAGE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        EQUIPMENT_CREATE_SCHEMA,
	        EQUIPMENT_UPDATE_SCHEMA,
	        EQUIPMENT_READ_SCHEMA,
	        EQUIPMENT_DELETE_SCHEMA,
	    ],
	};

	const EQUIPMENT_RESPONSE_SCHEMA = {
	    "$schema": "http://json-schema.org/draft-07/schema#",
	    "anyOf": [
	        EQUIPMENT_RESPONSE_OBJECT_SCHEMA,
	    ],
	};
	/**
	    * A validator supporting only incoming Equipment messages (read, create, delete and update). This uses the default
	    * validation scheme as the state schema does not have any additional validation rules
	    */
	export class EquipmentMessageValidator extends MessageValidator {

	    constructor() {
	        super(EQUIPMENT_MESSAGE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new EquipmentMessageValidator();
	    }

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class EquipmentResponseValidator extends MessageValidator {

	    constructor() {
	        super(EQUIPMENT_RESPONSE_SCHEMA);
	    }

	    /**
	     * Sets up a new message validator
	     * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
	     */
	    static async setup() {
	        return new EquipmentResponseValidator();
	    }

	}

	/**
	 * Converts a message to JSON applying any additional manipulations, if required
	 * @param message the message to convert to JSON
	 */
	export const messageToJSON = (message: EquipmentMessage) => JSON.stringify(message);

}
