export enum MsgIntention {
    CREATE = 'CREATE', READ = 'READ', UPDATE = 'UPDATE', DELETE = 'DELETE'
}

export enum MsgStatus {
    SUCCESS = 200,
    FAIL = 405
}

// Internal event representation in messages.
export type InternalEvent = {
    event_id: string,
    event_name: string,
    event_start_date: Number,
    event_end_date: Number,
    venue_ids: string,
    attendance: Number
};

export type ReadRequestResponseMsg = {
    msg_id: Number,
    status: Number,
    msg_intention: MsgIntention,
    result: InternalEvent[]
};

export type RequestResponseMsg = {
    msg_id: Number,
    status: Number,
    msg_intention: MsgIntention,
    result: string[] // The ids of the event(s) effected.
};
