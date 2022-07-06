/**
 * Restructures ./equipment into a format to be re-exported by src/index.ts
 */
import { EquipmentValidators } from './EquipmentValidators';

/**
 * Re-exports of types and functions in {@link EquipmentValidators} relating to equipment messages
 */
export namespace EquipmentMessage {
    export type ReadEquipmentMessage = EquipmentValidators.EquipmentRead;
    export type CreateEquipmentMessage = EquipmentValidators.EquipmentCreate;
    export type UpdateEquipmentMessage = EquipmentValidators.EquipmentUpdate;
    export type DeleteEquipmentMessage = EquipmentValidators.EquipmentDelete;
    export type EquipmentMessage = EquipmentValidators.EquipmentMessage;
}

/**
 * Re-exports of types and functions in {@link EquipmentValidators} relating to the equipment messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace EquipmentResponse {
    export type InternalEquipment = EquipmentValidators.EquipmentRepresentation;
    export type EquipmentServiceReadResponseMessage = EquipmentValidators.EquipmentShallowRepresentation;
    export type EquipmentReadResponseMessage = EquipmentValidators.EquipmentReadResponse;
    export type EquipmentModifyResponseMessage = EquipmentValidators.EquipmentModifyResponse;
    export type EquipmentResponseMessage = EquipmentReadResponseMessage | EquipmentModifyResponseMessage;
}

export const EquipmentMessageValidator = EquipmentValidators.EquipmentMessageValidator;
export const EquipmentResponseValidator = EquipmentValidators.EquipmentResponseValidator;
