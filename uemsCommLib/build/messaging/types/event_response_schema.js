"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgStatus = exports.MsgIntention = void 0;
var MsgIntention;
(function (MsgIntention) {
    MsgIntention["CREATE"] = "CREATE";
    MsgIntention["READ"] = "READ";
    MsgIntention["UPDATE"] = "UPDATE";
    MsgIntention["DELETE"] = "DELETE";
})(MsgIntention = exports.MsgIntention || (exports.MsgIntention = {}));
var MsgStatus;
(function (MsgStatus) {
    MsgStatus[MsgStatus["SUCCESS"] = 200] = "SUCCESS";
    MsgStatus[MsgStatus["FAIL"] = 405] = "FAIL";
})(MsgStatus = exports.MsgStatus || (exports.MsgStatus = {}));
//# sourceMappingURL=event_response_schema.js.map