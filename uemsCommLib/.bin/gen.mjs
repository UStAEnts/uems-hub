// TODO: add object type support
import prompt from 'prompts';
import * as readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';
import {type} from "os";
import * as fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const tName = (args.length === 2 && args[0].toLowerCase() === '--module') ? args[1] : undefined;

// ██    ██ ████████ ██ ██      ██ ████████ ██ ███████ ███████
// ██    ██    ██    ██ ██      ██    ██    ██ ██      ██
// ██    ██    ██    ██ ██      ██    ██    ██ █████   ███████
// ██    ██    ██    ██ ██      ██    ██    ██ ██           ██
//  ██████     ██    ██ ███████ ██    ██    ██ ███████ ███████
//region Utilities

function writeToDisk(
	moduleName,
	uppercase,
	lowercase,
	folder,
	intentions,
	properties,
	primaryIdentifier,
	shallowType,
	intentionQueries,
) {
	fs.mkdirSync(folder, {recursive: true});
	fs.writeFileSync(path.join(folder, `${uppercase}.genmap.json`), JSON.stringify({
		moduleName,
		uppercase,
		lowercase,
		folder,
		intentions,
		properties,
		primaryIdentifier,
		shallowType,
		intentionQueries,
	}, null, '\t'));
}

async function loadFromDisk(folder, name) {
	try {
		console.log(path.join(folder, `${name}.genmap.json`))
		let content = fs.readFileSync(path.join(folder, `${name}.genmap.json`), {encoding: 'utf8'})

		const sourcemap = JSON.parse(content);

		if (await confirm(b`A source map has been found - do you want to use it (n will start generation from scratch)?`)) {
			console.log(i`Loaded from source file`);
			return sourcemap;
		} else {
			console.log(i`Restarting`);
			return await query();
		}
	} catch (e) {
		console.error(b`Failed to load the sourcemap from file!` + i`${e.message}`);
		return null;
	}
}

const c = (s, ...args) => `\u001b[36m${s.map((v, i) => `${v} ${args[i] ?? ''}`)}\u001b[0m`;
const g = (s, ...args) => `\u001b[32m${s.map((v, i) => `${v} ${args[i] ?? ''}`)}\u001b[0m`;
const r = (s, ...args) => `\u001b[31m${s.map((v, i) => `${v} ${args[i] ?? ''}`)}\u001b[0m`;
const cb = (s, ...args) => `\u001b[36m\u001b[1m${s.map((v, i) => `${v} ${args[i] ?? ''}`)}\u001b[0m`;
const gb = (s, ...args) => `\u001b[32m\u001b[1m${s.map((v, i) => `${v} ${args[i] ?? ''}`)}\u001b[0m`;
const b = (s, ...args) => `\u001b[1m${s.map((v, i) => `${v} ${args[i] ?? ''}`).join('')}\u001b[0m`;
const i = (s, ...args) => `\u001b[3m${s.map((v, i) => `${v} ${args[i] ?? ''}`).join('')}\u001b[0m`;
const intToCase = (v) => v.substring(0, 1).toUpperCase() + v.substring(1).toLowerCase();

const pw = async (config) => (await prompt({
	...config,
	name: '_',
	onState: (state) => {
		if (state.aborted) {
			process.nextTick(() => {
				process.exit(0);
			})
		}
	}
}))._;
const text = (message) => pw({type: 'text', message});
const confirm = (message) => pw({type: 'confirm', message});
const select = (message, choices) => pw({type: 'select', message, choices});
const multiselect = (message, choices) => pw({type: 'multiselect', message, choices});

async function typeSelect(message, choices) {
	const chosen = await select(message, choices.map((e) => ({title: e, value: e})).concat([{
		title: 'Custom',
		value: '___custom'
	}]));
	if (chosen === 'array') {
		return `array.${await typeSelect('Array type', choices)}`
	}
	if (chosen === '___custom') {
		return await text(message + ' (custom)');
	}
	return chosen;
}

function entryToExpression(type) {
	return `\t\t${type.name}: ${typeToExpression(type.type)}${type.optional ? "\n\t\t\t.optional()" : ''}\n\t\t\t.describe("${type.description}"),`;
}

