import { PlayerFactory } from "./Player";
import { Question } from "./Question";
import { Socket } from "socket.io";
declare class GameImpl implements Game {
    private readonly playerFactory;
    private players;
    private code;
    private questionsCompleted;
    private questions;
    private timeToAnswer;
    private maxPlayers;
    private static default_questions;
    private static initial_questions_answered;
    private static default_time_to_answer;
    private static default_max_players;
    constructor(playerFactory: PlayerFactory);
    getNextQuestion(): Question;
    emitQuestionToPlayers(): void;
    addPlayer(name: string, player: Socket): boolean;
    setGameSettings(settings: GameSettings): void;
    get Code(): string;
    set Code(value: string);
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
//# sourceMappingURL=Game.d.ts.map