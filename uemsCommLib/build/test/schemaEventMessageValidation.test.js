"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
require("mocha");
const MessageValidator_1 = require("../messaging/MessageValidator");
// A path to the .json file which describes valid message schema.
const MESSAGE_SCHEMA_PATH = 'schema/event_schema.json';
const fs = require('fs').promises;
const VALID_CREATE_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'CREATE',
    event_name: 'evName',
    event_start_date: 100000,
    event_end_date: 100002,
    venue_ids: ['1', '2'],
    predicted_attendance: 140,
};
const INVALID_CREATE_MISSING_ATTENDANCE_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'CREATE',
    event_id: 'evId',
    event_name: 'evName',
    event_start_date: 100000,
    event_end_date: 100002,
    venue_ids: ['1', '2'],
};
const INVALID_STATUS_WRONG_TYPE_MSG = {
    msg_id: 1,
    status: 'hello',
    msg_intention: 'CREATE',
    event_id: 'evId',
    event_name: 'evName',
    event_start_date: 100000,
    event_end_date: 100002,
    venue_ids: ['1', '2'],
    predicted_attendance: 140,
};
const VALID_MINIMAL_GET_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'READ',
};
const VALID_FULLY_SPECIFIED_GET_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'READ',
    event_id: 'evID',
    event_name: 'The Wop',
    event_start_date_range_begin: 90,
    event_start_date_range_end: 91,
    event_end_date_range_begin: 99,
    event_end_date_range_end: 100,
    venue_ids: ['', ''],
    predicted_attendance: 140,
};
const INVALID_GET_MISSING_STATUS_MSG = {
    msg_id: 1,
    msg_intention: 'READ',
    event_id: 'evID',
    event_name: 'The Wop',
    event_start_date_range_begin: 90,
    event_start_date_range_end: 91,
    event_end_date_range_begin: 99,
    event_end_date_range_end: 100,
    venue_ids: ['', ''],
    attendance: 140,
};
const INVALID_STATUS_MISSING_MSG = {
    msg_id: 1,
    msg_intention: 'READ',
};
const VALID_UPDATE_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'UPDATE',
    event_id: 'evID',
    event_name: 'evName',
    event_start_date: 100000,
    event_end_date: 100002,
    venue_ids: ['1', '2'],
    predicted_attendance: 140,
};
const INVALID_UPDATE_MISSING_EVENTID_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'UPDATE',
    event_name: 'evName',
    event_start_date: 100000,
    event_end_date: 100002,
    venue_ids: ['1', '2'],
    predicted_attendance: 140,
};
const VALID_DELETE_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'UPDATE',
    event_id: 'evID',
};
const INVALID_DELETE_MISSING_EVENTID_MSG = {
    msg_id: 1,
    status: 200,
    msg_intention: 'UPDATE',
};
let validator;
before(async () => {
    const schema = JSON.parse((await fs.readFile(MESSAGE_SCHEMA_PATH)).toString());
    validator = new MessageValidator_1.MessageValidator(schema);
});
describe('Valid Schema Test', () => {
    it('Should process the message as expected', async () => {
        const result = await validator.validate(VALID_CREATE_MSG);
        assert(result);
    });
    it('Should reject message as attendance missing', async () => {
        const result = await validator.validate(INVALID_CREATE_MISSING_ATTENDANCE_MSG);
        assert(!result);
    });
    it('Should accept message as this is the minimum valid get message (get all)', async () => {
        const result = await validator.validate(VALID_MINIMAL_GET_MSG);
        assert(result);
    });
    it('Should reject message as status is not a number', async () => {
        const result = await validator.validate(INVALID_STATUS_WRONG_TYPE_MSG);
        assert(!result);
    });
    it('Should reject message as status is missing', async () => {
        const result = await validator.validate(INVALID_STATUS_MISSING_MSG);
        assert(!result);
    });
    it('should accept the message as this is a fully specified valid read message', async () => {
        const result = await validator.validate(VALID_FULLY_SPECIFIED_GET_MSG);
        assert(result);
    });
    it('should reject the message as this read message is missing a status field', async () => {
        const result = await validator.validate(INVALID_GET_MISSING_STATUS_MSG);
        assert(!result);
    });
    it('should accept the message as a valid update message', async () => {
        const result = await validator.validate(VALID_UPDATE_MSG);
        assert(result);
    });
    it('should reject the message as the update message is missing an event id', async () => {
        const result = await validator.validate(INVALID_UPDATE_MISSING_EVENTID_MSG);
        assert(!result);
    });
    it('should accept the message as a valid delete message', async () => {
        const result = await validator.validate(VALID_DELETE_MSG);
        assert(result);
    });
    it('should reject the message as the delete message is missing an event id', async () => {
        const result = await validator.validate(INVALID_DELETE_MISSING_EVENTID_MSG);
        assert(!result);
    });
});
//# sourceMappingURL=schemaEventMessageValidation.test.js.map