/**
 * Restructures ./event into a format to be re-exported by src/index.ts
 */
import { EventValidators } from './EventValidators';

/**
 * Re-exports of types and functions in {@link EventValidators} relating to event messages
 */
export namespace EventMessage {
    export type ReadEventMessage = EventValidators.EventRead;
    export type CreateEventMessage = EventValidators.EventCreate;
    export type UpdateEventMessage = EventValidators.EventUpdate;
    export type DeleteEventMessage = EventValidators.EventDelete;
    export type EventMessage = EventValidators.EventMessage;
}

/**
 * Re-exports of types and functions in {@link EventValidators} relating to the event messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace EventResponse {
    export type InternalEvent = EventValidators.EventRepresentation;
    export type EventServiceReadResponseMessage = EventValidators.EventShallowRepresentation;
    export type EventReadResponseMessage = EventValidators.EventReadResponse;
    export type EventModifyResponseMessage = EventValidators.EventModifyResponse;
    export type EventResponseMessage = EventReadResponseMessage | EventModifyResponseMessage;
}

export const EventMessageValidator = EventValidators.EventMessageValidator;
export const EventResponseValidator = EventValidators.EventResponseValidator;
