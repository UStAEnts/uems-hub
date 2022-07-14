import { VenueValidators } from "../venues/VenueValidators";
import assert from "assert";
import { SimpleValidator } from "../MessageValidator";
import VenueMessage = VenueValidators.VenueMessage;
import VenueMessageValidator = VenueValidators.VenueMessageValidator;
import VenueResponseValidator = VenueValidators.VenueResponseValidator;
import VenueResponse = VenueValidators.VenueResponse;
import VenueCreate = VenueValidators.VenueCreate;
import VenueDelete = VenueValidators.VenueDelete;
import VenueUpdate = VenueValidators.VenueUpdate;
import VenueRead = VenueValidators.VenueRead;

function breakData<T extends VenueMessage | VenueResponse>(data: T, modify: (keyof T)[] | keyof T, change: 'delete' | 'type', keepType: boolean = false) {
	const clone = {
		...data,
	};

	const changeKeys = Array.isArray(modify) ? modify : [modify];

	if (change === 'delete') {
		for (const key of changeKeys) {
			delete clone[key];
		}

		return clone;
	}

	for (const key of changeKeys) {
		if (typeof (data[key]) === 'string') {
			clone[key] = (keepType ? "invalid vlaue" : 234) as unknown as T[keyof T];
		} else if (typeof (data[key]) === 'number') {
			clone[key] = (keepType ? Number.MAX_SAFE_INTEGER : "something") as unknown as T[keyof T];
		} else {
			console.warn('Modifying key with an unsupported type')
			clone[key] = null as unknown as T[keyof T];
		}
	}

	return clone;
}

const VALID_CREATE: VenueCreate = {
	capacity: 30,
	msg_id: 0,
	msg_intention: "CREATE",
	color: "#000000",
	name: "Venue",
	status: 0,
	user: '',
	userID: 'anonymous',
};

const VALID_DELETE: VenueDelete = {
	status: 0,
	msg_intention: "DELETE",
	msg_id: 0,
	id: "abc",
	userID: 'anonymous',
};

const VALID_UPDATE: VenueUpdate = {
	msg_id: 0,
	msg_intention: "UPDATE",
	status: 0,
	id: "abx",
	capacity: 25,
	color: "#0f00f0",
	name: "New Name",
	userID: 'anonymous',
}

const INVALID_COMPLETE_READ: VenueRead = {
	status: 0,
	msg_intention: "READ",
	msg_id: 0,
	// @ts-ignore
	capacity: "30",
	name: "Something",
	userID: 'anonymous',
}

const CORE_VALUES: { status: number, msg_intention: "READ", msg_id: number, id: string, userID: string } = {
	status: 0,
	msg_intention: "READ",
	msg_id: 0,
	id: "abc",
	userID: "x",
}

const VALID_RESPONSE: VenueResponse = {
	...CORE_VALUES,
	status: 100,
	result: ["abc"],
	userID: 'anonymous',
}

let validator: SimpleValidator;

