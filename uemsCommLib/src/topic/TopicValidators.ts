import * as zod from 'zod';
import { BaseSchema } from "../BaseSchema";
import { ZodValidator } from "../MessageValidator";

export namespace TopicValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;

	export const ZTopic = zod.object({
		id: zod.string(),
		name: zod.string(),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/),
		icon: zod.string(),
		description: zod.string(),
	});
	export type TopicRepresentation = zod.infer<typeof ZTopic>;

	export const ZTopicCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		name: zod.string(),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/),
		icon: zod.string(),
		description: zod.string()
			.optional(),
	});
	export type TopicCreate = zod.infer<typeof ZTopicCreate>;

	export const ZTopicRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string()
			.describe("The ID of the topic to fetch")
			.or(
				zod.array(zod.string())
					.describe("The set of IDs which should be fetched in this request"),
			)
			.optional(),
		name: zod.string()
			.optional(),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.optional(),
		icon: zod.string()
			.optional(),
		description: zod.string()
			.optional(),
	});
	export type TopicRead = zod.infer<typeof ZTopicRead>;

	export const ZTopicDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string(),
	})
	export type TopicDelete = zod.infer<typeof ZTopicDelete>;

	export const ZTopicUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string(),
		name: zod.string()
			.optional(),
		color: zod.string()
			.regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
			.optional(),
		icon: zod.string()
			.optional(),
		description: zod.string()
			.optional(),
	});
	export type TopicUpdate = zod.infer<typeof ZTopicUpdate>;

	const ZTopicModifyResponse = RESPONSE_CORE_SCHEMA(['UPDATE', 'CREATE', 'DELETE', 'ASSERT']).extend({
		result: zod.array(zod.string())
			.describe("The array of matched or manipulated responses"),
	});
	export type TopicModifyResponse = zod.infer<typeof ZTopicModifyResponse>;

	const ZTopicReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result: zod.array(ZTopic)
			.describe("The array of matched Topics"),
	});
	export type TopicReadResponse = zod.infer<typeof ZTopicReadResponse>;

	const ZTopicResponse = ZTopicModifyResponse.or(ZTopicReadResponse);
	export type TopicResponse = zod.infer<typeof ZTopicResponse>;

	export const ZTopicRequest = ZTopicCreate
		.or(ZTopicUpdate)
		.or(ZTopicRead)
		.or(ZTopicDelete);
	export type TopicMessage = zod.infer<typeof ZTopicRequest>;

	/**
	 * A validator supporting only incoming Topic messages (read, create, delete and update). This uses the default
	 * validation scheme as the state schema does not have any additional validation rules
	 */
	export class TopicMessageValidator extends ZodValidator {

		constructor() {
			super(ZTopicRequest);
		}

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class TopicResponseValidator extends ZodValidator {

		constructor() {
			super(ZTopicResponse);
		}

	}

}
