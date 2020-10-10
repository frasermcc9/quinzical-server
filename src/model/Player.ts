import { Socket } from "socket.io";
import { Question, SendableQuestionData } from "./Questions/Question";

class PlayerImpl implements Player {
    private points: number = 0;

    constructor(private readonly name: string, private readonly client: Socket) {}

    signalGameOver(winners: { name: string; points: number }[]): void {
        this.client.emit("gameFinished", winners);
    }

    signalRoundOver(solution: string): void {
        this.client.emit("roundOver", solution);
    }

    signalPlayerCountChange(players: string[]): void {
        this.client.emit("playerJoin", players);
    }

    get Name(): string {
        return this.name;
    }

    get Points(): number {
        return this.points;
    }

    sendQuestion(question: SendableQuestionData): void {
        this.client.emit("newQuestion", question);
    }

    getSocket() {
        return this.client;
    }

    signalGameStart(): void {
        this.client.emit("gameStart");
    }

    increasePoints(pointsToAdd: number): void {
        this.points += pointsToAdd;
    }
}

interface PlayerConstructor {
    new (name: string, client: Socket): PlayerImpl;
}

interface Player {
    sendQuestion(question: SendableQuestionData): void;

    getSocket(): Socket;

    signalGameStart(): void;

    increasePoints(pointsToAdd: number): void;

    signalRoundOver(solution: string): void;

    signalGameOver(winners: { name: string; points: number }[]): void;

    signalPlayerCountChange(players: string[]): void

    Name: string;

    Points: number;
}

interface PlayerFactory extends Function {
    (name: string, client: Socket): Player;
}

export { PlayerConstructor, PlayerImpl, Player, PlayerFactory };
