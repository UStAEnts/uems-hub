const assert = require('assert');

import 'mocha';
import { EventResponseValidator, EventResponseValidatorDeprecated } from '../index';

let validator: EventResponseValidatorDeprecated;

before(async () => {
    validator = await EventResponseValidatorDeprecated.setup();
});

describe('Valid Schema Test', () => {
    it('Should allow creating the validator', async () => {
        assert(validator !== undefined);
    });
});
