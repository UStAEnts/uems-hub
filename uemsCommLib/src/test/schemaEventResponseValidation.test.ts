const assert = require('assert');

import 'mocha';
import { EventResponseValidator } from '../index';

let validator: EventResponseValidator;

before(async () => {
    validator = await EventResponseValidator.setup();
});

describe('Valid Schema Test', () => {
    it('Should allow creating the validator', async () => {
        assert(validator !== undefined);
    });
});
