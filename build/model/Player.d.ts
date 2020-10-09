import { Socket } from "socket.io";
import { SendableQuestionData } from "./Question";
declare class PlayerImpl implements Player {
    private readonly name;
    private readonly client;
    constructor(name: string, client: Socket);
    sendQuestion(question: SendableQuestionData): void;
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
//# sourceMappingURL=Player.d.ts.map