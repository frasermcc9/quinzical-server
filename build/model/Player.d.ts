import { Socket } from "socket.io";
import { SendableQuestionData } from "./Questions/Question";
declare class PlayerImpl implements Player {
    private readonly name;
    private readonly client;
    private points;
    constructor(name: string, client: Socket);
    signalGameOver(winners: PlayerSummary[]): void;
    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void;
    signalPlayerCountChange(players: string[]): void;
    signalNewQuestion(question: SendableQuestionData): void;
    signalGameStart(): void;
    get Name(): string;
    get Points(): number;
    getSocket(): Socket;
    increasePoints(pointsToAdd: number): void;
}
interface PlayerConstructor {
    new (name: string, client: Socket): PlayerImpl;
}
interface Player extends PlayerSummary {
    signalNewQuestion(question: SendableQuestionData): void;
    getSocket(): Socket;
    signalGameStart(): void;
    increasePoints(pointsToAdd: number): void;
    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void;
    signalGameOver(winners: PlayerSummary[]): void;
    signalPlayerCountChange(players: string[]): void;
}
interface PlayerSummary {
    Name: string;
    Points: number;
}
interface PlayerFactory extends Function {
    (name: string, client: Socket): Player;
}
export { PlayerConstructor, PlayerImpl, Player, PlayerFactory, PlayerSummary };
//# sourceMappingURL=Player.d.ts.map