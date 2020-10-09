"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerImpl = void 0;
class PlayerImpl {
    constructor(name, client) {
        this.name = name;
        this.client = client;
    }
    get Name() {
        return this.name;
    }
    sendQuestion(question) {
        this.client.emit("newQuestion", question);
    }
    getSocket() {
        return this.client;
    }
}
exports.PlayerImpl = PlayerImpl;
//# sourceMappingURL=Player.js.map