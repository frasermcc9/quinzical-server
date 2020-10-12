/// <reference types="node" />
import { PlayerFactory } from "./Player";
import { Question } from "./Questions/Question";
import { Socket } from "socket.io";
import { QuestionBank } from "./Questions/QuestionBank";
import { ActiveQuestionManager } from "./ActiveQuestionManager";
import { Timer } from "../helpers/Timer";
import { EventEmitter } from "events";
import { Log } from "../helpers/Log";
declare class GameImpl extends EventEmitter implements Game {
    private readonly playerFactory;
    private readonly questionBank;
    private readonly questionManager;
    private readonly timer;
    private readonly log;
    private players;
    private code;
    private host?;
    private questionsCompleted;
    private questions;
    private timeToAnswer;
    private maxPlayers;
    private isGamePublic;
    private static default_questions;
    private static initial_questions_answered;
    private static default_time_to_answer;
    private static default_max_players;
    constructor(playerFactory: PlayerFactory, questionBank: QuestionBank, questionManager: ActiveQuestionManager, timer: Timer, log: Log);
    startGame(): void;
    getNextQuestion(): Question;
    progressToNextRound(): void;
    progressToRoundEnd(): void;
    addPlayer(name: string, player: Socket, host?: boolean): boolean;
    addHostPlayer(name: string, player: Socket): boolean;
    isPublic(): boolean;
    isFull(): boolean;
    getGameInfo(): GameData;
    setGameSettings(settings: GameSettings): void;
    get Code(): string;
    set Code(value: string);
    get CurrentPlayers(): number;
    get MaxPlayers(): number;
    get QuestionCount(): number;
    get TimePerQuestion(): number;
    getPlayerNames(): string[];
    getHostName(): string;
    /**
     * returns the time ratio at the current point
     */
    private getTimeRatio;
    private handleGameEnd;
    /**
     * Gets top players (up to 5), their names and score.
     */
    private getTopPlayers;
    private removePlayer;
    private checkReady;
}
interface Game {
    getNextQuestion(): Question;
    progressToNextRound(): void;
    addPlayer(name: string, player: Socket): boolean;
    addHostPlayer(name: string, player: Socket): boolean;
    setGameSettings(settings: GameSettings): void;
    isPublic(): boolean;
    isFull(): boolean;
    getHostName(): string;
    getGameInfo(): GameData;
    getPlayerNames(): string[];
    on(event: "gameEnd", listener: () => void): void;
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
//# sourceMappingURL=Game.d.ts.map