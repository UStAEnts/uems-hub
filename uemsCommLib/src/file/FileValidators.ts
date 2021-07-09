import { BaseSchema } from "../BaseSchema";
import { MessageValidator } from "../messaging/MessageValidator";
import { UserValidators } from "../user/UserValidators";

export namespace FileValidators {

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CoreSchema = BaseSchema.CoreSchema;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    import Intentions = BaseSchema.Intentions;
    import USER_REPRESENTATION = UserValidators.USER_REPRESENTATION;
    import UserRepresentation = UserValidators.UserRepresentation;

    export const FILE_REPRESENTATION = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "id",
            "name",
            "filename",
            "size",
            "mime",
            "owner",
            "type",
            "date"
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
            "filename": {
                "type": "string",
                "description": ""
            },
            "size": {
                "type": "number",
                "description": ""
            },
            "mime": {
                "type": "string",
                "description": ""
            },
            "owner": {
                "oneOf": [
                    { ...USER_REPRESENTATION },
                    {
                        "type": "string",
                        "description": ""
                    }
                ]
            },
            "type": {
                "type": "string",
                "description": ""
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "downloadURL": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type ShallowFileRepresentation = {
        id: string,
        name: string,
        filename: string,
        size: number,
        mime: string,
        owner: string,
        type: string,
        date: number,
        downloadURL: string,
    }

    export type FileRepresentation = Omit<ShallowFileRepresentation, 'owner'> & {
        owner: UserRepresentation,
    };

    export const FILE_CREATE_SCHEMA = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            ...CORE_REQUIRED,
            "name",
            "filename",
            "size",
            "type",
        ],
        "properties": {
            ...CORE_SCHEMA('CREATE'),
            "name": {
                "type": "string",
                "description": ""
            },
            "filename": {
                "type": "string",
                "description": ""
            },
            "size": {
                "type": "number",
                "description": ""
            },
            "type": {
                "type": "string",
                "description": ""
            },
        }
    }

    export type FileCreateSchema = CoreSchema<'CREATE'> & {
        name: string,
        filename: string,
        size: number,
        type: string,
    };
    export const FILE_READ_SCHEMA = {
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
            "filename": {
                "type": "string",
                "description": ""
            },
            "size": {
                "type": "number",
                "description": ""
            },
            "type": {
                "type": "string",
                "description": ""
            },
            "date": {
                "type": "number",
                "description": ""
            },
            "userid": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type FileReadSchema = CoreSchema<'READ'> & {
        id?: string,
        name?: string,
        filename?: string,
        size?: number,
        type?: string,
        date?: number,
        userid?: string,
    };
    export const FILE_DELETE_SCHEMA = {
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

    export type FileDeleteSchema = CoreSchema<'DELETE'> & {
        id: string,
    };
    export const FILE_UPDATE_SCHEMA = {
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
            "type": {
                "type": "string",
                "description": ""
            }
        }
    }

    export type FileUpdateSchema = CoreSchema<'UPDATE'> & {
        id: string,
        name?: string,
        type?: string,
    };
    const FILE_RESPONSE_OBJECT_SCHEMA = {
        "additionalProperties": false,
        "required": [...CORE_REQUIRED, "result"],
        "properties": {
            ...CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'READ'], true),
            "result": {
                "type": "array",
                "items": {
                    "oneOf": [
                        { ...FILE_REPRESENTATION },
                        { "type": "string" }
                    ]
                },
                "description": "The array of matched or manipulated responses",
            },
            "uploadURI": {
                "type": "string",
                "description": "optional upload URI on create responses",
            }
        },
    };

    export type FileResponseSchema = CoreSchemaWithStatus<Intentions> & {
        result: string[] | FileRepresentation[] | ShallowFileRepresentation[],
        uploadURI?: string,
    };

    export type FileMessage = FileCreateSchema | FileUpdateSchema | FileDeleteSchema | FileReadSchema;

    const FILE_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            FILE_CREATE_SCHEMA,
            FILE_UPDATE_SCHEMA,
            FILE_READ_SCHEMA,
            FILE_DELETE_SCHEMA,
        ],
    };

    const FILE_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            FILE_RESPONSE_OBJECT_SCHEMA,
        ],
    };

    /**
     * A validator supporting only incoming File messages (read, create, delete and update). This uses the default
     * validation scheme as the state schema does not have any additional validation rules
     */
    export class FileMessageValidator extends MessageValidator {

        constructor() {
            super(FILE_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new FileMessageValidator();
        }

    }

    /**
     * A validator supporting only outgoing messages
     */
    export class FileResponseValidator extends MessageValidator {

        constructor() {
            super(FILE_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup() {
            return new FileResponseValidator();
        }

        async validate(msg: any): Promise<boolean> {
            if(!await super.validate(msg)){
                return false;
            }

            // If validation has passed we want to make sure that the upload URI is valid
            if(typeof(msg.uploadURI) === 'undefined'){
                if(msg.msg_intention === 'CREATE'){
                    // uploadURI not provided on a create message
                    return false;
                }
            }else{
                if(msg.msg_intention !== 'CREATE'){
                    // uploadURI provided on a non-create message
                    return false;
                }
            }

            return true;
        }
    }

    /**
     * Converts a message to JSON applying any additional manipulations, if required
     * @param message the message to convert to JSON
     */
    export const messageToJSON = (message: FileMessage) => JSON.stringify(message);

}
