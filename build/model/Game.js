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
var GameImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameImpl = void 0;
const inversify_1 = require("inversify");
let GameImpl = GameImpl_1 = class GameImpl {
    constructor(playerFactory) {
        this.playerFactory = playerFactory;
        this.players = [];
        this.code = "AAAA";
        this.questions = GameImpl_1.default_questions;
        this.questionsCompleted = GameImpl_1.initial_questions_answered;
        this.timeToAnswer = GameImpl_1.default_time_to_answer;
        this.maxPlayers = GameImpl_1.default_max_players;
    }
    getNextQuestion() {
        throw new Error("Method not implemented.");
    }
    emitQuestionToPlayers() {
        this.players.forEach((player) => {
            player.sendQuestion(this.getNextQuestion().getSendableData());
        });
    }
    addPlayer(name, player) {
        if (this.players.length == this.maxPlayers)
            return false;
        const playerObj = this.playerFactory(name, player);
        this.players.push(playerObj);
        return true;
    }
    setGameSettings(settings) {
        this.questions = settings.questions ?? GameImpl_1.default_questions;
        this.timeToAnswer = settings.timePerQuestion ?? GameImpl_1.default_time_to_answer;
        this.maxPlayers = settings.maxPlayers ?? GameImpl_1.default_max_players;
    }
    get Code() {
        return this.code;
    }
    set Code(value) {
        this.code = value;
    }
};
GameImpl.default_questions = 5;
GameImpl.initial_questions_answered = 0;
GameImpl.default_time_to_answer = 10;
GameImpl.default_max_players = 4;
GameImpl = GameImpl_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("PlayerFactory")),
    __metadata("design:paramtypes", [Function])
], GameImpl);
exports.GameImpl = GameImpl;
//# sourceMappingURL=Game.js.map