"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveQuestionManagerImpl = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../bindings/types");
let ActiveQuestionManagerImpl = class ActiveQuestionManagerImpl {
    constructor(log) {
        this.log = log;
        this.playerMap = new Map();
    }
    addPlayers(players) {
        players.forEach((player) => {
            this.playerMap.set(player, false);
        });
    }
    removePlayer(player) {
        this.playerMap.delete(player);
    }
    setNewQuestion(question) {
        this.question = question;
        this.playerMap.forEach((_v, k) => {
            this.playerMap.set(k, false);
            k.signalNewQuestion(question.getSendableData());
        });
    }
    isAllAnswered() {
        return Array.from(this.playerMap.values()).every((v) => v);
    }
    answerQuestion(solution, player, timeRatio) {
        if (this.question === undefined)
            throw new ReferenceError("Question is not set");
        if (!this.playerMap.has(player))
            this.log.error("ActiveQuestionManager", `Player in game was not found in player map.`);
        //answer question
        this.playerMap.set(player, true);
        solution = solution.toLowerCase();
        const correct = this.question.Solution.map((s) => s.toLowerCase()).includes(solution);
        player.increasePoints(this.calculatePoints(timeRatio, correct));
        player.getSocket().emit("answerResult", correct);
    }
    get CorrectAnswer() {
        if (this.question === undefined)
            throw new ReferenceError("Question is not set");
        return this.question.Solution[0];
    }
    /**
     * Calculates the bonus points based on how quickly the user answered the
     * question.
     *
     * 500 points is allocated for getting the question correct. A theoretical
     * maximum of 500 points is allocated for speed.
     *
     * @param timeRatio Ratio of timing remaining (i.e. 1 is instant answer, 0
     * is answered just as time ran out).
     */
    calculatePoints(timeRatio, correct) {
        return ~~(correct ? 0 : timeRatio * 500 + 500);
    }
};
ActiveQuestionManagerImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Log)),
    __metadata("design:paramtypes", [Object])
], ActiveQuestionManagerImpl);
exports.ActiveQuestionManagerImpl = ActiveQuestionManagerImpl;
//# sourceMappingURL=ActiveQuestionManager.js.map