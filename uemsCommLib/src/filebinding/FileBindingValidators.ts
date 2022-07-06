import { BaseSchema } from "../BaseSchema";
import { ZodValidator } from "../messaging/MessageValidator";
import { EventValidators } from "../event/EventValidators";
import { FileValidators } from "../file/FileValidators";
import * as zod from 'zod';

export namespace FileBindingValidators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	import ZEvent = EventValidators.ZEvent;
	import ZFile = FileValidators.ZFile;

	// == READ
	// = Query By File

	export const ZQueryByFile = REQUEST_CORE_SCHEMA('READ').extend({
		fileID: zod.string()
			.describe("The file ID for which to retrieve all events"),
		userFilter: zod.string()
			.describe("If the query should only return data created by the user identified by userID")
			.optional(),
	});
	export type QueryByFileMessage = zod.infer<typeof ZQueryByFile>;

	export const ZQueryByFileResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(ZEvent)
			.describe("The matched events from the query"),
	});
	export const ZQueryByFileShallowResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(zod.string())
			.describe("The matched events from the query"),
	});
	export type QueryByFileResponse = zod.infer<typeof ZQueryByFileResponse>;
	export type QueryByFileShallowResponse = zod.infer<typeof ZQueryByFileShallowResponse>;

	// = Query By Event

	export const ZQueryByEvent = REQUEST_CORE_SCHEMA('READ').extend({
		eventID: zod.string()
			.describe("The event ID for which to retrieve all events"),
		userFilter: zod.string()
			.describe("If the query should only return data created by the user identified by userID")
			.optional(),
	});
	export type QueryByEventMessage = zod.infer<typeof ZQueryByEvent>;

	export const ZQueryByEventResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(ZFile)
			.describe("The matched files from the query"),
	});
	export const ZQueryByEventShallowResponse = RESPONSE_CORE_SCHEMA('READ').extend({
		result: zod.array(zod.string())
			.describe("The matched files from the query"),
	});
	export type QueryByEventResponse = zod.infer<typeof ZQueryByEventResponse>;
	export type QueryByEventShallowResponse = zod.infer<typeof ZQueryByEventShallowResponse>;

	// == CREATE
	// = Bind Event to File

	export const ZBindEventToFile = REQUEST_CORE_SCHEMA('CREATE').extend({
		fileID: zod.string()
			.describe("The file which should be updated with the additional events"),
		eventIDs: zod.array(zod.string())
			.describe("The event IDs which should be bound to this file"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZBindEventToFileResponse = RESPONSE_CORE_SCHEMA('CREATE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type BindEventToFileMessage = zod.infer<typeof ZBindEventToFile>;
	export type BindEventToFileResponse = zod.infer<typeof ZBindEventToFileResponse>;

	// = Bind File to Event

	export const ZBindFileToEvent = REQUEST_CORE_SCHEMA('CREATE').extend({
		eventID: zod.string()
			.describe("The event which should be updated with the additional files"),
		fileIDs: zod.array(zod.string())
			.describe("The file IDs which should be bound to this event"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZBindFileToEventResponse = RESPONSE_CORE_SCHEMA('CREATE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type BindFileToEventMessage = zod.infer<typeof ZBindEventToFile>;
	export type BindFileToEventResponse = zod.infer<typeof ZBindEventToFileResponse>;

	// == DELETE
	// = Unbind Event from File

	export const ZUnbindEventFromFile = REQUEST_CORE_SCHEMA('DELETE').extend({
		fileID: zod.string()
			.describe("The file which should be unlinked with the provided events"),
		eventIDs: zod.array(zod.string())
			.describe("The event IDs which should be unbound from this file"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZUnbindEventFromFileResponse = RESPONSE_CORE_SCHEMA('DELETE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type UnbindEventFromFileMessage = zod.infer<typeof ZUnbindEventFromFile>;
	export type UnbindEventFromFileResponse = zod.infer<typeof ZUnbindEventFromFileResponse>;

	// = Unbind File from Event

	export const ZUnbindFileFromEvent = REQUEST_CORE_SCHEMA('DELETE').extend({
		eventID: zod.string()
			.describe("The event which should be unbound from the provided files"),
		fileIDs: zod.array(zod.string())
			.describe("The file IDs which should be unbound from this event"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZUnbindFileFromEventResponse = RESPONSE_CORE_SCHEMA('DELETE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type UnbindFileFromEventMessage = zod.infer<typeof ZUnbindFileFromEvent>;
	export type UnbindFileFromEventResponse = zod.infer<typeof ZUnbindFileFromEventResponse>;

	// == UPDATE
	// = Set Event for File

	export const ZSetEventsForFile = REQUEST_CORE_SCHEMA('UPDATE').extend({
		fileID: zod.string()
			.describe("The file to set these events for"),
		eventIDs: zod.string()
			.describe("The only events to be attached to this file"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZSetEventsForFileResponse = RESPONSE_CORE_SCHEMA('UPDATE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type SetEventsForFileMessage = zod.infer<typeof ZSetEventsForFile>;
	export type SetEventsForFileResponse = zod.infer<typeof ZSetEventsForFileResponse>;

	// = Set File for Event

	export const ZSetFilesForEvent = REQUEST_CORE_SCHEMA('UPDATE').extend({
		eventID: zod.string()
			.describe("The event id for which files should be set"),
		fileIDs: zod.array(zod.string())
			.describe("The only file ids which should be present on this event"),
		userFilter: zod.string()
			.describe("The user filter that should be applied to this request - this will only modify assets owned by this user")
			.optional(),
	});
	export const ZSetFilesForEventResponse = RESPONSE_CORE_SCHEMA('UPDATE').extend({
		results: zod.boolean()
			.describe("If the request completed successfully"),
	});
	export type SetFilesForEventMessage = zod.infer<typeof ZSetFilesForEvent>;
	export type SetFilesForEventResponse = zod.infer<typeof ZSetFilesForEventResponse>;

	// ===========================================================

	export type FileBindingResponseSchema = QueryByFileResponse | QueryByFileShallowResponse | QueryByEventResponse |
		QueryByEventShallowResponse | BindEventToFileResponse | BindFileToEventResponse |
		UnbindEventFromFileResponse | UnbindFileFromEventResponse | SetEventsForFileResponse |
		SetFilesForEventResponse;

	export type FileBindingMessage = QueryByFileMessage | QueryByEventMessage | BindEventToFileMessage |
		BindFileToEventMessage | UnbindEventFromFileMessage | UnbindFileFromEventMessage |
		SetEventsForFileMessage | SetFilesForEventMessage;

	export const ZFileBindingMessage = ZQueryByFile
		.or(ZQueryByEvent)
		.or(ZBindEventToFile)
		.or(ZBindFileToEvent)
		.or(ZUnbindEventFromFile)
		.or(ZUnbindFileFromEvent)
		.or(ZSetEventsForFile)
		.or(ZSetFilesForEvent);

	export const ZFileBindingResponse = ZQueryByFileResponse
		.or(ZQueryByFileShallowResponse)
		.or(ZQueryByEventResponse)
		.or(ZQueryByEventShallowResponse)
		.or(ZBindEventToFileResponse)
		.or(ZBindFileToEventResponse)
		.or(ZUnbindEventFromFileResponse)
		.or(ZUnbindFileFromEventResponse)
		.or(ZSetEventsForFileResponse)
		.or(ZSetFilesForEventResponse)

	/**
	 * A validator supporting only incoming FileBinding messages (read, create, delete and update). This uses the default
	 * validation scheme as the state schema does not have any additional validation rules
	 */
	export class FileBindingMessageValidator extends ZodValidator {

		constructor() {
			super(ZFileBindingMessage);
		}

	}

	/**
	 * A validator supporting only outgoing messages
	 */
	export class FileBindingResponseValidator extends ZodValidator {

		constructor() {
			super(ZFileBindingResponse);
		}

	}

}
