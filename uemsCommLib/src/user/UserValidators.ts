import * as zod from 'zod';
import { BaseSchema } from "../BaseSchema";
import { ZodValidator } from "../MessageValidator";

export namespace UserValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;

	export const ZUser = zod.object({
		id: zod.string()
			.describe("The ID of this user on the backend store, this is distinct from their username"),
		name: zod.string()
			.describe("The real name of the user"),
		username: zod.string()
			.describe("The username of this user"),
		profile: zod.string()
			.optional()
			.describe("The profile picture for this user, if not provided it means the user has not uploaded one"),
		email: zod.string()
			.email()
			.optional()
			.describe("The email address of this user, optionally provided depending on the query"),
	});
	export type UserRepresentation = zod.infer<typeof ZUser>;

	export const ZUserCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		id: zod.string(),
		name: zod.string(),
		username: zod.string(),
		profile: zod.string().optional(),
		email: zod.string(),
	});
	export type UserCreate = zod.infer<typeof ZUserCreate>;

	// Identical to create but with the assert keyword
	export const ZUserAssert = REQUEST_CORE_SCHEMA('ASSERT').extend({
		id: zod.string(),
		name: zod.string(),
		username: zod.string(),
		profile: zod.string().optional(),
		email: zod.string(),
	});
	export type UserAssert = zod.infer<typeof ZUserAssert>;

	export const ZUserRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string()
			.describe("The ID of the user to fetch")
			.optional()
			.or(
				zod.array(zod.string())
					.describe("The set of IDs which should be fetched in this request"),
			),
		name: zod.string()
			.optional()
			.describe("The name or substring of the users name"),
		username: zod.string()
			.optional()
			.describe("The name or substring of the users username"),
		email: zod.string()
			.email()
			.optional()
			.describe("The value or substring of the users email"),
		includeEmail: zod.boolean()
			.optional()
			.describe("Whether to include email addresses in the response of the query"),
	});
	export type UserRead = zod.infer<typeof ZUserRead>;

	export const ZUserDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The ID of the user to delete"),
	});
	export type UserDelete = zod.infer<typeof ZUserDelete>;

	export const ZUserUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string()
			.describe("The ID of the user to be updated"),
		name: zod.string()
			.optional()
			.describe("The new real name of the user"),
		username: zod.string()
			.optional()
			.describe("The new username of the user"),
		email: zod.string()
			.email()
			.optional()
			.describe("The new email address for the user. This will be used for all future communications"),
		profile: zod.string()
			.optional()
			.describe("The new profile URI"),
	});
	export type UserUpdate = zod.infer<typeof ZUserUpdate>;

	const ZUserModifyResponse = RESPONSE_CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'ASSERT']).extend({
		result: zod.array(zod.string())
			.describe("The array of matched or manipulated responses"),
	});
	export type UserModifyResponse = zod.infer<typeof ZUserModifyResponse>;

	const ZUserReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result: zod.array(ZUser)
			.describe("The array of matched users"),
	});
	export type UserReadResponse = zod.infer<typeof ZUserReadResponse>;

	const ZUserResponse = ZUserModifyResponse.or(ZUserReadResponse);
	export type UserResponse = zod.infer<typeof ZUserResponse>;

	export type UserMessage =
		UserCreate
		| UserUpdate
		| UserDelete
		| UserRead
		| UserAssert;

	export const ZUserRequest = ZUserCreate
		.or(ZUserUpdate)
		.or(ZUserRead)
		.or(ZUserDelete)
		.or(ZUserAssert);
	export type UserRequest = zod.infer<typeof ZUserRequest>;

	/**
	 * A validator supporting only incoming venue messages (read, create, delete and update). This uses the default
	 * validation scheme as the state schema does not have any additional validation rules
	 */
	export class UserMessageValidator extends ZodValidator {

		constructor() {
			super(ZUserRequest);
		}

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class UserResponseValidator extends ZodValidator {

		constructor() {
			super(ZUserResponse);
		}

	}

}
