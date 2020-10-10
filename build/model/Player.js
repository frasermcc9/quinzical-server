"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerImpl = void 0;
class PlayerImpl {
    constructor(name, client) {
        this.name = name;
        this.client = client;
        this.points = 0;
    }
    signalGameOver(winners) {
        this.client.emit("gameFinished", winners);
    }
    signalRoundOver(solution, playerPoints) {
        this.client.emit("roundOver", solution, playerPoints);
    }
    signalPlayerCountChange(players) {
        this.client.emit("playersChange", players);
    }
    signalNewQuestion(question) {
        this.client.emit("newQuestion", question);
    }
    signalGameStart() {
        this.client.emit("gameStart");
    }
    get Name() {
        return this.name;
    }
    get Points() {
        return this.points;
    }
    getSocket() {
        return this.client;
    }
    increasePoints(pointsToAdd) {
        this.points += pointsToAdd;
    }
}
exports.PlayerImpl = PlayerImpl;
//# sourceMappingURL=Player.js.map