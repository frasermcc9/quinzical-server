import { inject, injectable } from "inversify";
import { Player, PlayerFactory, PlayerImpl } from "./Player";
import { Question } from "./Question";
import { Socket } from "socket.io";

@injectable()
class GameImpl implements Game {
    private players: Player[] = [];
    private code: string;

    private questionsCompleted: number;

    private questions: number;
    private timeToAnswer: number;
    private maxPlayers: number;

    private static default_questions = 5;
    private static initial_questions_answered = 0;
    private static default_time_to_answer = 10;
    private static default_max_players = 4;

    constructor(@inject("PlayerFactory") private readonly playerFactory: PlayerFactory) {
        this.questions = GameImpl.default_questions;
        this.questionsCompleted = GameImpl.initial_questions_answered;
        this.timeToAnswer = GameImpl.default_time_to_answer;
        this.maxPlayers = GameImpl.default_max_players;
    }

    getNextQuestion(): Question {
        throw new Error("Method not implemented.");
    }

    emitQuestionToPlayers(): void {
        this.players.forEach((player) => {
            player.sendQuestion(this.getNextQuestion().getSendableData());
        });
    }

    addPlayer(name: string, player: Socket): boolean {
        if (this.players.length == this.maxPlayers) return false;

        const playerObj: Player = this.playerFactory(name, player);
        this.players.push(playerObj);
        return true;
    }

    setGameSettings(settings: GameSettings) {
        this.questions = settings.questions ?? GameImpl.default_questions;
        this.timeToAnswer = settings.timePerQuestion ?? GameImpl.default_time_to_answer;
        this.maxPlayers = settings.maxPlayers ?? GameImpl.default_max_players;
    }

    public get Code(): string {
        return this.code;
    }

    public set Code(value: string) {
        this.code = value;
    }
}

interface Game {
    getNextQuestion(): Question;

    emitQuestionToPlayers(): void;

    addPlayer(name: string, player: Socket): boolean;

    setGameSettings(settings: GameSettings): void;

    Code: string;
}

interface GameSettings {
    questions?: number;
    timePerQuestion?: number;
    maxPlayers?: number;
}

export { Game, GameImpl, GameSettings };
