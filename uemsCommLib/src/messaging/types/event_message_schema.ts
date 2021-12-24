export enum MsgIntention {
    CREATE = 'CREATE', READ = 'READ', UPDATE = 'UPDATE', DELETE = 'DELETE'
}

// DateTimes are represented as seconds since epoch.
export type UemsDateTime = number;

export type CreateEventMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention.CREATE,
    event_name: string,
    event_start_date: UemsDateTime,
    event_end_date: UemsDateTime,
    venue_ids: string[],
    predicted_attendance: number
};

export type ReadEventMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention.READ,
    event_id?: string,
    event_name?: string,
    event_start_date_range_begin?: UemsDateTime,
    event_start_date_range_end?: UemsDateTime,
    event_end_date_range_begin?: UemsDateTime,
    event_end_date_range_end?: UemsDateTime,
    venue_ids?: string[],
    attendance?: number,
    localOnly? : boolean,
};

export type UpdateEventMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention.UPDATE,
    event_id: string,
    event_name?: string,
    event_start_date?: UemsDateTime,
    event_end_date?: UemsDateTime,
    venue_ids?: string[],
    predicted_attendance?: number,
    localOnly?: boolean,
};

export type DeleteEventMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention.DELETE,
    event_id: string,
};

export type EventMsg = CreateEventMsg | ReadEventMsg | UpdateEventMsg | DeleteEventMsg;

export function msgToJson(msg: EventMsg) {
    return JSON.stringify(msg);
}
