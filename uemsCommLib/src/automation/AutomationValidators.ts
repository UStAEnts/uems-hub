import * as zod from 'zod';
import { UserValidators } from "../user/UserValidators";
import { BaseSchema } from "../BaseSchema";
import { ZodValidator } from "../MessageValidator";

// Too complex to represent with the module generation system :(
export namespace AutomationValidators {

	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import ZUser = UserValidators.ZUser;

	// Need an explicit versioning system here
	export const ACTIVE_AUTOMATION_VERSION = 0;


	export const ZAutomationVersionBase = zod.object({
		_version: zod.number()
			.describe("The version of this automation which determines which nodes are available and processing which is supported"),
		author: ZUser
			.describe("The user that created this automation"),
		created: zod.number()
			.describe("The unix-second timestamp at which this automation was created"),
		updated: zod.number()
			.describe("The unix-second timestamp at which this automation was last updated"),
		id: zod.string()
			.describe("The unique identifier for this automation"),
		description: zod.string()
			.describe("The description providing detail about the function of this automation"),
		title: zod.string()
			.describe("The name of this automation flow"),
	});
	export type AutomationVersionBase = zod.infer<typeof ZAutomationVersionBase>;

	// v0 - initial creation
	export const ZAutomationV0 = ZAutomationVersionBase.augment({
		_version: zod.literal(0)
			.describe("Version v0 of the automation schema"),
	}).extend({
		nodes: zod.array(
			zod.object({
				width: zod.number().or(zod.null()).optional(),
				height: zod.number().or(zod.null()).optional(),
				id: zod.string(),
				type: zod.string().optional(),
				position: zod.object({
					x: zod.number(),
					y: zod.number(),
				}),
				positionAbsolute: zod
					.object({
						x: zod.number(),
						y: zod.number(),
					})
					.optional(),
				data: zod.object({}),
				selected: zod.boolean().optional(),
				dragging: zod.boolean().optional(),
			}),
		).describe("The set of nodes which form the automation configuration"),
		edges: zod.array(
			zod.object({
				animated: zod.boolean().optional(),
				type: zod.string().optional(),
				source: zod.string(),
				target: zod.string(),
				sourceHandle: zod.string().or(zod.null()).optional(),
				targetHandle: zod.string().or(zod.null()).optional(),
				id: zod.string(),
				label: zod.string(),
			}),
		),
		viewport: zod.object({
			x: zod.number(),
			y: zod.number(),
			zoom: zod.number(),
		}),
		state: zod.record(zod.any()),
	});
	export type AutomationV0 = zod.infer<typeof ZAutomationV0>;
	export const ZAutomationV0Shallow = ZAutomationV0.augment({
		author: zod.string(),
	});
	export type AutomationV0Shallow = zod.infer<typeof ZAutomationV0Shallow>;

	export const ZAllAutomationVersions = ZAutomationV0;
	export const ZAllAutomationVersionsShallow = ZAutomationV0Shallow;
	export type AllAutomationVersions = zod.infer<typeof ZAllAutomationVersions>;
	export type AllAutomationVersionsShallow = zod.infer<typeof ZAllAutomationVersionsShallow>;

