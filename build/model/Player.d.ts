import { Socket } from "socket.io";
import { SendableQuestionData } from "./Questions/Question";
declare class PlayerImpl implements Player {
    private readonly name;
    private readonly client;
    private points;
    private mostRecentPoints;
    private pointsArray;
    constructor(name: string, client: Socket);
    signalGameOver(winners: PlayerSummary[], yourPoints: number): void;
    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void;
    signalPlayerCountChange(players: string[], xp: number[], max: number): void;
    signalNewQuestion(question: SendableQuestionData): void;
    signalGameStart(timer: number): void;
    signalCorrectnessOfAnswer(correct: boolean, points: number): void;
    signalGameInterrupt(): void;
    signalKicked(): void;
    getSocket(): Socket;
    increasePoints(pointsToAdd: number): void;
    setMostRecentPoints(n: number): void;
    get Name(): string;
    get Points(): number;
    playerGameStats(): [correct: number, incorrect: number];
}
interface PlayerConstructor {
    new (name: string, client: Socket): PlayerImpl;
}
interface Player extends PlayerSummary {
    signalKicked(): void;
    signalNewQuestion(question: SendableQuestionData): void;
    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void;
    signalGameOver(winners: PlayerSummary[], yourPoints: number): void;
    signalPlayerCountChange(players: string[], xp: number[], max: number): void;
    signalCorrectnessOfAnswer(correct: boolean, points: number): void;
    signalGameStart(timer: number): void;
    signalGameInterrupt(): void;
    getSocket(): Socket;
    increasePoints(pointsToAdd: number): void;
    setMostRecentPoints(n: number): void;
    playerGameStats(): [correct: number, incorrect: number];
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