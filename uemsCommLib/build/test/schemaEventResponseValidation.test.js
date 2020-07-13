"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
require("mocha");
const MessageValidator_1 = require("../messaging/MessageValidator");
// A path to the .json file which describes valid message schema.
const MESSAGE_SCHEMA_PATH = 'schema/event_response_schema.json';
const fs = require('fs').promises;
let validator;
before(async () => {
    const schema = JSON.parse((await fs.readFile(MESSAGE_SCHEMA_PATH)).toString());
    validator = new MessageValidator_1.MessageValidator(schema);
});
describe('Valid Schema Test', () => {
    it('Should allow creating the validator', async () => {
        assert(validator !== undefined);
    });
});
//# sourceMappingURL=schemaEventResponseValidation.test.js.map