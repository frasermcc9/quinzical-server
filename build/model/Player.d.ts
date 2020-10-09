import { Socket } from "socket.io";
import { SendableQuestionData } from "./Questions/Question";
declare class PlayerImpl implements Player {
    private readonly name;
    private readonly client;
    constructor(name: string, client: Socket);
    get Name(): string;
    sendQuestion(question: SendableQuestionData): void;
    getSocket(): Socket;
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
//# sourceMappingURL=Player.d.ts.map