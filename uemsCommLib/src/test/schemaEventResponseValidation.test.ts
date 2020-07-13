const assert = require('assert');

import 'mocha';
import { MessageValidator } from '../messaging/MessageValidator';

// A path to the .json file which describes valid message schema.
const MESSAGE_SCHEMA_PATH: string = 'schema/event_response_schema.json';

const fs = require('fs').promises;

let validator: MessageValidator;

before(async () => {
    const schema = JSON.parse((await fs.readFile(MESSAGE_SCHEMA_PATH)).toString());
    validator = new MessageValidator(schema);
});

describe('Valid Schema Test', () => {
    it('Should allow creating the validator', async () => {
        assert(validator !== undefined);
    });
});
