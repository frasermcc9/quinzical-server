import { Socket } from "socket.io";
import { Question, SendableQuestionData } from "./Questions/Question";

class PlayerImpl implements Player {
    private points: number = 0;

    constructor(private readonly name: string, private readonly client: Socket) {}

    signalGameOver(winners: PlayerSummary[]): void {
        this.client.emit("gameFinished", winners);
    }

    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void {
        this.client.emit("roundOver", solution, playerPoints, topPlayers);
    }

    signalPlayerCountChange(players: string[]): void {
        this.client.emit("playersChange", players);
    }

    signalNewQuestion(question: SendableQuestionData): void {
        this.client.emit("newQuestion", question);
    }

    signalGameStart(): void {
        this.client.emit("gameStart");
    }

    get Name(): string {
        return this.name;
    }

    get Points(): number {
        return this.points;
    }

    getSocket() {
        return this.client;
    }

    increasePoints(pointsToAdd: number): void {
        this.points += pointsToAdd;
    }
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
