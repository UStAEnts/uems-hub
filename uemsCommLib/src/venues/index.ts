/**
 * Restructures ./venue into a format to be re-exported by src/index.ts
 */
import { VenueValidators } from './VenueValidators';

/**
 * Re-exports of types and functions in {@link VenueValidators} relating to venue messages
 */
export namespace VenueMessage {
    export type ReadVenueMessage = VenueValidators.VenueRead;
    export type CreateVenueMessage = VenueValidators.VenueCreate;
    export type UpdateVenueMessage = VenueValidators.VenueUpdate;
    export type DeleteVenueMessage = VenueValidators.VenueDelete;
    export type VenueMessage = VenueValidators.VenueMessage;
}

/**
 * Re-exports of types and functions in {@link VenueValidators} relating to the venue messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace VenueResponse {
    export type InternalVenue = VenueValidators.VenueRepresentation;
    export type ShallowInternalVenue = VenueValidators.VenueShallowRepresentation;
    export type VenueServiceReadResponseMessage = VenueValidators.VenueShallowReadResponse;
    export type VenueReadResponseMessage = VenueValidators.VenueReadResponse;
    export type VenueModifyResponseMessage = VenueValidators.VenueModifyResponse;
    export type VenueResponseMessage = VenueReadResponseMessage | VenueModifyResponseMessage;
}

export const VenueMessageValidator = VenueValidators.VenueMessageValidator;
export const VenueResponseValidator = VenueValidators.VenueResponseValidator;
