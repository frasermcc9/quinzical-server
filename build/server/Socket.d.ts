import { Log } from "../helpers/Log";
import { GameRegister } from "../model/GameRegister";
declare class SocketManagerImpl {
    private readonly log;
    private readonly gameRegister;
    static readonly PORT = 7373;
    private ioServer;
    constructor(log: Log, gameRegister: GameRegister);
    private listenToClient;
}
interface SocketManager {
}
export { SocketManager, SocketManagerImpl };
//# sourceMappingURL=Socket.d.ts.map