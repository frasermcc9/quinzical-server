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
    signalRoundOver(solution, playerPoints, topPlayers) {
        this.client.emit("roundOver", solution, playerPoints, topPlayers);
    }
    signalPlayerCountChange(players, max) {
        this.client.emit("playersChange", players, max);
    }
    signalNewQuestion(question) {
        this.client.emit("newQuestion", question.question, question.prompt);
    }
    signalGameStart() {
        this.client.emit("gameStart");
    }
    signalCorrectnessOfAnswer(correct) {
        this.client.emit("answerResult", correct);
    }
    signalGameInterrupt() {
        this.client.emit("interrupt");
    }
    signalKicked() {
        this.client.emit("kicked");
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