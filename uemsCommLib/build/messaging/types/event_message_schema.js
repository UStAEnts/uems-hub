"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgToJson = exports.MsgIntention = void 0;
var MsgIntention;
(function (MsgIntention) {
    MsgIntention["CREATE"] = "CREATE";
    MsgIntention["READ"] = "READ";
    MsgIntention["UPDATE"] = "UPDATE";
    MsgIntention["DELETE"] = "DELETE";
})(MsgIntention = exports.MsgIntention || (exports.MsgIntention = {}));
function msgToJson(msg) {
    return JSON.stringify(msg);
}
exports.msgToJson = msgToJson;
//# sourceMappingURL=event_message_schema.js.map