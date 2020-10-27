import express, { Application } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../bindings/types";
import { ClientModel } from "./database/models/client/Client.Model";
import bodyParser from "body-parser";
import { reset } from "chalk";

@injectable()
class ExpressManager {
    constructor(@inject(TYPES.Express) private readonly app: Application) {
        express.json();

        const jsonParser = bodyParser.json();
        const urlEncodedParser = bodyParser.urlencoded({ extended: false });

        this.app.get("/test", (req, res) => {
            console.log(`Test route called`);
            res.status(200).send();
        });

        this.app.get("/player/:name", async (req, res) => {
            const name = req.params.name;
            const player = await ClientModel.findPlayer(name);
            if (player == undefined) return res.status(404).send({ message: "Player wasn't found" });

            return res.status(200).send({
                name: player.username,
                xp: player.getXp(),
                correct: player.stats?.correct ?? 0,
                incorrect: player.stats?.incorrect ?? 0,
            });
        });

        this.app.get("/leaders", async (req, res) => {
            const players = await ClientModel.find().sort({ "stats.XP": -1 }).limit(50);

            return res.status(200).send(
                players.map((m) => ({
                    correct: m.stats?.correct ?? 0,
                    incorrect: m.stats?.incorrect ?? 0,
                    XP: m.stats?.XP ?? 0,
                    name: m.username,
                }))
            );
        });

        this.app.post("/register", urlEncodedParser, async (req, res) => {
            if (req.body === undefined) return;

            const username: string | undefined = req.body.username;
            const password: string | undefined = req.body.password;

            if (username === undefined || password === undefined)
                return res.status(400).send({ message: "No username or password given." });
            if (username.length < 4)
                return res.status(400).send({ message: "Username must be at least 4 characters." });
            if (password.length < 4)
                return res.status(400).send({ message: "Password must be at least 4 characters." });

            const trimUsername = username.trim();

            const user = await ClientModel.findOne({ username: { $regex: new RegExp("^" + trimUsername + "$", "i") } });
            if (user !== null) return res.status(403).send({ message: "This username is already in use." });

            await ClientModel.createNewUser(trimUsername, password);

            return res.status(200).send({ message: `Welcome, ${trimUsername}!` });
        });
    }
}

export { ExpressManager };