function typeToExpression(type) {
	console.log('processing', type);
	switch (type) {
		case 'ranged.number':
			return `zod.object({\n\tgreater: zod.number().optional(), \n\tless: zod.number().optional(),\n}).or(zod.number())`
		case 'string':
			return `zod.string()`;
		case 'number':
			return `zod.number()`;
		case 'string (email)':
			return `zod.string()\n\t\t\t.email()`;
		case 'string (color)':
			return `zod.string()\n\t\t\t.regex(/^#?([\\dA-Fa-f]{3}([\\dA-Fa-f]{3})?)$/)`;
		case 'any':
			return `zod.any()`;
		case 'boolean':
			return `zod.boolean()`;
		case 'object (placeholder)':
			return `zod.object({/*TODO*/})`;
		default:
			if (type.includes("|")){
				const types = type.split('|').map((e) => typeToExpression(e));
				return types[0] + types.slice(1).map((e) => `.or(${e})`).join('');
			}
			if (type.startsWith('array.')) {
				return `zod.array(${typeToExpression(type.substring(6))})`
			}
			return type;
	}
}
//endregion

// ███    ███  ██████  ██████  ██    ██ ██      ███████
// ████  ████ ██    ██ ██   ██ ██    ██ ██      ██
// ██ ████ ██ ██    ██ ██   ██ ██    ██ ██      █████
// ██  ██  ██ ██    ██ ██   ██ ██    ██ ██      ██
// ██      ██  ██████  ██████   ██████  ███████ ███████


const moduleName = tName ?? await text('Module name (if using multiple words, use spaces i.e. "File Binding")');
const uppercase = moduleName.toLowerCase().split(" ").map((e) => `${e.substring(0, 1).toUpperCase()}${e.substring(1)}`).join('');
const lowercase = `${uppercase.substring(0, 1).toLowerCase()}${uppercase.substring(1)}`;
const folder = moduleName.toLowerCase().split(" ").join('-');

console.log(b`Name: ` + `${uppercase} // ${lowercase}`);
console.log(b`Storage: ` + `${folder}`);

