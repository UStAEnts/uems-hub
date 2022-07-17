/**
 * Restructures ./Automation into a format to be re-exported by src/index.ts
 */
import { AutomationValidators } from './AutomationValidators';

export const ACTIVE_AUTOMATION_VERSION = AutomationValidators.ACTIVE_AUTOMATION_VERSION;


/**
 * Re-exports of types and functions in {@link AutomationValidators} relating to Automation messages
 */
export namespace AutomationMessage {
	export type ReadAutomationMessage = AutomationValidators.AutomationRead;
	export type CreateAutomationMessage = AutomationValidators.AutomationCreate;
	export type UpdateAutomationMessage = AutomationValidators.AutomationUpdate;
	export type DeleteAutomationMessage = AutomationValidators.AutomationDelete;
	export type AutomationMessage = AutomationValidators.AutomationMessage;
}

/**
 * Re-exports of types and functions in {@link AutomationValidators} relating to the Automation messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace AutomationResponse {
	export type InternalAutomation = AutomationValidators.AutomationV0;
	export type ShallowInternalAutomation = AutomationValidators.AutomationV0Shallow;
	export type AllVInternalAutomation = AutomationValidators.AllAutomationVersions;
	export type AllVShallowInternalAutomation = AutomationValidators.AllAutomationVersionsShallow;
	export type AutomationServiceReadResponseMessage = AutomationValidators.AutomationShallowReadResponse;
	export type AutomationReadResponseMessage = AutomationValidators.AutomationReadResponse;
	export type AutomationModifyResponseMessage = AutomationValidators.AutomationModifyResponse;
	export type AutomationResponseMessage = AutomationReadResponseMessage | AutomationModifyResponseMessage;
}

export const AutomationMessageValidator = AutomationValidators.AutomationMessageValidator;
export const AutomationResponseValidator = AutomationValidators.AutomationResponseValidator;
