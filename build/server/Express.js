"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressManager = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const types_1 = require("../bindings/types");
const Client_Model_1 = require("./database/models/client/Client.Model");
const body_parser_1 = __importDefault(require("body-parser"));
let ExpressManager = class ExpressManager {
    constructor(app) {
        this.app = app;
        express_1.default.json();
        const jsonParser = body_parser_1.default.json();
        const urlEncodedParser = body_parser_1.default.urlencoded({ extended: false });
        this.app.get("/test", (req, res) => {
            console.log(`Test route called`);
            res.status(200).send();
        });
        this.app.get("/player/:name", async (req, res) => {
            const name = req.params.name;
            const player = await Client_Model_1.ClientModel.findPlayer(name);
            if (player == undefined)
                return res.status(404).send({ message: "Player wasn't found" });
            return res.status(200).send({
                name: player.username,
                xp: player.getXp(),
                correct: player.stats?.correct ?? 0,
                incorrect: player.stats?.incorrect ?? 0,
            });
        });
        this.app.get("/leaders", async (req, res) => {
            const players = await Client_Model_1.ClientModel.find().sort({ "stats.XP": -1 }).limit(50);
            return res.status(200).send(players.map((m) => ({
                correct: m.stats?.correct ?? 0,
                incorrect: m.stats?.incorrect ?? 0,
                XP: m.stats?.XP ?? 0,
                name: m.username,
            })));
        });
        this.app.post("/register", urlEncodedParser, async (req, res) => {
            if (req.body === undefined)
                return;
            const username = req.body.username;
            const password = req.body.password;
            if (username === undefined || password === undefined)
                return res.status(400).send({ message: "No username or password given." });
            if (username.length < 4)
                return res.status(400).send({ message: "Username must be at least 4 characters." });
            if (password.length < 4)
                return res.status(400).send({ message: "Password must be at least 4 characters." });
            const trimUsername = username.trim();
            const user = await Client_Model_1.ClientModel.findOne({ username: { $regex: new RegExp("^" + trimUsername + "$", "i") } });
            if (user !== null)
                return res.status(403).send({ message: "This username is already in use." });
            await Client_Model_1.ClientModel.createNewUser(trimUsername, password);
            return res.status(200).send({ message: `Welcome, ${trimUsername}!` });
        });
    }
};
ExpressManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Express)),
    __metadata("design:paramtypes", [Function])
], ExpressManager);
exports.ExpressManager = ExpressManager;
//# sourceMappingURL=Express.js.map