	export const ZAutomationRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string().or(zod.array(zod.string()))
			.optional()
			.describe("The identifier or set of identifiers to retrieve"),
		author: zod.string()
			.optional()
			.describe("The creator of the automations to fetch"),
		created: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The time (unix-second timestamp UTC) at which this comment was created"),
		updated: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The time (unix-second timestamp UTC) at which this comment was created"),
	});
	export type AutomationRead = zod.infer<typeof ZAutomationRead>;

	export const ZAutomationCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		nodes: zod.array(
			zod.object({
				width: zod.number().or(zod.null()).optional(),
				height: zod.number().or(zod.null()).optional(),
				id: zod.string(),
				type: zod.string().optional(),
				position: zod.object({
					x: zod.number(),
					y: zod.number(),
				}),
				positionAbsolute: zod
					.object({
						x: zod.number(),
						y: zod.number(),
					})
					.optional(),
				data: zod.object({}),
				selected: zod.boolean().optional(),
				dragging: zod.boolean().optional(),
			}),
		).describe("The set of nodes which form the automation configuration"),
		edges: zod.array(
			zod.object({
				animated: zod.boolean().optional(),
				type: zod.string().optional(),
				source: zod.string(),
				target: zod.string(),
				sourceHandle: zod.string().or(zod.null()).optional(),
				targetHandle: zod.string().or(zod.null()).optional(),
				id: zod.string(),
				label: zod.string(),
			}),
		),
		viewport: zod.object({
			x: zod.number(),
			y: zod.number(),
			zoom: zod.number(),
		}),
		state: zod.record(zod.any()),
		description: zod.string()
			.describe("The description providing detail about the function of this automation"),
		title: zod.string()
			.describe("The name of this automation flow"),
	});
	export type AutomationCreate = zod.infer<typeof ZAutomationCreate>;

	export const ZAutomationUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		description: zod.string()
			.describe("The description providing detail about the function of this automation"),
		title: zod.string()
			.describe("The name of this automation flow"),
		nodes: zod.array(
			zod.object({
				width: zod.number().or(zod.null()).optional(),
				height: zod.number().or(zod.null()).optional(),
				id: zod.string(),
				type: zod.string().optional(),
				position: zod.object({
					x: zod.number(),
					y: zod.number(),
				}),
				positionAbsolute: zod
					.object({
						x: zod.number(),
						y: zod.number(),
					})
					.optional(),
				data: zod.object({}),
				selected: zod.boolean().optional(),
				dragging: zod.boolean().optional(),
			}),
		).describe("The set of nodes which form the automation configuration"),
		edges: zod.array(
			zod.object({
				animated: zod.boolean().optional(),
				type: zod.string().optional(),
				source: zod.string(),
				target: zod.string(),
				sourceHandle: zod.string().or(zod.null()).optional(),
				targetHandle: zod.string().or(zod.null()).optional(),
				id: zod.string(),
				label: zod.string(),
			}),
		),
		viewport: zod.object({
			x: zod.number(),
			y: zod.number(),
			zoom: zod.number(),
		}),
		state: zod.record(zod.any()),
	});
	export type AutomationUpdate = zod.infer<typeof ZAutomationUpdate>;

	export const ZAutomationDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The ID of the entity to delete"),
	});
	export type AutomationDelete = zod.infer<typeof ZAutomationDelete>;

	export const ZAutomationReadResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(ZAllAutomationVersions)
			.describe("All matching automation entries"),
	});
	export type AutomationReadResponse = zod.infer<typeof ZAutomationReadResponse>;

	export const ZAutomationShallowReadResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(ZAllAutomationVersionsShallow)
			.describe("All matching automation entries"),
	});
	export type AutomationShallowReadResponse = zod.infer<typeof ZAutomationShallowReadResponse>;


	const ZAutomationModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
		result: zod.array(zod.string())
			.describe('The array of matched or manipulated responses'),
	});
	export type AutomationModifyResponse = zod.infer<typeof ZAutomationModifyResponse>;

	const ZAutomationResponse = ZAutomationReadResponse.or(ZAutomationShallowReadResponse).or(ZAutomationModifyResponse)
	export type AutomationResponse = zod.infer<typeof ZAutomationResponse>;

	export type AutomationMessage =
		AutomationRead
		| AutomationCreate
		| AutomationUpdate
		| AutomationDelete;

	export const ZAutomationRequest = ZAutomationRead
		.or(ZAutomationCreate)
		.or(ZAutomationUpdate)
		.or(ZAutomationDelete);
	export type AutomationRequest = zod.infer<typeof ZAutomationRequest>;

	export class AutomationMessageValidator extends ZodValidator {

		constructor() {
			super(ZAutomationRequest);
		}

	}

	export class AutomationResponseValidator extends ZodValidator {

		constructor() {
			super(ZAutomationResponse);
		}

	}


}