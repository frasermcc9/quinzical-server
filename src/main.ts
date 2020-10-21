import { EventEmitter } from "events";
import { decorate, injectable } from "inversify";
import { IoCContainer } from "./bindings/inversify.config";
import { TYPES } from "./bindings/types";
import { ClientModel } from "./server/database/models/client/Client.Model";
import { SocketManager } from "./server/Socket";
import { connect } from "./server/database/Database";
import express, { Application } from "express";
import { createServer, Server } from "http";
import { ExpressManager } from "./server/Express";

decorate(injectable(), EventEmitter);

const application: Application = express();
const server = createServer(application);
server.listen(7373, () => {
    console.log("Server Listening on port 7373");
});

IoCContainer.bind<Server>(TYPES.Server).toConstantValue(server);
IoCContainer.bind<Application>(TYPES.Express).toConstantValue(application);

const socketManager = IoCContainer.get<SocketManager>(TYPES.SocketManager);
const expressManager = IoCContainer.get<ExpressManager>(TYPES.ExpressManager);

connect();