const query = async () => {
	const intentions = await multiselect('Which intentions is this request valid for?', [
		{title: 'Read', value: 'READ'},
		{title: 'Create', value: 'CREATE'},
		{title: 'Update', value: 'UPDATE'},
		{title: 'Delete', value: 'DELETE'},
		{title: 'Assert', value: 'ASSERT'},
	]);

// ██████  ███████ ██████  ██████
// ██   ██ ██      ██   ██ ██   ██
// ██████  █████   ██████  ██████
// ██   ██ ██      ██      ██   ██
// ██   ██ ███████ ██      ██   ██
	//region Representation
	console.log(b`Configure representation properties:`)
	console.log(i`  This is for the object representation so should contain the most detailed implementation possible (not shallow). In the next section you will mark any fields as shallow`);

	const zodTypes = ['string', 'number', 'string (email)', 'string (color)', 'array', 'any', 'boolean', 'object (placeholder)'];

// Initial object type
	let properties = [];
	let continueProperties = true;
	do {
		const entry = {
			name: await text('Name'),
			type: await typeSelect('Type', zodTypes),
			optional: await confirm('Optional'),
			description: await text('Description'),
		}
		properties.push(entry);
		console.log(i`--> ${entry.name}: ${entry.type}${entry.optional ? '?' : ''}`)

		continueProperties = await confirm('Continue');
	} while (continueProperties);

	console.log(properties);
	let primaryIdentifier = await select('Primary identifier', properties.map((e) => ({title: e.name, value: e.name})));
	console.log(primaryIdentifier);
	//endregion

// ███████ ██   ██  █████  ██      ██       ██████  ██     ██
// ██      ██   ██ ██   ██ ██      ██      ██    ██ ██     ██
// ███████ ███████ ███████ ██      ██      ██    ██ ██  █  ██
//      ██ ██   ██ ██   ██ ██      ██      ██    ██ ██ ███ ██
// ███████ ██   ██ ██   ██ ███████ ███████  ██████   ███ ███

	//region Shallow
	let shallowType = undefined;
	if ((await confirm('Does this require a shallow type?'))) {
		continueProperties = true;
		shallowType = [];

		do {
			const entry = {
				name: await select('Property override', properties.map((e) => ({title: e.name, value: e.name}))),
				type: await typeSelect('Overridden type', zodTypes),
			}

			entry.description = properties.find((e) => e.name === entry.name).description;
			entry.optional = properties.find((e) => e.name === entry.name).optional;

			shallowType.push(entry);
			console.log(i`--> ${entry.name}: ${entry.type}`)

			continueProperties = await confirm('Continue');
		} while (continueProperties && properties.map((e) => e.name).filter((e) => shallowType.find((f) => f.name === e)).length > 0);
	}

	console.log(shallowType);
	//endregion
// ██ ███    ██ ████████ ███████ ███    ██ ████████ ██  ██████  ███    ██ ███████
// ██ ████   ██    ██    ██      ████   ██    ██    ██ ██    ██ ████   ██ ██
// ██ ██ ██  ██    ██    █████   ██ ██  ██    ██    ██ ██    ██ ██ ██  ██ ███████
// ██ ██  ██ ██    ██    ██      ██  ██ ██    ██    ██ ██    ██ ██  ██ ██      ██
// ██ ██   ████    ██    ███████ ██   ████    ██    ██  ██████  ██   ████ ███████

	const intentionQueries = {};

	for (const intention of intentions) {
		console.log(b`Configuration for ${intention}`);

		if (intention === 'READ') {
			console.log(i`Adding the default primary identifier and all shallow properties`);
			intentionQueries['READ'] = [];
			continueProperties = true;

			properties.map((e) => {
				const override = shallowType && shallowType.find((t) => t.name === e.name);
				if (override) {
					return {
						...override,
						description: e.description,
					};
				}

				return e;
			}).forEach((entry) => {
				if (entry.name === primaryIdentifier) {
					intentionQueries['READ'].push({
						name: entry.name,
						type: `${entry.type}|array.${entry.type}`,
						optional: true,
						description: entry.description,
					});
				} else if (entry.type === 'number') {
					intentionQueries['READ'].push({
						name: entry.name,
						type: `ranged.${entry.type}`,
						optional: true,
						description: entry.description,
					});
				} else {
					intentionQueries['READ'].push({
						...entry,
						optional: true,
					});
				}
			})

			console.log(b`Current properties`)
			intentionQueries['READ'].forEach((e) => console.log(i` - ${e.name} :: ${e.type}`));

			while (await confirm('Add more properties?')) {
				const entry = {
					name: await text('Name'),
					type: await typeSelect('Type', zodTypes),
					optional: await confirm('Optional'),
					description: await text('Description'),
				};
				intentionQueries['READ'].push(entry);
				console.log(`--> ${entry.name}: ${entry.type}${entry.optional ? '?' : ''}`);
			}
		}

		if (intention === 'CREATE') {
			console.log(i`Using the shallow representation type for create properties`);
			intentionQueries['CREATE'] = properties.map((e) => {
				const override = shallowType && shallowType.find((t) => t.name === e.name);
				if (override) {
					return {
						...override,
						description: e.description,
					};
				}

				return e;
			}).filter((e) => e.name !== primaryIdentifier);
		}

		if (intention === 'DELETE') {
			console.log(i`Using ${primaryIdentifier} as the only property`);
			intentionQueries['DELETE'] = [{
				name: primaryIdentifier,
				type: properties.find((e) => e.name === primaryIdentifier).type,
				description: "The unique identifier of this entity to remove"
			}];
		}

		if (intention === 'UPDATE') {
			console.log(i`Using the shallow representation type, plus ${primaryIdentifier} as identifier for update properties`);
			intentionQueries['UPDATE'] = properties.map((e) => {
				const override = shallowType && shallowType.find((t) => t.name === e.name);
				if (override) {
					return {
						...override,
						description: e.description,
					};
				}

				return e;
			}).map((e) => {
				if (e.name === primaryIdentifier) return {
					...e,
					optional: false,
				};

				return {
					...e,
					optional: true,
				};
			});
		}

		if (intention === 'ASSERT') {
			console.log(i`Using the shallow representation type for assertion properties`);
			intentionQueries['ASSERT'] = properties.map((e) => {
				const override = shallowType && shallowType.find((t) => t.name === e.name);
				if (override) {
					return {
						...override,
						description: e.description,
					};
				}

				return e;
			}).filter((e) => e.name !== primaryIdentifier);
		}

	}
	console.log(intentionQueries);

	return {
		intentions,
		properties,
		primaryIdentifier,
		shallowType,
		intentionQueries,
	}
}

