// Generated by gen.mjs @ 2022-07-06T16:32:25.317Z - avoid editing this file by hand!
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../MessageValidator';
import { UserValidators } from "../user/UserValidators";
import { FormValidator } from "./FormComponents";

export namespace FormValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	import ZUser = UserValidators.ZUser;

	export const ZForm = zod.object({
		id: zod.string()
			.describe("The unique ID of this form"),
		name: zod.string()
			.describe("The name of this form"),
		description: zod.string()
			.optional()
			.describe("The summary description of this form"),
		created: zod.number()
			.describe("The unix-second utc timestamp at which this form was created"),
		author: ZUser
			.describe("The user who created or currently manages this asset"),
		configuration: FormValidator
			.describe("The actual form configuration of this entry"),
	});
	export type FormRepresentation = zod.infer<typeof ZForm>;
	export const ZFormShallow = zod.object({
		id: zod.string()
			.describe("The unique ID of this form"),
		name: zod.string()
			.describe("The name of this form"),
		description: zod.string()
			.optional()
			.describe("The summary description of this form"),
		created: zod.number()
			.describe("The unix-second utc timestamp at which this form was created"),
		author: zod.string()
			.describe("The user who created or currently manages this asset"),
		configuration: FormValidator
			.describe("The actual form configuration of this entry"),
	});
	export type FormShallowRepresentation = zod.infer<typeof ZFormShallow>;
	export const ZFormRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string().or(zod.array(zod.string()))
			.optional()
			.describe("The unique ID of this form"),
		name: zod.string()
			.optional()
			.describe("The name of this form"),
		description: zod.string()
			.optional()
			.describe("The summary description of this form"),
		created: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The unix-second utc timestamp at which this form was created"),
		author: zod.string()
			.optional()
			.describe("The user who created or currently manages this asset"),
		configuration: FormValidator
			.optional()
			.describe("The actual form configuration of this entry"),
	});
	export type FormRead = zod.infer<typeof ZFormRead>;

	export const ZFormCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		name: zod.string()
			.describe("The name of this form"),
		description: zod.string()
			.optional()
			.describe("The summary description of this form"),
		created: zod.number()
			.describe("The unix-second utc timestamp at which this form was created"),
		author: zod.string()
			.describe("The user who created or currently manages this asset"),
		configuration: FormValidator
			.describe("The actual form configuration of this entry"),
	});
	export type FormCreate = zod.infer<typeof ZFormCreate>;

	export const ZFormUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string()
			.describe("The unique ID of this form"),
		name: zod.string()
			.optional()
			.describe("The name of this form"),
		description: zod.string()
			.optional()
			.describe("The summary description of this form"),
		created: zod.number()
			.optional()
			.describe("The unix-second utc timestamp at which this form was created"),
		author: zod.string()
			.optional()
			.describe("The user who created or currently manages this asset"),
		configuration: FormValidator
			.optional()
			.describe("The actual form configuration of this entry"),
	});
	export type FormUpdate = zod.infer<typeof ZFormUpdate>;

	export const ZFormDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The unique identifier of this entity to remove"),
	});
	export type FormDelete = zod.infer<typeof ZFormDelete>;
	const ZFormReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result: zod.array(ZForm)
			.describe('The array of matched entries'),
	});
	export type FormReadResponse = zod.infer<typeof ZFormReadResponse>;

	const ZFormShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result: zod.array(ZFormShallow)
			.describe('The shallow array of matched entries'),
	});
	export type FormShallowReadResponse = zod.infer<typeof ZFormShallowReadResponse>;

	const ZFormModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
		result: zod.array(zod.string())
			.describe('The array of matched or manipulated responses'),
	});
	export type FormModifyResponse = zod.infer<typeof ZFormModifyResponse>;

	const ZFormResponse = ZFormReadResponse.or(ZFormShallowReadResponse).or(ZFormModifyResponse)
	export type FormResponse = zod.infer<typeof ZFormResponse>;

	export type FormMessage =
		FormRead
		| FormCreate
		| FormUpdate
		| FormDelete;

	export const ZFormRequest = ZFormRead
		.or(ZFormCreate)
		.or(ZFormUpdate)
		.or(ZFormDelete);
	export type FormRequest = zod.infer<typeof ZFormRequest>;

	export class FormMessageValidator extends ZodValidator {

		constructor() {
			super(ZFormRequest);
		}

	}

	export class FormResponseValidator extends ZodValidator {

		constructor() {
			super(ZFormResponse);
		}

	}


}