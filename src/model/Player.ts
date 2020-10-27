import { Socket } from "socket.io";
import { IClientDocument } from "../server/database/models/client/Client.Model";
import { Question, SendableQuestionData } from "./Questions/Question";

class PlayerImpl implements Player {
    private points: number = 0;
    private mostRecentPoints: number = 0;
    private pointsArray: number[] = [];

    constructor(private readonly name: string, private readonly client: Socket) {}

    signalGameOver(winners: PlayerSummary[], yourPoints: number): void {
        this.client.emit("gameFinished", winners, yourPoints);
    }

    signalRoundOver(solution: string, playerPoints: number, topPlayers: PlayerSummary[]): void {
        this.client.emit("roundOver", solution, playerPoints, topPlayers, this.mostRecentPoints);
        this.mostRecentPoints = 0;
    }

    signalPlayerCountChange(players: string[], xp: number[], max: number): void {
        this.client.emit("playersChange", players, xp, max);
    }

    signalNewQuestion(question: SendableQuestionData): void {
        this.client.emit("newQuestion", question.question, question.prompt);
    }

    signalGameStart(timer: number): void {
        this.client.emit("gameStart", timer);
    }

    signalCorrectnessOfAnswer(correct: boolean, points: number): void {
        this.client.emit("answerResult", correct);
        this.mostRecentPoints = points;
        this.pointsArray.push(points);
    }

    signalGameInterrupt(): void {
        this.client.emit("interrupt");
    }

    signalKicked(): void {
        this.client.emit("kicked");
    }

    getSocket() {
        return this.client;
    }

    increasePoints(pointsToAdd: number): void {
        this.points += pointsToAdd;
    }

    setMostRecentPoints(n: number): void {
        this.mostRecentPoints = n;
    }

    get Name(): string {
        return this.name;
    }

    get Points(): number {
        return this.points;
    }

    playerGameStats(): [correct: number, incorrect: number] {
        return [this.pointsArray.filter((p) => !p).length, this.pointsArray.filter((p) => p).length];
    }
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

    playerGameStats(): [correct: number, incorrect: number]
}

interface PlayerSummary {
    Name: string;

    Points: number;
}

interface PlayerFactory extends Function {
    (name: string, client: Socket): Player;
}

export { PlayerConstructor, PlayerImpl, Player, PlayerFactory, PlayerSummary };