const {
	intentions,
	properties,
	primaryIdentifier,
	shallowType,
	intentionQueries,
} = (await loadFromDisk(folder, uppercase)) ?? (await query());


//  ██████  ███████ ███    ██ ███████ ██████   █████  ████████ ██  ██████  ███    ██
// ██       ██      ████   ██ ██      ██   ██ ██   ██    ██    ██ ██    ██ ████   ██
// ██   ███ █████   ██ ██  ██ █████   ██████  ███████    ██    ██ ██    ██ ██ ██  ██
// ██    ██ ██      ██  ██ ██ ██      ██   ██ ██   ██    ██    ██ ██    ██ ██  ██ ██
//  ██████  ███████ ██   ████ ███████ ██   ██ ██   ██    ██    ██  ██████  ██   ████

const representation = `export const Z${uppercase} = zod.object({\n${properties.map((e) => entryToExpression(e)).join('\n')}\n\t});\n\texport type ${uppercase}Representation = zod.infer<typeof Z${uppercase}>;`;

const shallowReduced = shallowType ? properties.map((e) => {
	const override = shallowType && shallowType.find((t) => t.name === e.name);
	if (override) {
		return {
			...override,
			description: e.description,
		};
	}

	return e;
}) : undefined;
const shallowRepresentation = shallowReduced !== undefined ? `export const Z${uppercase}Shallow = zod.object({${shallowReduced.map((e) => entryToExpression(e)).join('\n')}\n\t});\n\texport type ${uppercase}ShallowRepresentation = zod.infer<typeof Z${uppercase}Shallow>;` : undefined;
const intentionGen = Object.entries(intentionQueries).map(([intention, config]) => {
	const codeIntention = intToCase(intention);
	return `\texport const Z${uppercase}${codeIntention} = REQUEST_CORE_SCHEMA('${intention}').extend({\n${config.map((e) => entryToExpression(e)).join('\n')}\n\t});\n\texport type ${uppercase}${codeIntention} = zod.infer<typeof Z${uppercase}${codeIntention}>;`
}).join('\n\n').substring(1);

const readResponse = intentions.includes('READ') ? `const Z${uppercase}ReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({\n\t\tresult:zod.array(Z${uppercase})\n\t\t\t.describe('The array of matched entries'),\n\t});\n\texport type ${uppercase}ReadResponse = zod.infer<typeof Z${uppercase}ReadResponse>;\n` : undefined;
const shallowReadResponse = (shallowType !== undefined && intentions.includes('READ')) ? `const Z${uppercase}ShallowReadResponse = RESPONSE_CORE_SCHEMA(['READ']).extend({\n\t\tresult:zod.array(Z${uppercase}Shallow)\n\t\t\t.describe('The shallow array of matched entries'),\n\t});\nexport type ${uppercase}ShallowReadResponse = zod.infer<typeof ${uppercase}ShallowReadResponse>;\n` : undefined;
const modifyResponse = intentions.filter((e) => e !== 'READ').length > 0 ? `const Z${uppercase}ModifyResponse = RESPONSE_CORE_SCHEMA([${intentions.map((e) => `'${e}'`).join(', ')}]).extend({\n\t\tresult: zod.array(zod.string())\n\t\t\t.describe('The array of matched or manipulated responses'),\n\t});\n\texport type ${uppercase}ModifyResponse = zod.infer<typeof Z${uppercase}ModifyResponse>;\n` : undefined;

const responses = [
	readResponse ? `Z${uppercase}ReadResponse` : undefined,
	shallowReadResponse ? `Z${uppercase}ShallowReadResponse` : undefined,
	modifyResponse ? `Z${uppercase}ModifyResponse` : undefined,
].filter((e) => e !== undefined);
const responseGen = `const Z${uppercase}Response = ${responses[0]}${responses.slice(1).map((e) => `.or(${e})`).join('')}\n\texport type ${uppercase}Response = zod.infer<typeof Z${uppercase}Response>;`;

