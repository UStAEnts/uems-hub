export * as EventMsg from './messaging/types/event_message_schema';
export * as EventRes from './messaging/types/event_response_schema';
import * as MessageValidator from './messaging/MessageValidator';

import * as fs from 'fs/promises';

const EVENT_SCHEMA_PATH: string = '../schema/event_schema.json';
const EVENT_RESPONSE_SCHEMA_PATH: string = '../schema/event_response_schema.json';

export class EventMsgValidator extends MessageValidator.MessageValidator {
    constructor(schema: Object) {
        super(schema);
    }

    static async setup() {
        const schema = JSON.parse((await fs.readFile(EVENT_SCHEMA_PATH)).toString());
        return new EventMsgValidator(schema);
    }
}

export class EventResponseValidator extends MessageValidator.MessageValidator {
    constructor(schema: Object) {
        super(schema);
    }

    static async setup() {
        const schema = JSON.parse((await fs.readFile(EVENT_RESPONSE_SCHEMA_PATH)).toString());
        return new EventResponseValidator(schema);
    }
}