/**
* Restructures ./event into a format to be directly re-exported by src/index.ts
*/
import { EventValidators } from "./EventValidators";

/**
* Re-exports of types and functions in {@link EventValidators} relating to Event messages
*/
export namespace EventMessage {
    export type CreateEventMessage = EventValidators.EventCreateSchema;
    export type UpdateEventMessage = EventValidators.EventUpdateSchema;
    export type DeleteEventMessage = EventValidators.EventDeleteSchema;
    export type ReadEventMessage = EventValidators.EventReadSchema;
    export type EventMessage = EventValidators.EventMessage;
    export const messageToJSON = EventValidators.messageToJSON;
}

/**
* Re-exports of types and functions in {@link EventValidators} relating to the event messages. This overrides
* exported types with their correct result types for accuracy.
*/
export namespace EventResponse {
    export type ShallowInternalEvent = EventValidators.ShallowEventRepresentation;
	export type InternalEvent = EventValidators.EventRepresentation;
    export type EventReadResponseMessage = Omit<EventValidators.EventResponseSchema, 'result'> & {
        result: EventValidators.EventRepresentation[],
    };
    export type EventServiceReadResponseMessage = Omit<EventValidators.EventResponseSchema, 'result'> & {
        result: EventValidators.ShallowEventRepresentation[],
    }
    export type EventResponseMessage = Omit<EventValidators.EventResponseSchema, 'result'> & {
        result: string[],
    };
}

export const EventMessageValidator = EventValidators.EventMessageValidator;
export const EventResponseValidator = EventValidators.EventResponseValidator;
