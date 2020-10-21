/// <reference types="node" />
import { Log } from "../helpers/Log";
import { GameRegister } from "../model/GameRegister";
import { Server } from "http";
declare class SocketManagerImpl {
    private readonly log;
    private readonly gameRegister;
    private readonly server;
    private ioServer;
    constructor(log: Log, gameRegister: GameRegister, server: Server);
    private postAuthenticate;
    private authenticate;
}
interface SocketManager {
}
export { SocketManager, SocketManagerImpl };
//# sourceMappingURL=Socket.d.ts.map