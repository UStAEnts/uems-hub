import * as zod from 'zod';

export namespace BaseSchema {

	// export type Intentions = "READ" | "CREATE" | "UPDATE" | "DELETE" | "ASSERT";

	export const ZIntention = zod.enum(['READ', 'CREATE', 'UPDATE', 'DELETE', 'ASSERT']);
	/**
	 * Intentions that a message can be sent with to either query, create, update or read a value
	 * @private
	 */
	export type Intention = zod.infer<typeof ZIntention>;

	/**
	 * Function which generates score schema elements with msg_id, msg_intention (from parameters) and status. This
	 * version requires status to be the literal 0 as it is unset in the requests
	 * @param intention the intention, or intentions, allowed by this schema
	 * @private
	 */
	export function REQUEST_CORE_SCHEMA<T extends Intention>(intention: T | [T, ...T[]]) {
		return zod.object({
			msg_id: zod.number()
				.describe("An ID for this message which is unique within the system"),
			msg_intention: (Array.isArray(intention) ? zod.enum(intention) : zod.literal(intention))
				.describe("The purpose / intention of the message"),
			status: zod.literal(0)
				.describe("The status code of this request, as it has not yet been answered it should be 0"),
			userID: zod.string().or(zod.literal('anonymous'))
				.describe("The user ID of the user currently making this request or anonymous if there is no user"),
			requestID: zod.string()
				.describe("The request which originated this request to be used for correlational debugging")
				.optional(),
			userScoped: zod.boolean()
				.describe("If this request should be limited to just assets owned by the user specified in userID. If this is specified with userID='anonymous' then a request should fail")
				.default(false)
				.optional(),
		});
	}

	/**
	 * Function which generates score schema elements with msg_id, msg_intention (from parameters) and status. This
	 * version requires status to be a number, as provided in the response
	 * @param intention the intention, or intentions, allowed by this schema
	 * @private
	 */
	export function RESPONSE_CORE_SCHEMA<T extends Intention>(intention: T | [T, ...T[]]) {
		return zod.object({
			msg_id: zod.number()
				.describe("An ID for this message which is unique within the system"),
			msg_intention: Array.isArray(intention) ? zod.enum(intention) : zod.literal(intention)
				.describe("The purpose / intention of the message"),
			status: zod.number()
				.describe("The status of the message, uses HTTP status codes"),
			userID: zod.string().or(zod.literal('anonymous'))
				.describe("The user ID of the user currently making this request or anonymous if there is no user"),
			requestID: zod.string()
				.describe("The request which originated this request to be used for correlational debugging")
				.optional(),
		});
	}

	export const CORE_SCHEMA = (intention: Intention | Intention[], withStatus: boolean = false) => ({
		"msg_id": {
			"type": "number",
			"description": "An ID for this message which is unique within the system",
		},
		"msg_intention": {
			"type": "string",
			"enum": Array.isArray(intention) ? intention : [intention],
			"description": "The purpose / intention of the message",
		},
		"status": {
			"type": "number",
			"description": "The status of the message, uses HTTP status codes, 0 value if unset",
			...(withStatus
					? {}
					: {
						"const": 0,
					}
			),
		},
		"userID": {
			"type": "string",
			"description": "The user ID of the user currently making this request or anonymous if there is no user",
		},
		"requestID": {
			"type": "string",
			"description": "The request which originated this request to be used for correlational debugging",
		},
	})

	/**
	 * The set of required values from the {@link CORE_SCHEMA}.
	 * @private
	 */
	export const CORE_REQUIRED = ["msg_id", "msg_intention", "status", "userID"];

	/**
	 * Defines the Typescript type from {@link CORE_SCHEMA} with a withStatus value of false. For withStatus being true
	 * see {@link CoreSchemaWithStatus}.
	 * @private
	 */
	export type CoreSchema<T extends Intention> = {
		msg_id: number,
		msg_intention: T,
		status: 0,
		userID: 'anonymous' | string,
		requestID?: string,
	}

	/**
	 * An extension to {@link CoreSchema} re-defining status as a number allowing it to be defined as any value.
	 * @private
	 */
	export type CoreSchemaWithStatus<T extends Intention> = Omit<CoreSchema<T>, 'status'> & {
		status: number,
	}

}
