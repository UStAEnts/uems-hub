// export * as EventMsg from './messaging/types/event_message_schema';
// export * as EventRes from './messaging/types/event_response_schema';
import * as MessageValidator from './messaging/MessageValidator';
import { has as hasFunc } from './utilities/ObjectUtilities';

export enum MsgStatus {
    SUCCESS = 200,
    FAIL = 405
}

export const MessageIntention = {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
};

export { VenueMessage, VenueResponse, VenueResponseValidator, VenueMessageValidator } from './venues/index';
export { EntStateMessage, EntStateResponse, EntStateResponseValidator, EntStateMessageValidator } from './ent/index';
export { UserMessage, UserResponse, UserResponseValidator, UserMessageValidator } from './user/index';

export { FileMessage, FileResponse, FileResponseValidator, FileMessageValidator } from './file/index';
export { StateMessage, StateResponse, StateResponseValidator, StateMessageValidator } from './state/index';
export { EquipmentMessage, EquipmentResponse, EquipmentResponseValidator, EquipmentMessageValidator } from './equipment/index';
export { VenueReportMessage, VenueReportResponse, VenueReportResponseValidator, VenueReportMessageValidator } from './venuereport/index';
export { CommentMessage, CommentResponse, CommentResponseValidator, CommentMessageValidator } from './comment/index';
export { TopicMessage, TopicResponse, TopicResponseValidator, TopicMessageValidator } from './topic/index';
export { SignupMessage, SignupResponse, SignupResponseValidator, SignupMessageValidator } from './signup/index';
export { EventMessage, EventResponse, EventResponseValidator, EventMessageValidator } from './event/index';
export { FileBindingMessage, FileBindingResponse, FileBindingResponseValidator, FileBindingMessageValidator } from './filebinding/index';
export { DiscoveryMessage, DiscoveryResponse, DiscoveryResponseValidator, DiscoveryMessageValidator } from './discovery/index';

export { MessageValidator } from './messaging/MessageValidator';
export { has } from './utilities/ObjectUtilities';

export * from './BaseSchema'


export namespace ObjectUtilities {
    export const has = hasFunc;
}