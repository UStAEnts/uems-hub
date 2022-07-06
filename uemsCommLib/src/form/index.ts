/**
 * Restructures ./form into a format to be re-exported by src/index.ts
 */
import { FormValidators } from './FormValidators';

/**
 * Re-exports of types and functions in {@link FormValidators} relating to form messages
 */
export namespace FormMessage {
	export type ReadFormMessage = FormValidators.FormRead;
	export type CreateFormMessage = FormValidators.FormCreate;
	export type UpdateFormMessage = FormValidators.FormUpdate;
	export type DeleteFormMessage = FormValidators.FormDelete;
	export type FormMessage = FormValidators.FormMessage;
}

/**
 * Re-exports of types and functions in {@link FormValidators} relating to the form messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace FormResponse {
 	export type InternalForm = FormValidators.FormRepresentation;
	 export type ShallowInternalForm = FormValidators.FormShallowRepresentation;
 	export type FormServiceReadResponseMessage = FormValidators.FormShallowReadResponse;
	export type FormReadResponseMessage = FormValidators.FormReadResponse;
	export type FormModifyResponseMessage = FormValidators.FormModifyResponse;
	export type FormResponseMessage = FormReadResponseMessage | FormModifyResponseMessage;
}

export const FormMessageValidator = FormValidators.FormMessageValidator;
export const FormResponseValidator = FormValidators.FormResponseValidator;
