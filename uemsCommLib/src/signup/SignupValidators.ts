// Generated by gen.mjs @ 2022-07-06T14:35:54.369Z - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../messaging/MessageValidator';
import { UserValidators } from "../user/UserValidators";
import { EventValidators } from "../event/EventValidators";

export namespace SignupValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	import ZUser = UserValidators.ZUser;
	import ZEvent = EventValidators.ZEvent;

	export const ZSignup = zod.object({
		id: zod.string()
			.describe("The unique identifier for this signup"),
		user: ZUser
			.describe("The user who is being signed up to the event"),
		event: ZEvent
			.describe("The event to which this user is signing up"),
		role: zod.string()
			.describe("The role this user is signing up for"),
		date: zod.number()
			.describe("The unix-second UTC timestamp at which this signup was made"),
	});
	export type SignupRepresentation = zod.infer<typeof ZSignup>;
	export const ZSignupShallow = zod.object({		id: zod.string()
			.describe("The unique identifier for this signup"),
		user: zod.string()
			.describe("The user who is being signed up to the event"),
		event: zod.string()
			.describe("The event to which this user is signing up"),
		role: zod.string()
			.describe("The role this user is signing up for"),
		date: zod.number()
			.describe("The unix-second UTC timestamp at which this signup was made"),
	});
	export type SignupShallowRepresentation = zod.infer<typeof ZSignupShallow>;
	export const ZSignupRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string().or(zod.array(zod.string()))
			.optional()
			.describe("The unique identifier for this signup"),
		user: zod.string()
			.optional()
			.describe("The user who is being signed up to the event"),
		event: zod.string()
			.optional()
			.describe("The event to which this user is signing up"),
		role: zod.string()
			.optional()
			.describe("The role this user is signing up for"),
		date: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The unix-second UTC timestamp at which this signup was made"),
	});
	export type SignupRead = zod.infer<typeof ZSignupRead>;

	export const ZSignupCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		user: zod.string()
			.describe("The user who is being signed up to the event"),
		event: zod.string()
			.describe("The event to which this user is signing up"),
		role: zod.string()
			.describe("The role this user is signing up for"),
		date: zod.number()
			.describe("The unix-second UTC timestamp at which this signup was made"),
	});
	export type SignupCreate = zod.infer<typeof ZSignupCreate>;

	export const ZSignupUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string()
			.describe("The unique identifier for this signup"),
		user: zod.string()
			.optional()
			.describe("The user who is being signed up to the event"),
		event: zod.string()
			.optional()
			.describe("The event to which this user is signing up"),
		role: zod.string()
			.optional()
			.describe("The role this user is signing up for"),
		date: zod.number()
			.optional()
			.describe("The unix-second UTC timestamp at which this signup was made"),
	});
	export type SignupUpdate = zod.infer<typeof ZSignupUpdate>;

	export const ZSignupDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The unique identifier of this entity to remove"),
	});
	export type SignupDelete = zod.infer<typeof ZSignupDelete>;
	const ZSignupReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result:zod.array(ZSignup)
			.describe('The array of matched entries'),
	});
	export type SignupReadResponse = zod.infer<typeof ZSignupReadResponse>;

	const ZSignupShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result:zod.array(ZSignupShallow)
			.describe('The shallow array of matched entries'),
	});

	const ZSignupModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
		result: zod.array(zod.string())
			.describe('The array of matched or manipulated responses'),
	});
	export type SignupModifyResponse = zod.infer<typeof ZSignupModifyResponse>;

	const ZSignupResponse = ZSignupReadResponse.or(ZSignupShallowReadResponse).or(ZSignupModifyResponse)
	export type SignupResponse = zod.infer<typeof ZSignupResponse>;

	export type SignupMessage =
		SignupRead
		| SignupCreate
		| SignupUpdate
		| SignupDelete;

	export const ZSignupRequest = ZSignupRead
		.or(ZSignupCreate)
		.or(ZSignupUpdate)
		.or(ZSignupDelete);
	export type SignupRequest = zod.infer<typeof ZSignupRequest>;

	export class SignupMessageValidator extends ZodValidator {

		constructor() {
			super(ZSignupRequest);
		}

	}

	export class SignupResponseValidator extends ZodValidator {

		constructor() {
			super(ZSignupResponse);
		}

	}


}