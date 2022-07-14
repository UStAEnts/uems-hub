// Generated by gen.mjs @ 2022-07-06T18:38:25.064Z - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../MessageValidator';

export namespace StateValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;

	export const ZState = zod.object({
		id: zod.string()
			.describe("The unique ID of this state"),
		name: zod.string()
			.describe("The name of this state"),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.describe("The color of this state"),
		icon: zod.string()
			.describe("The icon of this state in a format that can be rendered by the frontend"),
	});
	export type StateRepresentation = zod.infer<typeof ZState>;

	export const ZStateRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string().or(zod.array(zod.string()))
			.optional()
			.describe("The unique ID of this state"),
		name: zod.string()
			.optional()
			.describe("The name of this state"),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.optional()
			.describe("The color of this state"),
		icon: zod.string()
			.optional()
			.describe("The icon of this state in a format that can be rendered by the frontend"),
	});
	export type StateRead = zod.infer<typeof ZStateRead>;

	export const ZStateCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		name: zod.string()
			.describe("The name of this state"),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.describe("The color of this state"),
		icon: zod.string()
			.describe("The icon of this state in a format that can be rendered by the frontend"),
	});
	export type StateCreate = zod.infer<typeof ZStateCreate>;

	export const ZStateUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string()
			.describe("The unique ID of this state"),
		name: zod.string()
			.optional()
			.describe("The name of this state"),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.optional()
			.describe("The color of this state"),
		icon: zod.string()
			.optional()
			.describe("The icon of this state in a format that can be rendered by the frontend"),
	});
	export type StateUpdate = zod.infer<typeof ZStateUpdate>;

	export const ZStateDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The unique identifier of this entity to remove"),
	});
	export type StateDelete = zod.infer<typeof ZStateDelete>;
	const ZStateReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result: zod.array(ZState)
			.describe('The array of matched entries'),
	});
	export type StateReadResponse = zod.infer<typeof ZStateReadResponse>;


	const ZStateModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
		result: zod.array(zod.string())
			.describe('The array of matched or manipulated responses'),
	});
	export type StateModifyResponse = zod.infer<typeof ZStateModifyResponse>;

	const ZStateResponse = ZStateReadResponse.or(ZStateModifyResponse)
	export type StateResponse = zod.infer<typeof ZStateResponse>;

	export type StateMessage =
		StateRead
		| StateCreate
		| StateUpdate
		| StateDelete;

	export const ZStateRequest = ZStateRead
		.or(ZStateCreate)
		.or(ZStateUpdate)
		.or(ZStateDelete);
	export type StateRequest = zod.infer<typeof ZStateRequest>;

	export class StateMessageValidator extends ZodValidator {

		constructor() {
			super(ZStateRequest);
		}

	}

	export class StateResponseValidator extends ZodValidator {

		constructor() {
			super(ZStateResponse);
		}

	}


}