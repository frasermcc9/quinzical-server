import { PlayerFactory } from "./Player";
import { Question } from "./Questions/Question";
import { Socket } from "socket.io";
import { QuestionBank } from "./Questions/QuestionBank";
declare class GameImpl implements Game {
    private readonly playerFactory;
    private readonly questionBank;
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
    constructor(playerFactory: PlayerFactory, questionBank: QuestionBank);
    getGameInfo(): GameData;
    getHostName(): string;
    getNextQuestion(): Question;
    emitQuestionToPlayers(): void;
    addPlayer(name: string, player: Socket): boolean;
    addHostPlayer(name: string, player: Socket): boolean;
    setGameSettings(settings: GameSettings): void;
    isPublic(): boolean;
    isFull(): boolean;
    getPlayerNames(): string[];
    get Code(): string;
    set Code(value: string);
    get CurrentPlayers(): number;
    get MaxPlayers(): number;
    get QuestionCount(): number;
    get TimePerQuestion(): number;
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
//# sourceMappingURL=Game.d.ts.map