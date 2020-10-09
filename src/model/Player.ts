import { Socket } from "socket.io";
import { Question, SendableQuestionData } from "./Questions/Question";

class PlayerImpl implements Player {
    constructor(private readonly name: string, private readonly client: Socket) {}

    get Name(): string {
        return this.name;
    }

    sendQuestion(question: SendableQuestionData): void {
        this.client.emit("newQuestion", question);
    }

    getSocket() {
        return this.client;
    }
}

interface PlayerConstructor {
    new (name: string, client: Socket): PlayerImpl;
}

interface Player {
    sendQuestion(question: SendableQuestionData): void;

    Name: string;

    getSocket(): Socket;
}

interface PlayerFactory extends Function {
    (name: string, client: Socket): Player;
}

export { PlayerConstructor, PlayerImpl, Player, PlayerFactory };
