"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerImpl = void 0;
class PlayerImpl {
    constructor(name, client) {
        this.name = name;
        this.client = client;
    }
    sendQuestion(question) {
        this.client.emit("newQuestion", question);
    }
}
exports.PlayerImpl = PlayerImpl;
//# sourceMappingURL=Player.js.map