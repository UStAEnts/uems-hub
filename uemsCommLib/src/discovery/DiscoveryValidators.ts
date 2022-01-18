import {BaseSchema} from "../BaseSchema";
import {MessageValidator} from "../messaging/MessageValidator";

// Source: https://stackoverflow.com/a/47643102
type Sub<
    O extends string,
    D extends string
    > = {[K in O]: (Record<D, never> & Record<string, K>)[K]}[O]

export namespace DiscoveryValidators{

    import CORE_SCHEMA = BaseSchema.CORE_SCHEMA;
    import CORE_REQUIRED = BaseSchema.CORE_REQUIRED;
    import CoreSchema = BaseSchema.CoreSchema;
    import CoreSchemaWithStatus = BaseSchema.CoreSchemaWithStatus;
    
    export const DISCOVERY_REQUEST = {
        "type": "object",
        "additionalProperties": true,
        "required": [
            "assetType",
            "assetID",
            ...CORE_REQUIRED,
        ],
        "properties": {
            "assetType": {
                "type": "string",
                "enum": [
                    "equipment",
                    "event",
                    "signup",
                    "event.comment",
                    "file",
                    "file.binding",
                    "ent",
                    "topic",
                    "state",
                    "user",
                    "venue",
                ],
                "description": "The asset category for this discovery message",
            },
            "assetID": {
                "type": "string",
                "description": "The ID of the asset being requested for deletion",
            },
            "localAssetOnly": {
                "type": "boolean",
                "description": "If the query should only reference data created by the user identified by userID. If " +
                    "anonymous it will do nothing"
            },
            ...CORE_SCHEMA('READ'),
        },
        "not": {
            "required": [
                "execute",
            ],
        },
    };

    export const DELETE_REQUEST = {
        ...DISCOVERY_REQUEST,
        "required": [
            ...DISCOVERY_REQUEST.required,
            "execute",
        ],
        "properties": {
            ...DISCOVERY_REQUEST.properties,
            "execute": {
                "type": "boolean",
                "const": true,
                "description": "Marks that this is a delete request "
            }
        },
        // Remove the not condition
        "not": undefined,
    };

    export type DiscoveryRequest = CoreSchema<'READ'> & {
        assetType: 'equipment' | 'event' | 'signup' | 'event.comment' | 'file' | 'file.binding'
        | 'ent' | 'topic' | 'state' | 'user' | 'venue',
        assetID: string,
        localAssetOnly?: boolean,
    } & Record<Sub<string, 'execute'>, any>;

    export type DeleteRequest = CoreSchema<'READ'> & {
        assetType: 'equipment' | 'event' | 'signup' | 'event.comment' | 'file' | 'file.binding'
            | 'ent' | 'topic' | 'state' | 'user' | 'venue',
        assetID: string,
        execute: true,
        localAssetOnly?: boolean,
    } & Record<string, any>;

    export const DISCOVERY_REPLY = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "restrict",
            "modify",
            ...CORE_REQUIRED,
        ],
        "properties": {
            ...CORE_SCHEMA('READ', true),
            "restrict": {
                "type": "number",
                "description": "The number of records that restrict the deletion of the provided asset",
            },
            "modify": {
                "type": "number",
                "description": "The number of records that will be modified in the process of deleting this record",
            },
        },
    }

    export type DiscoveryReply = CoreSchemaWithStatus<'READ'> & {
        restrict: number,
        modify: number,
    }

    export const DELETE_REPLY = {
        "type": "object",
        "additionalProperties": false,
        "required": [
            "restrict",
            "modified",
            "successful",
            ...CORE_REQUIRED,
        ],
        "properties": {
            ...CORE_SCHEMA('DELETE', true),
            "restrict": {
                "type": "number",
                "description": "The number of records that restricted the deletion of the provided asset",
            },
            "modified": {
                "type": "number",
                "description": "The number of records that were modified in the process of deleting this record",
            },
            "successful": {
                "type": "boolean",
                "description": "If the delete instruction was successful",
            },
        },
    }

    export type DeleteReply = CoreSchemaWithStatus<'DELETE'> & {
        restrict: number,
        modified: number,
        successful: boolean,
    }

    export type DiscoveryDeleteMessage = DiscoveryRequest | DeleteRequest;
    export type DiscoveryDeleteResponse = DiscoveryReply | DeleteReply;

    const DISCOVERY_DELETE_MESSAGE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            DISCOVERY_REQUEST,
            DELETE_REQUEST,
        ],
    };

    const DISCOVERY_DELETE_RESPONSE_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "anyOf": [
            DISCOVERY_REPLY,
            DELETE_REPLY,
        ],
    };

    export class DiscoveryMessageValidator extends MessageValidator{

        constructor() {
            super(DISCOVERY_DELETE_MESSAGE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async setup(){
            return new DiscoveryMessageValidator();
        }

    }

    export class DiscoveryResponseValidator extends MessageValidator{

        constructor() {
            super(DISCOVERY_DELETE_RESPONSE_SCHEMA);
        }

        /**
         * Sets up a new message validator
         * @deprecated this is not an async function so you can directly call the constructor. Added for compatibility
         */
        static async(){
            return new DiscoveryResponseValidator();
        }

    }

}