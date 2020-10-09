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
const types_1 = require("../bindings/types");
let GameImpl = GameImpl_1 = class GameImpl {
    constructor(playerFactory, questionBank) {
        this.playerFactory = playerFactory;
        this.questionBank = questionBank;
        this.players = [];
        this.code = "AAAA";
        this.questions = GameImpl_1.default_questions;
        this.questionsCompleted = GameImpl_1.initial_questions_answered;
        this.timeToAnswer = GameImpl_1.default_time_to_answer;
        this.maxPlayers = GameImpl_1.default_max_players;
        this.isGamePublic = false;
    }
    getGameInfo() {
        return {
            code: this.code,
            currentPlayers: this.CurrentPlayers,
            host: this.getHostName(),
            maxPlayers: this.MaxPlayers,
            questions: this.QuestionCount,
            timePerQuestion: this.TimePerQuestion,
        };
    }
    getHostName() {
        const name = this.host?.Name;
        if (name === undefined) {
            throw new Error("Host does not have a name");
        }
        return name;
    }
    getNextQuestion() {
        return this.questionBank.getQuestion();
    }
    emitQuestionToPlayers() {
        this.players.forEach((player) => {
            player.sendQuestion(this.getNextQuestion().getSendableData());
        });
    }
    addPlayer(name, player) {
        if (this.players.length === this.maxPlayers)
            return false;
        if (this.players.find((p) => p.Name == name) !== undefined)
            return false;
        const playerObj = this.playerFactory(name, player);
        this.players.push(playerObj);
        this.host?.getSocket().emit("playerJoin", name);
        return true;
    }
    addHostPlayer(name, player) {
        if (this.isFull())
            return false;
        const playerObj = this.playerFactory(name, player);
        this.players.push(playerObj);
        this.host = playerObj;
        return true;
    }
    setGameSettings(settings) {
        this.questions = settings.questions ?? GameImpl_1.default_questions;
        this.timeToAnswer = settings.timePerQuestion ?? GameImpl_1.default_time_to_answer;
        this.maxPlayers = settings.maxPlayers ?? GameImpl_1.default_max_players;
        this.isGamePublic = settings.isGamePublic ?? false;
    }
    isPublic() {
        return this.isGamePublic;
    }
    isFull() {
        return this.players.length == this.maxPlayers;
    }
    get Code() {
        return this.code;
    }
    set Code(value) {
        this.code = value;
    }
    get CurrentPlayers() {
        return this.players.length;
    }
    get MaxPlayers() {
        return this.maxPlayers;
    }
    get QuestionCount() {
        return this.questions;
    }
    get TimePerQuestion() {
        return this.timeToAnswer;
    }
};
GameImpl.default_questions = 5;
GameImpl.initial_questions_answered = 0;
GameImpl.default_time_to_answer = 10;
GameImpl.default_max_players = 4;
GameImpl = GameImpl_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("PlayerFactory")),
    __param(1, inversify_1.inject(types_1.TYPES.QuestionBank)),
    __metadata("design:paramtypes", [Function, Object])
], GameImpl);
exports.GameImpl = GameImpl;
//# sourceMappingURL=Game.js.map