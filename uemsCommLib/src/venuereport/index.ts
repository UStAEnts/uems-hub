/**
 * Restructures ./venue-report into a format to be re-exported by src/index.ts
 */
import { VenueReportValidators } from './VenueReportValidators';

/**
 * Re-exports of types and functions in {@link VenueReportValidators} relating to venue report messages
 */
export namespace VenueReportMessage {
    export type ReadVenueReportMessage = VenueReportValidators.VenueReportRead;
    export type CreateVenueReportMessage = VenueReportValidators.VenueReportCreate;
    export type UpdateVenueReportMessage = VenueReportValidators.VenueReportUpdate;
    export type DeleteVenueReportMessage = VenueReportValidators.VenueReportDelete;
    export type VenueReportMessage = VenueReportValidators.VenueReportMessage;
}

/**
 * Re-exports of types and functions in {@link VenueReportValidators} relating to the venue report messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace VenueReportResponse {
    export type InternalVenueReport = VenueReportValidators.VenueReportRepresentation;
    export type ShallowInternalVenueReport = VenueReportValidators.VenueReportShallowRepresentation;
    export type VenueReportServiceReadResponseMessage = VenueReportValidators.VenueReportShallowReadResponse;
    export type VenueReportReadResponseMessage = VenueReportValidators.VenueReportReadResponse;
    export type VenueReportModifyResponseMessage = VenueReportValidators.VenueReportModifyResponse;
    export type VenueReportResponseMessage = VenueReportReadResponseMessage | VenueReportModifyResponseMessage;
}

export const VenueReportMessageValidator = VenueReportValidators.VenueReportMessageValidator;
export const VenueReportResponseValidator = VenueReportValidators.VenueReportResponseValidator;
