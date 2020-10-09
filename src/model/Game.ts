import { inject, injectable } from "inversify";
import { Player, PlayerFactory, PlayerImpl } from "./Player";
import { Question } from "./Questions/Question";
import { Socket } from "socket.io";
import { TYPES } from "../bindings/types";
import { QuestionBank } from "./Questions/QuestionBank";

@injectable()
class GameImpl implements Game {
    private players: Player[] = [];
    private code: string = "AAAA";
    private host?: Player;

    private questionsCompleted: number;

    private questions: number;
    private timeToAnswer: number;
    private maxPlayers: number;
    private isGamePublic: boolean;

    private static default_questions = 5;
    private static initial_questions_answered = 0;
    private static default_time_to_answer = 10;
    private static default_max_players = 4;

    constructor(
        @inject("PlayerFactory") private readonly playerFactory: PlayerFactory,
        @inject(TYPES.QuestionBank) private readonly questionBank: QuestionBank
    ) {
        this.questions = GameImpl.default_questions;
        this.questionsCompleted = GameImpl.initial_questions_answered;
        this.timeToAnswer = GameImpl.default_time_to_answer;
        this.maxPlayers = GameImpl.default_max_players;
        this.isGamePublic = false;
    }

    getGameInfo(): GameData {
        return {
            code: this.code,
            currentPlayers: this.CurrentPlayers,
            host: this.getHostName(),
            maxPlayers: this.MaxPlayers,
            questions: this.QuestionCount,
            timePerQuestion: this.TimePerQuestion,
        };
    }

    getHostName(): string {
        const name: string | undefined = this.host?.Name;
        if (name === undefined) {
            throw new Error("Host does not have a name");
        }
        return name;
    }

    getNextQuestion(): Question {
        return this.questionBank.getQuestion();
    }

    emitQuestionToPlayers(): void {
        this.players.forEach((player) => {
            player.sendQuestion(this.getNextQuestion().getSendableData());
        });
    }

    addPlayer(name: string, player: Socket): boolean {
        if (this.players.length === this.maxPlayers) return false;
        if (this.players.find((p) => p.Name == name) !== undefined) return false;

        const playerObj: Player = this.playerFactory(name, player);
        this.players.push(playerObj);

        this.players.forEach((p) => p.getSocket().emit("playerJoin", name));

        return true;
    }

    addHostPlayer(name: string, player: Socket): boolean {
        if (this.isFull()) return false;

        const playerObj: Player = this.playerFactory(name, player);
        this.players.push(playerObj);
        this.host = playerObj;
        return true;
    }

    setGameSettings(settings: GameSettings) {
        this.questions = settings.questions ?? GameImpl.default_questions;
        this.timeToAnswer = settings.timePerQuestion ?? GameImpl.default_time_to_answer;
        this.maxPlayers = settings.maxPlayers ?? GameImpl.default_max_players;
        this.isGamePublic = settings.isGamePublic ?? false;
    }

    isPublic(): boolean {
        return this.isGamePublic;
    }

    isFull(): boolean {
        return this.players.length == this.maxPlayers;
    }

    getPlayerNames(): string[] {
        return this.players.map((p) => p.Name);
    }

    get Code(): string {
        return this.code;
    }

    set Code(value: string) {
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
}

interface Game {
    getNextQuestion(): Question;

    emitQuestionToPlayers(): void;

    addPlayer(name: string, player: Socket): boolean;

    addHostPlayer(name: string, player: Socket): boolean;

    setGameSettings(settings: GameSettings): void;

    isPublic(): boolean;

    isFull(): boolean;

    getHostName(): string;

    getGameInfo(): GameData;

    getPlayerNames(): string[];

    CurrentPlayers: number;

    Code: string;

    MaxPlayers: number;

    QuestionCount: number;

    TimePerQuestion: number;
}

interface GameData {
    host: string;
    code: string;
    currentPlayers: number;
    maxPlayers: number;
    questions: number;
    timePerQuestion: number;
}

interface GameSettings {
    questions?: number;
    timePerQuestion?: number;
    maxPlayers?: number;
    isGamePublic?: boolean;
}

export { Game, GameImpl, GameSettings };
