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
const events_1 = require("events");
let GameImpl = GameImpl_1 = class GameImpl extends events_1.EventEmitter {
    constructor(playerFactory, questionBank, questionManager, timer, log) {
        super();
        this.playerFactory = playerFactory;
        this.questionBank = questionBank;
        this.questionManager = questionManager;
        this.timer = timer;
        this.log = log;
        //#region FIELDS
        this.players = [];
        this.code = "AAAA";
        this.questions = GameImpl_1.default_questions;
        this.questionsCompleted = GameImpl_1.initial_questions_answered;
        this.timeToAnswer = GameImpl_1.default_time_to_answer;
        this.maxPlayers = GameImpl_1.default_max_players;
        this.isGamePublic = false;
    }
    //#endregion
    //#region IN GAME
    startGame() {
        //'Close' the game to new players
        this.maxPlayers = this.CurrentPlayers;
        this.timer.setDelay(this.timeToAnswer * 1000).setFunction(() => this.progressToRoundEnd());
        this.questionManager.addPlayers(this.players);
        this.checkReady();
        this.players.forEach((player) => {
            player.signalGameStart();
        });
    }
    getNextQuestion() {
        return this.questionBank.getQuestion();
    }
    progressToNextRound() {
        if (this.questionsCompleted == this.questions)
            return this.handleGameEnd();
        this.questionsCompleted++;
        this.players.forEach((player) => player.getSocket().once("questionAnswered", (answer) => {
            this.questionManager.answerQuestion(answer, player, this.getTimeRatio());
            if (this.questionManager.isAllAnswered()) {
                this.timer.stop();
                this.progressToRoundEnd();
            }
        }));
        const nextQuestion = this.getNextQuestion();
        this.questionManager.setNewQuestion(nextQuestion);
        this.log.trace("GameImpl", "Sending question.");
        this.timer.start();
    }
    progressToRoundEnd() {
        this.log.trace("GameImpl", `Round Ended. Waiting 3 seconds before continuing.`);
        this.players.forEach((player) => player.signalRoundOver(this.questionManager.CorrectAnswer, player.Points, this.getTopPlayers()));
        setTimeout(() => {
            this.players.forEach((p) => p.getSocket().emit("goNextRound"));
            this.checkReady();
        }, 3000);
    }
    //#endregion
    //#region PRE-GAME
    addPlayer(name, player, host = false) {
        if (this.players.length === this.maxPlayers)
            return false;
        if (this.players.find((p) => p.Name == name) !== undefined)
            return false;
        const playerObj = this.playerFactory(name, player);
        this.players.push(playerObj);
        const names = this.players.map((p) => p.Name);
        this.players.forEach((p) => p.signalPlayerCountChange(names, this.maxPlayers));
        playerObj.getSocket().once("playerDisconnect", () => this.removePlayer(playerObj));
        if (host) {
            this.host = playerObj;
            this.host
                .getSocket()
                .once("startGame", () => this.startGame())
                .on("kickMember", (memberName) => this.removePlayer(memberName));
        }
        return true;
    }
    addHostPlayer(name, player) {
        this.addPlayer(name, player, true);
        return true;
    }
    isPublic() {
        return this.isGamePublic;
    }
    isFull() {
        return this.players.length == this.maxPlayers;
    }
    //#endregion
    //#region GAME SETTINGS
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
    setGameSettings(settings) {
        this.questions = settings.questions ?? GameImpl_1.default_questions;
        this.timeToAnswer = settings.timePerQuestion ?? GameImpl_1.default_time_to_answer;
        this.maxPlayers = settings.maxPlayers ?? GameImpl_1.default_max_players;
        this.isGamePublic = settings.isGamePublic ?? false;
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
    //#endregion
    getPlayerNames() {
        return this.players.map((p) => p.Name);
    }
    getHostName() {
        const name = this.host?.Name;
        if (name === undefined) {
            throw new Error("Host does not have a name");
        }
        return name;
    }
    /**
     * returns the time ratio at the current point
     */
    getTimeRatio() {
        const result = this.timer.getTimeLeft() / (this.timeToAnswer * 1000);
        this.log.trace("GameImpl", `Time ratio of ${result} gotten.`);
        return result;
    }
    handleGameEnd() {
        this.log.trace("GameImpl", `Game ${this.code} has concluded.`);
        const top = this.getTopPlayers();
        this.players.forEach((p) => p.signalGameOver(top));
        this.emit("gameEnd");
    }
    /**
     * Gets top players (up to 5), their names and score.
     */
    getTopPlayers() {
        return this.players
            .sort((a, b) => b.Points - a.Points)
            .slice(0, Math.min(5, this.players.length))
            .map((p) => ({ Name: p.Name, Points: p.Points }));
    }
    removePlayer(player) {
        if (typeof player == "string") {
            const playerIntermediate = this.players.find((p) => p.Name == player);
            if (playerIntermediate === undefined)
                return;
            player = playerIntermediate;
        }
        this.players.splice(this.players.indexOf(player), 1);
        this.questionManager.removePlayer(player);
        const names = this.players.map((p) => p.Name);
        this.players.forEach((p) => p.signalPlayerCountChange(names, this.maxPlayers));
    }
    checkReady() {
        const readyMap = new Map();
        this.players.forEach((player) => {
            readyMap.set(player, false);
            player.getSocket().once("readyToPlay", () => {
                readyMap.set(player, true);
                if (Array.from(readyMap.values()).every((b) => b)) {
                    this.log.trace("GameImpl", `All players ready. Progressing to next round.`);
                    this.progressToNextRound();
                }
            });
        });
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
    __param(2, inversify_1.inject(types_1.TYPES.ActiveQuestionManager)),
    __param(3, inversify_1.inject(types_1.TYPES.Timer)),
    __param(4, inversify_1.inject(types_1.TYPES.Log)),
    __metadata("design:paramtypes", [Function, Object, Object, Object, Object])
], GameImpl);
exports.GameImpl = GameImpl;
//# sourceMappingURL=Game.js.map