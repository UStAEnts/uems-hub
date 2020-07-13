"use strict";
/*
    Handles internal message validation as per the schema.

    Abstracts over Ajv to allow additional checks being added when performing message checks.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidator = void 0;
const ajv_1 = __importDefault(require("ajv"));
class MessageValidator {
    constructor(schema) {
        const ajv = new ajv_1.default({ allErrors: true });
        this.schemaValidator = ajv.compile(schema);
    }
    async validate(msg) {
        return this.schemaValidator(msg);
    }
}
exports.MessageValidator = MessageValidator;
//# sourceMappingURL=MessageValidator.js.map