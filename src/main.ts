import { IoCContainer } from "./bindings/inversify.config";
import { TYPES } from "./bindings/types";
import { SocketManager } from "./server/Socket";

const socketManager = IoCContainer.get<SocketManager>(TYPES.SocketManager);
