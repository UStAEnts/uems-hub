/**
 * Restructures ./equipment into a format to be directly re-exported by src/index.ts
 */
import { EquipmentValidators } from "./EquipmentValidators";

/**
 * Re-exports of types and functions in {@link EquipmentValidators} relating to Equipment messages
 */
export namespace EquipmentMessage {
    export type CreateEquipmentMessage = EquipmentValidators.EquipmentCreateSchema;
    export type UpdateEquipmentMessage = EquipmentValidators.EquipmentUpdateSchema;
    export type DeleteEquipmentMessage = EquipmentValidators.EquipmentDeleteSchema;
    export type ReadEquipmentMessage = EquipmentValidators.EquipmentReadSchema;
    export type EquipmentMessage = EquipmentValidators.EquipmentMessage;
    export const messageToJSON = EquipmentValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link EquipmentValidators} relating to the equipment messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace EquipmentResponse {
    export type InternalEquipment = EquipmentValidators.EquipmentRepresentation;
    export type EquipmentReadResponseMessage = Omit<EquipmentValidators.EquipmentResponseSchema, 'result'> & {
        result: EquipmentValidators.EquipmentRepresentation[],
    };
    export type EquipmentResponseMessage = Omit<EquipmentValidators.EquipmentResponseSchema, 'result'> & {
        result: string[],
    };
}

export const EquipmentMessageValidator = EquipmentValidators.EquipmentMessageValidator;
export const EquipmentResponseValidator = EquipmentValidators.EquipmentResponseValidator;
