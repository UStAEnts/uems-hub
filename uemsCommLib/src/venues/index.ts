/*
 * This file is designed to bring the ./venues folder in to a format that can be directly re-exported by src/index.ts
 * in the same style that events are exported.
 */

import { VenueValidators } from "./VenueValidators";

/**
 * Re-exports of types and functions in {@link VenueValidators} relating to venue messages in the format required for
 * direct re-exports
 */
export namespace VenueMessage {
    export type CreateVenueMessage = VenueValidators.VenueCreateSchema;
    export type UpdateVenueMessage = VenueValidators.VenueUpdateSchema;
    export type DeleteVenueMessage = VenueValidators.VenueDeleteSchema;
    export type ReadVenueMessage = VenueValidators.VenueReadSchema;
    export type VenueMessage = VenueValidators.VenueMessage;
    export const messageToJSON = VenueValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link VenueValidators} relating to venue responses with additional utility
 * types for specific responses in the format required for direct re-exports
 */
export namespace VenueResponse {
    export type ShallowInternalVenue = VenueValidators.ShallowVenueRepresentation;
	export type InternalVenue = VenueValidators.VenueRepresentation;
    export type VenueReadResponseMessage = Omit<VenueValidators.VenueResponseSchema, 'result'> & {
        result: VenueValidators.VenueRepresentation[],
    }
    export type VenueResponseMessage = Omit<VenueValidators.VenueResponseSchema, 'result'> & {
        result: string[],
    }
}

// Validators
export const VenueMessageValidator = VenueValidators.VenueMessageValidator;
export const VenueResponseValidator = VenueValidators.VenueResponseValidator;
