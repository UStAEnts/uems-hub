/**
 * Restructures ./ent into a format to be directly re-exported by src/index.ts
 */
import { UserValidators } from "./UserValidators";

/**
 * Re-exports of types and functions in {@link UserValidators} relating to ent state messages
 */
export namespace UserMessage {
	export type AssertUserMessage = UserValidators.UserAssert;
	export type CreateUserMessage = UserValidators.UserCreate;
	export type UpdateUserMessage = UserValidators.UserUpdate;
	export type DeleteUserMessage = UserValidators.UserDelete;
	export type ReadUserMessage = UserValidators.UserRead;
	export type UserMessage = UserValidators.UserMessage;
}

/**
 * Re-exports of types and functions in {@link UserValidators} relating to the ent state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace UserResponse {
	export type InternalUser = UserValidators.UserRepresentation;
	export type UserReadResponseMessage = UserValidators.UserReadResponse;
	export type UserResponseMessage = UserValidators.UserModifyResponse;
}

export const UserMessageValidator = UserValidators.UserMessageValidator;
export const UserResponseValidator = UserValidators.UserResponseValidator;
