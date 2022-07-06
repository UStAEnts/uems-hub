// Generated by gen.mjs @ 2022-07-06T14:09:56.218Z - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../MessageValidator';
import { UserValidators } from "../user/UserValidators";

export namespace VenueValidators {

    import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
    import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
    import ZUser = UserValidators.ZUser;

    export const ZVenue = zod.object({
        id: zod.string()
            .describe("The unique ID of this venue"),
        name: zod.string()
            .describe("The human readable name of the venue"),
        capacity: zod.number()
            .describe("The amount of people that can fit in the venue during a traditional use case"),
        color: zod.string()
            .regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
            .optional()
            .describe("The colour to represent this venue if required"),
        user: ZUser
            .describe("The user who manages this venue"),
    });
    export type VenueRepresentation = zod.infer<typeof ZVenue>;
    export const ZVenueShallow = zod.object({		id: zod.string()
            .describe("The unique ID of this venue"),
        name: zod.string()
            .describe("The human readable name of the venue"),
        capacity: zod.number()
            .describe("The amount of people that can fit in the venue during a traditional use case"),
        color: zod.string()
            .regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
            .optional()
            .describe("The colour to represent this venue if required"),
        user: zod.string()
            .describe("The user who manages this venue"),
    });
    export type VenueShallowRepresentation = zod.infer<typeof ZVenueShallow>;
    export const ZVenueRead = REQUEST_CORE_SCHEMA('READ').extend({
        id: zod.string().or(zod.array(zod.string()))
            .optional()
            .describe("The unique ID of this venue"),
        name: zod.string()
            .optional()
            .describe("The human readable name of the venue"),
        capacity: zod.object({
            greater: zod.number().optional(),
            less: zod.number().optional(),
        }).or(zod.number())
            .optional()
            .describe("The amount of people that can fit in the venue during a traditional use case"),
        color: zod.string()
            .regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
            .optional()
            .describe("The colour to represent this venue if required"),
        user: zod.string()
            .optional()
            .describe("The user who manages this venue"),
    });
    export type VenueRead = zod.infer<typeof ZVenueRead>;

    export const ZVenueCreate = REQUEST_CORE_SCHEMA('CREATE').extend({
        name: zod.string()
            .describe("The human readable name of the venue"),
        capacity: zod.number()
            .describe("The amount of people that can fit in the venue during a traditional use case"),
        color: zod.string()
            .regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
            .optional()
            .describe("The colour to represent this venue if required"),
        user: zod.string()
            .describe("The user who manages this venue"),
    });
    export type VenueCreate = zod.infer<typeof ZVenueCreate>;

    export const ZVenueUpdate = REQUEST_CORE_SCHEMA('UPDATE').extend({
        id: zod.string()
            .describe("The unique ID of this venue"),
        name: zod.string()
            .optional()
            .describe("The human readable name of the venue"),
        capacity: zod.number()
            .optional()
            .describe("The amount of people that can fit in the venue during a traditional use case"),
        color: zod.string()
            .regex(/^#?([\dA-Fa-f]{3}([\dA-Fa-f]{3})?)$/)
            .optional()
            .describe("The colour to represent this venue if required"),
        user: zod.string()
            .optional()
            .describe("The user who manages this venue"),
    });
    export type VenueUpdate = zod.infer<typeof ZVenueUpdate>;

    export const ZVenueDelete = REQUEST_CORE_SCHEMA('DELETE').extend({
        id: zod.string()
            .describe("The unique identifier of this entity to remove"),
    });
    export type VenueDelete = zod.infer<typeof ZVenueDelete>;
    const ZVenueReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
        result:zod.array(ZVenue)
            .describe('The array of matched entries'),
    });
    export type VenueReadResponse = zod.infer<typeof ZVenueReadResponse>;

    const ZVenueShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({
        result:zod.array(ZVenueShallow)
            .describe('The shallow array of matched entries'),
    });
    export type VenueShallowReadResponse = zod.infer<typeof ZVenueShallowReadResponse>;

    const ZVenueModifyResponse = RESPONSE_CORE_SCHEMA(['READ', 'CREATE', 'UPDATE', 'DELETE']).extend({
        result: zod.array(zod.string())
            .describe('The array of matched or manipulated responses'),
    });
    export type VenueModifyResponse = zod.infer<typeof ZVenueModifyResponse>;

    const ZVenueResponse = ZVenueReadResponse.or(ZVenueShallowReadResponse).or(ZVenueModifyResponse)
    export type VenueResponse = zod.infer<typeof ZVenueResponse>;

    export type VenueMessage =
        VenueRead
        | VenueCreate
        | VenueUpdate
        | VenueDelete;

    export const ZVenueRequest = ZVenueRead
        .or(ZVenueCreate)
        .or(ZVenueUpdate)
        .or(ZVenueDelete);
    export type VenueRequest = zod.infer<typeof ZVenueRequest>;

    export class VenueMessageValidator extends ZodValidator {

        constructor() {
            super(ZVenueRequest);
        }

    }

    export class VenueResponseValidator extends ZodValidator {

        constructor() {
            super(ZVenueResponse);
        }

    }


}