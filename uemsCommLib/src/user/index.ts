/**
 * Restructures ./ent into a format to be directly re-exported by src/index.ts
 */
import { UserValidators } from "./UserValidators";

/**
 * Re-exports of types and functions in {@link UserValidators} relating to ent state messages
 */
export namespace UserMessage {
    export type AssertUserMessage = UserValidators.UserAssertSchema;
    export type CreateUserMessage = UserValidators.UserCreateSchema;
    export type UpdateUserMessage = UserValidators.UserUpdateSchema;
    export type DeleteUserMessage = UserValidators.UserDeleteSchema;
    export type ReadUserMessage = UserValidators.UserReadSchema;
    export type UserMessage = UserValidators.UserMessage;
    export const messageToJSON = UserValidators.messageToJSON;
}

/**
 * Re-exports of types and functions in {@link UserValidators} relating to the ent state messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace UserResponse {
    export type InternalUser = UserValidators.UserRepresentation;
    export type UserReadResponseMessage = Omit<UserValidators.UserResponseSchema, 'result'> & {
        result: UserValidators.UserRepresentation[],
    };
    export type UserResponseMessage = Omit<UserValidators.UserResponseSchema, 'result'> & {
        result: string[],
    };
}

export const UserMessageValidator = UserValidators.UserMessageValidator;
export const UserResponseValidator = UserValidators.UserResponseValidator;
