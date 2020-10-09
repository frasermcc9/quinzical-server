import { Socket } from "socket.io";
import { Question, SendableQuestionData } from "./Question";

class PlayerImpl implements Player {
    constructor(private readonly name: string, private readonly client: Socket) {}

    sendQuestion(question: SendableQuestionData): void {
        this.client.emit("newQuestion", question);
    }
}

interface PlayerConstructor {
    new (name: string, client: Socket): PlayerImpl;
}

interface Player {
    sendQuestion(question: SendableQuestionData): void;
}

interface PlayerFactory extends Function {
    (name: string, client: Socket): Player;
}

export { PlayerConstructor, PlayerImpl, Player, PlayerFactory };
