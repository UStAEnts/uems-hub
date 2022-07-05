/*
    Handles internal message validation as per the schema.

    Abstracts over Ajv to allow additional checks being added when performing message checks.
*/

import Ajv from 'ajv';
import { ZodError, ZodTypeAny } from "zod";

export type ValidateResponse = {
	success: true,
} | {
	success: false,
	errors: string[],
};

export interface SimpleValidator {
	validate(message: any): Promise<boolean>;

	validateWithErrors(message: any): Promise<ValidateResponse>;
}

export class ZodValidator implements SimpleValidator {
	constructor(private schema: ZodTypeAny) {
	}

	private static errorToStrings(error: ZodError<any>): string[] {
		return [
			error.message,
			...error.issues.map((e) => `[${ e.code }] ${ e.path }: ${ e.message }`),
		];
	}

	validate(message: any): Promise<boolean> {
		return Promise.resolve(this.schema.safeParse(message).success);
	}

	validateWithErrors(message: any): Promise<ValidateResponse> {
		let safeParse = this.schema.safeParse(message);
		if (safeParse.success) return Promise.resolve({ success: true });
		else return Promise.resolve({ success: false, errors: ZodValidator.errorToStrings(safeParse.error) });
	}

}

export class MessageValidator implements SimpleValidator {
	schemaValidator: Ajv.ValidateFunction;

	constructor(schema: object) {
		const ajv = new Ajv({ allErrors: true });
		this.schemaValidator = ajv.compile(schema);
	}

	validate(message: any): Promise<boolean> {
		return this.validateWithErrors(message).then((r) => r.success).catch(() => false);
	}

	public async validateWithErrors(msg: any): Promise<ValidateResponse> {
		try {
			const result = await this.schemaValidator(msg);
			if (result === true) return { success: true };

			if (process.env.UEMS_AJV_VERBOSE && process.env.UEMS_AJV_VERBOSE === 'on') {
				console.warn('ajv validation failed');
				console.warn(this.schemaValidator.errors);
			}

			return {
				success: false,
				errors: (this.schemaValidator.errors ?? []).map((v) => `${ v.dataPath } : ${ v.message }`),
			};
		} catch (err) {
			if (!(err instanceof Ajv.ValidationError)) throw err;

			if (process.env.UEMS_AJV_VERBOSE && process.env.UEMS_AJV_VERBOSE === 'on') {
				console.debug(err);
			}

			return {
				success: false,
				errors: [
					err.message,
					...((err.errors ?? []).map((v) => `${ v.dataPath } : ${ v.message }`)),
				],
			};
		}
	}
}
