import { Log } from "../helpers/Log";
import { IdGenerationContext } from "../util/strategies/IdGenerator";
import { Game } from "./Game";
declare class GameRegisterImpl implements GameRegister {
    private readonly log;
    private readonly idGenerator;
    private readonly gameFactory;
    static alphabet: string;
    private gameMap;
    constructor(log: Log, idGenerator: IdGenerationContext, gameFactory: (type: string) => Game);
    getPublicGames(): Game[];
    generateGame(): Game;
    findGame(gameId: string): Game | undefined;
}
interface GameRegister {
    generateGame(): Game;
    findGame(gameId: string): Game | undefined;
    getPublicGames(): Game[];
}
export { GameRegister, GameRegisterImpl };
//# sourceMappingURL=GameRegister.d.ts.map