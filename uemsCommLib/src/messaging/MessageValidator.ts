/*
    Handles internal message validation as per the schema.

    Abstracts over Ajv to allow additional checks being added when performing message checks.
*/

import Ajv from 'ajv';

export class MessageValidator {
    schemaValidator: Ajv.ValidateFunction;

    constructor(schema: object) {
        const ajv = new Ajv({ allErrors: true });
        this.schemaValidator = ajv.compile(schema);
    }

    public async validate(msg: any): Promise<boolean> {
        try {
            const result = await this.schemaValidator(msg);
            if (result === true) return true;

            if (process.env.UEMS_AJV_VERBOSE && process.env.UEMS_AJV_VERBOSE === 'on') {
                console.warn('ajv validation failed');
                console.warn(this.schemaValidator.errors);
            }

            return false;
        } catch (err) {
            if (!(err instanceof Ajv.ValidationError)) throw err;

            if (process.env.UEMS_AJV_VERBOSE && process.env.UEMS_AJV_VERBOSE === 'on') {
                console.debug(err);
            }

            return false;
        }
    }
}