const messageGen = `export type ${uppercase}Message = \n\t\t${intentions.map((intention) => `${uppercase}${intToCase(intention)}`).join('\n\t\t| ')};`
const requestGen = `export const Z${uppercase}Request = Z${uppercase}${intToCase(intentions[0])}\n\t\t${intentions.slice(1).map((e) => `.or(Z${uppercase}${intToCase(e)})`).join('\n\t\t')};\n\texport type ${uppercase}Request = zod.infer<typeof Z${uppercase}Request>;`;

const validators = `export class ${uppercase}MessageValidator extends ZodValidator {

	constructor() {
		super(Z${uppercase}Request);
	}
	
}

export class ${uppercase}ResponseValidator extends ZodValidator {

	constructor() {
		super(Z${uppercase}Response);
	}
	
}
`.split('\n').map((e) => `\t${e}`).join('\n').substring(1);

const file = `// Generated by gen.mjs @ ${new Date().toISOString()} - avoid editing this file by hand! 
import * as zod from 'zod';
import { BaseSchema } from '../BaseSchema';
import { ZodValidator } from '../messaging/MessageValidator';

export namespace ${uppercase}Validators {

	import REQUEST_CORE_SCHEMA = BaseSchema.REQUEST_CORE_SCHEMA;
	import RESPONSE_CORE_SCHEMA = BaseSchema.RESPONSE_CORE_SCHEMA;
	
	${representation}
	${shallowRepresentation ?? ''}
	${intentionGen}
	${readResponse ?? ''}
	${shallowReadResponse ?? ''}
	${modifyResponse ?? ''}
	${responseGen}
	
	${messageGen}
	
	${requestGen}
	
	${validators}
	
}`;

const intentionExports = intentions.map((e) => `\texport type ${intToCase(e)}${uppercase}Message = ${uppercase}Validators.${uppercase}${intToCase(e)};`).join('\n').substring(1);

const exportLines = [
	(shallowType !== undefined) ? `export type ShallowInternal${uppercase} = ${uppercase}Validators.${uppercase}ShallowRepresentation;` : undefined,
	(shallowType !== undefined && intentions.includes('READ')) ? `export type ${uppercase}ServiceReadResponseMessage = ${uppercase}Validators.${uppercase}ShallowReadResponse;` : undefined,
	intentions.includes('READ') ? `export type ${uppercase}ReadResponseMessage = ${uppercase}Validators.${uppercase}ReadResponse;` : undefined,
	intentions.filter((e) => e !== 'READ').length > 0 ? `export type ${uppercase}ModifyResponseMessage = ${uppercase}Validators.${uppercase}ModifyResponse;` : undefined,
	intentions.includes('READ') ? `export type ${uppercase}ResponseMessage = ${uppercase}ReadResponseMessage | ${uppercase}ModifyResponseMessage;` : undefined,
]
const reexport = `/**
 * Restructures ./${folder} into a format to be re-exported by src/index.ts
 */
import { ${uppercase}Validators } from './${uppercase}Validators';

/**
 * Re-exports of types and functions in {@link ${uppercase}Validators} relating to ${moduleName} messages
 */
export namespace ${uppercase}Message {
	${intentionExports}
	export type ${uppercase}Message = ${uppercase}Validators.${uppercase}Message;
}

/**
 * Re-exports of types and functions in {@link ${uppercase}Validators} relating to the ${moduleName} messages. This overrides
 * exported types with their correct result types for accuracy.
 */
export namespace ${uppercase}Response {
 	export type Internal${uppercase} = ${uppercase}Validators.${uppercase}Representation;
 	${exportLines.filter((e) => e).map((e) => `\t${e}`).join('\n').substring(1)}
}

export const ${uppercase}MessageValidator = ${uppercase}Validators.${uppercase}MessageValidator;
export const ${uppercase}ResponseValidator = ${uppercase}Validators.${uppercase}ResponseValidator;
`


writeToDisk(
	moduleName,
	uppercase,
	lowercase,
	folder,
	intentions,
	properties,
	primaryIdentifier,
	shallowType,
	intentionQueries,
);
console.log(file);

fs.writeFileSync(path.join(folder, `${uppercase}Validators.ts`), file, {encoding: 'utf8'});
fs.writeFileSync(path.join(folder, `index.ts`), reexport, {encoding: 'utf8'});