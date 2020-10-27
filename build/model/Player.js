"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerImpl = void 0;
class PlayerImpl {
    constructor(name, client) {
        this.name = name;
        this.client = client;
        this.points = 0;
        this.mostRecentPoints = 0;
        this.pointsArray = [];
    }
    signalGameOver(winners, yourPoints) {
        this.client.emit("gameFinished", winners, yourPoints);
    }
    signalRoundOver(solution, playerPoints, topPlayers) {
        this.client.emit("roundOver", solution, playerPoints, topPlayers, this.mostRecentPoints);
        this.mostRecentPoints = 0;
    }
    signalPlayerCountChange(players, xp, max) {
        this.client.emit("playersChange", players, xp, max);
    }
    signalNewQuestion(question) {
        this.client.emit("newQuestion", question.question, question.prompt);
    }
    signalGameStart(timer) {
        this.client.emit("gameStart", timer);
    }
    signalCorrectnessOfAnswer(correct, points) {
        this.client.emit("answerResult", correct);
        this.mostRecentPoints = points;
        this.pointsArray.push(points);
    }
    signalGameInterrupt() {
        this.client.emit("interrupt");
    }
    signalKicked() {
        this.client.emit("kicked");
    }
    getSocket() {
        return this.client;
    }
    increasePoints(pointsToAdd) {
        this.points += pointsToAdd;
    }
    setMostRecentPoints(n) {
        this.mostRecentPoints = n;
    }
    get Name() {
        return this.name;
    }
    get Points() {
        return this.points;
    }
    playerGameStats() {
        return [this.pointsArray.filter((p) => p).length, this.pointsArray.filter((p) => !p).length];
    }
}
exports.PlayerImpl = PlayerImpl;
//# sourceMappingURL=Player.js.map