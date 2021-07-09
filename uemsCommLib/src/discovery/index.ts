import {DiscoveryValidators} from "./DiscoveryValidators";

export namespace DiscoveryMessage{
    export type DeleteMessage = DiscoveryValidators.DeleteRequest;
    export type DiscoverMessage = DiscoveryValidators.DiscoveryRequest;
    export type DiscoveryDeleteMessage = DiscoveryValidators.DiscoveryDeleteMessage;
}

export namespace DiscoveryResponse {
    export type DeleteResponse = DiscoveryValidators.DeleteReply;
    export type DiscoverResponse = DiscoveryValidators.DiscoveryReply;
    export type DiscoveryDeleteResponse = DiscoveryValidators.DiscoveryDeleteResponse;
}

export const DiscoveryMessageValidator = DiscoveryValidators.DiscoveryMessageValidator;
export const DiscoveryResponseValidator = DiscoveryValidators.DiscoveryResponseValidator;