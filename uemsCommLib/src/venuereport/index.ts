/**
 * Restructures ./venuereport into a format to be directly re-exported by src/index.ts
 */
import { VenueReportValidators } from "./VenueReportValidators";

/**
 * Re-exports of types and functions in {@link VenueReportValidators} relating to VenueReport messages
 */
export namespace VenueReportMessage {
    export type CreateVenueReportMessage = VenueReportValidators.VenueReportCreateSchema;
    export type UpdateVenueReportMessage = VenueReportValidators.VenueReportUpdateSchema;
    export type DeleteVenueReportMessage = VenueReportValidators.VenueReportDeleteSchema;
    export type ReadVenueReportMessage = VenueReportValidators.VenueReportReadSchema;
    export type VenueReportMessage = VenueReportValidators.VenueReportMessage;
    export const messageToJSON = VenueReportValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link VenueReportValidators} relating to the venuereport messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace VenueReportResponse {
    export type InternalVenueReport = VenueReportValidators.VenueReportRepresentation;
    export type VenueReportReadResponseMessage = Omit<VenueReportValidators.VenueReportResponseSchema, 'result'> & {
        result: VenueReportValidators.VenueReportRepresentation[],
    };
    export type VenueReportResponseMessage = Omit<VenueReportValidators.VenueReportResponseSchema, 'result'> & {
        result: string[],
    };
}

export const VenueReportMessageValidator = VenueReportValidators.VenueReportMessageValidator;
export const VenueReportResponseValidator = VenueReportValidators.VenueReportResponseValidator;
