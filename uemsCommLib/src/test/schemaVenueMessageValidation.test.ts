import { VenueValidators } from "../venues/VenueValidators";
import VenueMessage = VenueValidators.VenueMessage;
import VenueResponseSchema = VenueValidators.VenueResponseSchema;
import VenueCreateSchema = VenueValidators.VenueCreateSchema;
import VenueDeleteSchema = VenueValidators.VenueDeleteSchema;
import VenueUpdateSchema = VenueValidators.VenueUpdateSchema;
import VenueReadSchema = VenueValidators.VenueReadSchema;
import assert from "assert";
import { MessageValidator } from "../messaging/MessageValidator";
import VenueMessageValidator = VenueValidators.VenueMessageValidator;
import VenueResponseValidator = VenueValidators.VenueResponseValidator;
import { inspect } from "util";

function breakData<T extends VenueMessage | VenueResponseSchema>(data: T, modify: (keyof T)[] | keyof T, change: 'delete' | 'type', keepType: boolean = false) {
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

const VALID_CREATE: VenueCreateSchema = {
    capacity: 30,
    msg_id: 0,
    msg_intention: "CREATE",
    color: "#000000",
    name: "Venue",
    status: 0,
    userid: 'abc',
};

const VALID_DELETE: VenueDeleteSchema = {
    status: 0,
    msg_intention: "DELETE",
    msg_id: 0,
    id: "abc",
};

const VALID_UPDATE: VenueUpdateSchema = {
    msg_id: 0,
    msg_intention: "UPDATE",
    status: 0,
    id: "abx",
    capacity: 25,
    color: "#0f00f0",
    name: "New Name",
}

const INVALID_COMPLETE_READ: VenueReadSchema = {
    status: 0,
    msg_intention: "READ",
    msg_id: 0,
    approximate_capacity: 30,
    approximate_fuzziness: 10,
    capacity: 30,
    maximum_capacity: 90,
    minimum_capacity: 10,
    name: "Something",
}

const CORE_VALUES: {status: number, msg_intention: "READ", msg_id: number} = {
    status: 0,
    msg_intention: "READ",
    msg_id: 0,
}

const VALID_RESPONSE: VenueResponseSchema = {
    ...CORE_VALUES,
    status: 100,
    result: ["abc"],
}

let validator: MessageValidator;

describe('Venue Validators', () => {
    describe('Request', () => {
        beforeEach(async () => {
            validator = await VenueMessageValidator.setup();
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
            }));
            // Reject wrong type
            assert(!await validator.validate({
                ...CORE_VALUES,
                capacity: "10",
            }));

            // Allowed only approximate
            assert(await validator.validate({
                ...CORE_VALUES,
                approximate_capacity: 0,
            }));
            // Reject wrong type
            assert(!await validator.validate({
                ...CORE_VALUES,
                approximate_capacity: "10",
            }));

            // Allowed only minimum
            assert(await validator.validate({
                ...CORE_VALUES,
                minimum_capacity: 0,
            }));
            // Reject wrong type
            assert(!await validator.validate({
                ...CORE_VALUES,
                minimum_capacity: "10",
            }));

            // Allowed only maximum
            assert(await validator.validate({
                ...CORE_VALUES,
                maximum_capacity: 0,
            }));
            // Reject wrong type
            assert(!await validator.validate({
                ...CORE_VALUES,
                maximum_capacity: "10",
            }));

            // Allowed both min and max
            assert(await validator.validate({
                ...CORE_VALUES,
                minimum_capacity: 0,
                maximum_capacity: 0,
            }));

            // Not allowed a fuzziness on its own
            assert(!await validator.validate({
                ...CORE_VALUES,
                approximate_fuzziness: 10,
            }));

            // Not allowed to mix capacities
            assert(!await validator.validate({
                ...CORE_VALUES,
                capacity: 10,
                approximate_fuzziness: 10,
            }));
            assert(!await validator.validate({
                ...CORE_VALUES,
                capacity: 10,
                approximate_capacity: 10,
            }));
            assert(!await validator.validate({
                ...CORE_VALUES,
                capacity: 10,
                minimum_capacity: 10,
            }));
            assert(!await validator.validate({
                ...CORE_VALUES,
                capacity: 10,
                maximum_capacity: 10,
            }));
            assert(!await validator.validate({
                ...CORE_VALUES,
                maximum_capacity: 10,
                approximate_capacity: 10,
            }));
            assert(!await validator.validate({
                ...CORE_VALUES,
                minimum_capacity: 10,
                approximate_capacity: 10,
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
            validator = await VenueResponseValidator.setup();
        })
        it('should validate responses successfully', async () =>  {
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
            assert(await validator.validate({
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
                            color: '#aeaeae',
                        }
                    ]
                }
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
                        }
                    ]
                }
            }));
        });
    })
});