describe('Venue Validators', () => {
	describe('Request', () => {
		beforeEach(async () => {
			validator = new VenueMessageValidator();
		})

		it('should validate create messages', async () => {
			// Check a valid message
			assert(await validator.validate(VALID_CREATE));

			// Make sure it flags any key being removed except color
			assert(!await validator.validate(breakData(VALID_CREATE, 'msg_intention', 'delete')), 'missing msg_intention');
			assert(!await validator.validate(breakData(VALID_CREATE, 'msg_id', 'delete')), 'missing msg_id');
			assert(!await validator.validate(breakData(VALID_CREATE, 'status', 'delete')), 'missing status');
			assert(!await validator.validate(breakData(VALID_CREATE, 'name', 'delete')), 'missing name');
			assert(!await validator.validate(breakData(VALID_CREATE, 'capacity', 'delete')), 'missing capacity');
			assert(await validator.validate(breakData(VALID_CREATE, 'color', 'delete')), 'missing color');

			// Make sure it flags any value of the wrong type
			assert(!await validator.validate(breakData(VALID_CREATE, 'msg_intention', 'type')), 'wrong type for msg_intention');
			assert(!await validator.validate(breakData(VALID_CREATE, 'msg_id', 'type')), 'wrong type for msg_id');
			assert(!await validator.validate(breakData(VALID_CREATE, 'status', 'type')), 'wrong type for status');
			assert(!await validator.validate(breakData(VALID_CREATE, 'name', 'type')), 'wrong type for name');
			assert(!await validator.validate(breakData(VALID_CREATE, 'color', 'type')), 'wrong type for color');
			assert(!await validator.validate(breakData(VALID_CREATE, 'capacity', 'type')), 'wrong type for capacity');
		});

		it('should validate delete messages', async () => {
			// Check a valid message
			assert(await validator.validate(VALID_DELETE));

			// Make sure it flags any key being removed except color
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_intention', 'delete')), 'missing msg_intention');
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_id', 'delete')), 'missing msg_id');
			assert(!await validator.validate(breakData(VALID_DELETE, 'status', 'delete')), 'missing status');
			assert(!await validator.validate(breakData(VALID_DELETE, 'id', 'delete')), 'missing id');

			// Make sure it flags any value of the wrong type
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_intention', 'type')), 'wrong type for msg_intention');
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_id', 'type')), 'wrong type for msg_id');
			assert(!await validator.validate(breakData(VALID_DELETE, 'status', 'type')), 'wrong type for status');
			assert(!await validator.validate(breakData(VALID_DELETE, 'id', 'type')), 'wrong type for id');
		});

		it('should validate update messages', async () => {
			// Check a valid message
			assert(await validator.validate(VALID_UPDATE));

			// Make sure it flags any key core being removed but not any optional key
			assert(!await validator.validate(breakData(VALID_UPDATE, 'msg_intention', 'delete')), 'missing msg_intention');
			assert(!await validator.validate(breakData(VALID_UPDATE, 'msg_id', 'delete')), 'missing msg_id');
			assert(!await validator.validate(breakData(VALID_UPDATE, 'status', 'delete')), 'missing status');
			assert(!await validator.validate(breakData(VALID_UPDATE, 'id', 'delete')), 'missing id');
			assert(await validator.validate(breakData(VALID_UPDATE, 'name', 'delete')), 'missing name');
			assert(await validator.validate(breakData(VALID_UPDATE, 'color', 'delete')), 'missing color');
			assert(await validator.validate(breakData(VALID_UPDATE, 'capacity', 'delete')), 'missing capacity');

			// Make sure it flags any value of the wrong type
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_intention', 'type')), 'wrong type for msg_intention');
			assert(!await validator.validate(breakData(VALID_DELETE, 'msg_id', 'type')), 'wrong type for msg_id');
			assert(!await validator.validate(breakData(VALID_DELETE, 'status', 'type')), 'wrong type for status');
			assert(!await validator.validate(breakData(VALID_DELETE, 'id', 'type')), 'wrong type for id');
			assert(!await validator.validate(breakData(VALID_CREATE, 'name', 'type')), 'wrong type for name');
			assert(!await validator.validate(breakData(VALID_CREATE, 'color', 'type')), 'wrong type for color');
			assert(!await validator.validate(breakData(VALID_CREATE, 'capacity', 'type')), 'wrong type for capacity');
		});

		it('should validate read messages', async () => {
			assert(!await validator.validate(INVALID_COMPLETE_READ));

			// Allowed with only capacity
			assert(await validator.validate({
				...CORE_VALUES,
				capacity: 0,
			}))
			// Reject wrong type
			assert(!await validator.validate({
				...CORE_VALUES,
				capacity: "10",
			}));

			// Allowed only minimum
			assert(await validator.validate({
				...CORE_VALUES,
				capacity: {
					greater: 10,
				},
			}));
			// Reject wrong type
			assert(!await validator.validate({
				...CORE_VALUES,
				capacity: "10",
			}));
			assert(!await validator.validate({
				...CORE_VALUES,
				capacity: {
					greater: "10",
				},
			}));

			// Allowed only maximum
			assert(await validator.validate({
				...CORE_VALUES,
				capacity: {
					less: 0,
				},
			}));
			// Reject wrong type
			assert(!await validator.validate({
				...CORE_VALUES,
				capacity: {
					less: "10",
				},
			}));

			// Allowed both min and max
			assert(await validator.validate({
				...CORE_VALUES,
				capacity: {
					less: 0,
					greater: 0,
				},
			}));

			// Wrong type on name
			assert(!await validator.validate({
				...CORE_VALUES,
				name: 10,
			}));
		});
	});

	describe('Response', () => {
		beforeEach(async () => {
			validator = new VenueResponseValidator();
		})
		it('should validate responses successfully', async () => {
			// Check a valid message
			assert(await validator.validate(VALID_RESPONSE));

			// Make sure it flags any key core being removed but not any optional key
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'msg_intention', 'delete')), 'missing msg_intention');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'msg_id', 'delete')), 'missing msg_id');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'status', 'delete')), 'missing status');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'result', 'delete')), 'missing result');

			// Make sure it flags any value of the wrong type
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'msg_intention', 'type')), 'wrong type for msg_intention');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'msg_id', 'type')), 'wrong type for msg_id');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'status', 'type')), 'wrong type for status');
			assert(!await validator.validate(breakData(VALID_RESPONSE, 'result', 'type')), 'wrong type for result');

			// Validate with venues
			assert(await validator.validateWithErrors({
				...VALID_RESPONSE,
				...{
					result: [
						{
							id: '',
							name: 'A',
							capacity: 83,
							user: 'someone',
						},
						{
							id: '',
							name: 'A',
							capacity: 83,
							color: '#aeaeae',
							user: 'someone',
						},
					],
				},
			}));
			// Reject with venues with bad color
			assert(!await validator.validate({
				...VALID_RESPONSE,
				...{
					result: [
						{
							name: 'A',
							capacity: 83,
						},
						{
							name: 'A',
							capacity: 83,
							color: '#aeaea',
						},
					],
				},
			}));
		});
	})
});
