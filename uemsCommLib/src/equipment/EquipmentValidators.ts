// Generated by gen.mjs @ 2022-07-05T17:09:14.200Z - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../messaging/MessageValidator';
import { VenueValidators } from "../venues/VenueValidators";
import { UserValidators } from "../user/UserValidators";

export namespace EquipmentValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	import ZVenue = VenueValidators.ZVenue;
	import ZUser = UserValidators.ZUser;

	export const ZEquipment = zod.object({
		id: zod.string()
			.describe("The unique ID of this piece of equipment"),
		assetID: zod.string()
			.optional()
			.describe("The asset ID tag assigned to this piece of equipment is one has been allocated"),
		name: zod.string()
			.describe("The human readable name of this equipment"),
		manufacturer: zod.string()
			.describe("The original manufacturer of this equipment"),
		model: zod.string()
			.describe("The specific model of this equipment"),
		miscIdentifier: zod.string()
			.optional()
			.describe("An additional identifier in the event the manufacturer and model are not sufficient"),
		amount: zod.number()
			.describe("The amount of this piece of equipment currently available"),
		location: ZVenue
			.describe("The venue in which this equipment is stored"),
		locationSpecifier: zod.string()
			.optional()
			.describe("Additional information about where in the venue this piece of equipment has been stored"),
		manager: ZUser
			.describe("The user assigned to manage this piece of equipment and should be the first call when needing information about it"),
		date: zod.number()
			.describe("The date the equipment was purchased"),
		category: zod.string()
			.describe("The textual category of this equipment"),
	});
	export type EquipmentRepresentation = zod.infer<typeof ZEquipment>;
	export const ZEquipmentShallow = zod.object({		id: zod.string()
			.describe("The unique ID of this piece of equipment"),
		assetID: zod.string()
			.optional()
			.describe("The asset ID tag assigned to this piece of equipment is one has been allocated"),
		name: zod.string()
			.describe("The human readable name of this equipment"),
		manufacturer: zod.string()
			.describe("The original manufacturer of this equipment"),
		model: zod.string()
			.describe("The specific model of this equipment"),
		miscIdentifier: zod.string()
			.optional()
			.describe("An additional identifier in the event the manufacturer and model are not sufficient"),
		amount: zod.number()
			.describe("The amount of this piece of equipment currently available"),
		location: zod.string()
			.describe("The venue in which this equipment is stored"),
		locationSpecifier: zod.string()
			.optional()
			.describe("Additional information about where in the venue this piece of equipment has been stored"),
		manager: zod.string()
			.describe("The user assigned to manage this piece of equipment and should be the first call when needing information about it"),
		date: zod.number()
			.describe("The date the equipment was purchased"),
		category: zod.string()
			.describe("The textual category of this equipment"),
	});
	export type EquipmentShallowRepresentation = zod.infer<typeof ZEquipmentShallow>;
	export const ZEquipmentRead = REQUEST_CORE_SCHEMA('READ').extend({
		id: zod.string().or(zod.array(zod.string()))
			.optional()
			.describe("The unique ID of this piece of equipment"),
		assetID: zod.string()
			.optional()
			.describe("The asset ID tag assigned to this piece of equipment is one has been allocated"),
		name: zod.string()
			.optional()
			.describe("The human readable name of this equipment"),
		manufacturer: zod.string()
			.optional()
			.describe("The original manufacturer of this equipment"),
		model: zod.string()
			.optional()
			.describe("The specific model of this equipment"),
		miscIdentifier: zod.string()
			.optional()
			.describe("An additional identifier in the event the manufacturer and model are not sufficient"),
		amount: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The amount of this piece of equipment currently available"),
		location: zod.string()
			.optional()
			.describe("The venue in which this equipment is stored"),
		locationSpecifier: zod.string()
			.optional()
			.describe("Additional information about where in the venue this piece of equipment has been stored"),
		manager: zod.string()
			.optional()
			.describe("The user assigned to manage this piece of equipment and should be the first call when needing information about it"),
		date: zod.object({
			greater: zod.number().optional(),
			less: zod.number().optional(),
		}).or(zod.number())
			.optional()
			.describe("The date the equipment was purchased"),
		category: zod.string()
			.optional()
			.describe("The textual category of this equipment"),
	});
	export type EquipmentRead = zod.infer<typeof ZEquipmentRead>;

	export const ZEquipmentCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
		assetID: zod.string()
			.optional()
			.describe("The asset ID tag assigned to this piece of equipment is one has been allocated"),
		name: zod.string()
			.describe("The human readable name of this equipment"),
		manufacturer: zod.string()
			.describe("The original manufacturer of this equipment"),
		model: zod.string()
			.describe("The specific model of this equipment"),
		miscIdentifier: zod.string()
			.optional()
			.describe("An additional identifier in the event the manufacturer and model are not sufficient"),
		amount: zod.number()
			.describe("The amount of this piece of equipment currently available"),
		location: zod.string()
			.describe("The venue in which this equipment is stored"),
		locationSpecifier: zod.string()
			.optional()
			.describe("Additional information about where in the venue this piece of equipment has been stored"),
		manager: zod.string()
			.describe("The user assigned to manage this piece of equipment and should be the first call when needing information about it"),
		date: zod.number()
			.describe("The date the equipment was purchased"),
		category: zod.string()
			.describe("The textual category of this equipment"),
	});
	export type EquipmentCreate = zod.infer<typeof ZEquipmentCreate>;

	export const ZEquipmentUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
		id: zod.string()
			.describe("The unique ID of this piece of equipment"),
		assetID: zod.string()
			.optional()
			.describe("The asset ID tag assigned to this piece of equipment is one has been allocated"),
		name: zod.string()
			.optional()
			.describe("The human readable name of this equipment"),
		manufacturer: zod.string()
			.optional()
			.describe("The original manufacturer of this equipment"),
		model: zod.string()
			.optional()
			.describe("The specific model of this equipment"),
		miscIdentifier: zod.string()
			.optional()
			.describe("An additional identifier in the event the manufacturer and model are not sufficient"),
		amount: zod.number()
			.optional()
			.describe("The amount of this piece of equipment currently available"),
		location: zod.string()
			.optional()
			.describe("The venue in which this equipment is stored"),
		locationSpecifier: zod.string()
			.optional()
			.describe("Additional information about where in the venue this piece of equipment has been stored"),
		manager: zod.string()
			.optional()
			.describe("The user assigned to manage this piece of equipment and should be the first call when needing information about it"),
		date: zod.number()
			.optional()
			.describe("The date the equipment was purchased"),
		category: zod.string()
			.optional()
			.describe("The textual category of this equipment"),
	});
	export type EquipmentUpdate = zod.infer<typeof ZEquipmentUpdate>;

	export const ZEquipmentDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
		id: zod.string()
			.describe("The unique identifier of this entity to remove"),
	});
	export type EquipmentDelete = zod.infer<typeof ZEquipmentDelete>;
	const ZEquipmentReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result:zod.array(ZEquipment)
			.describe('The array of matched entries'),
	});
	export type EquipmentReadResponse = zod.infer<typeof ZEquipmentReadResponse>;

	const ZEquipmentShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
		result:zod.array(ZEquipmentShallow)
			.describe('The shallow array of matched entries'),
	});

	const ZEquipmentModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
		result: zod.array(zod.string())
			.describe('The array of matched or manipulated responses'),
	});
	export type EquipmentModifyResponse = zod.infer<typeof ZEquipmentModifyResponse>;

	const ZEquipmentResponse = ZEquipmentReadResponse.or(ZEquipmentShallowReadResponse).or(ZEquipmentModifyResponse)
	export type EquipmentResponse = zod.infer<typeof ZEquipmentResponse>;

	export type EquipmentMessage =
		EquipmentRead
		| EquipmentCreate
		| EquipmentUpdate
		| EquipmentDelete;

	export const ZEquipmentRequest = ZEquipmentRead
		.or(ZEquipmentCreate)
		.or(ZEquipmentUpdate)
		.or(ZEquipmentDelete);
	export type EquipmentRequest = zod.infer<typeof ZEquipmentRequest>;

	export class EquipmentMessageValidator extends ZodValidator {

		constructor() {
			super(ZEquipmentRequest);
		}

	}

	export class EquipmentResponseValidator extends ZodValidator {

		constructor() {
			super(ZEquipmentResponse);
		}

	}


}