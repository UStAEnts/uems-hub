"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
require("mocha");
const index_1 = require("../index");
let validator;
before(async () => {
    validator = await index_1.EventResponseValidator.setup();
});
describe('Valid Schema Test', () => {
    it('Should allow creating the validator', async () => {
        assert(validator !== undefined);
    });
});
//# sourceMappingURL=schemaEventResponseValidation.test.js.map