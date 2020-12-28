export namespace BaseSchema {

    /**
     * Intentions that a message can be sent with to either query, create, update or read a value
     * @private
     */
    export type Intentions = "READ" | "CREATE" | "UPDATE" | "DELETE";

    /**
     * Function which generates score schema elements with msg_id, msg_intention (from parameters) and status. If with
     * status is provided, the status value is defined as just a number, without it, the schema requires the status to
     * be 0 as it is unset, as in the description
     * @param intention the intention, or intentions, allowed by this schema
     * @param withStatus if the status is allowed to be defined or must be 0
     * @private
     */
    export const CORE_SCHEMA = (intention: Intentions | Intentions[], withStatus: boolean = false) => ({
        "msg_id": {
            "type": "number",
            "description": "An ID for this message which is unique within the system"
        },
        "msg_intention": {
            "type": "string",
            "enum": Array.isArray(intention) ? intention : [intention],
            "description": "The purpose / intention of the message"
        },
        "status": {
            "type": "number",
            "description": "The status of the message, uses HTTP status codes, 0 value if unset",
            ...(withStatus
                    ? {}
                    : {
                        "const": 0,
                    }
            )
        }
    })

    /**
     * The set of required values from the {@link CORE_SCHEMA}.
     * @private
     */
    export const CORE_REQUIRED = ["msg_id", "msg_intention", "status"];

    /**
     * Defines the Typescript type from {@link CORE_SCHEMA} with a withStatus value of false. For withStatus being true
     * see {@link CoreSchemaWithStatus}.
     * @private
     */
    export type CoreSchema<T extends Intentions> = {
        msg_id: number,
        msg_intention: T,
        status: 0,
    }

    /**
     * An extension to {@link CoreSchema} re-defining status as a number allowing it to be defined as any value.
     * @private
     */
    export type CoreSchemaWithStatus<T extends Intentions> = Omit<CoreSchema<T>, 'status'> & {
        status: number,
    }

}
