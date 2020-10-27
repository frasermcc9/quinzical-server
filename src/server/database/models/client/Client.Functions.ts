import { ClientModel, IClientDocument, IClientModel } from "./Client.Model";

import { hash, compare } from "bcrypt";
import { HookNextFunction } from "mongoose";
const SALT_ROUNDS = 10;

//#region INSTANCE METHODS

export async function saveAndUpdate(this: IClientDocument, next: HookNextFunction): Promise<void> {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;

        if (this.isModified("password")) {
            const result = await hash(this.password, SALT_ROUNDS);
            this.password = result;
        }

        next();
    }
}

export async function verifyPassword(this: IClientDocument, given: string): Promise<boolean> {
    const result = await compare(given, this.password);
    return result;
}

export function getXp(this: IClientDocument): number {
    return this?.stats?.XP ?? 0;
}

export async function addXp(this: IClientDocument, amount: number): Promise<void> {
    verifyData(this);
    this.stats!.XP = (this.stats?.XP ?? 0) + amount;
    await this.save();
}

export async function addCorrect(this: IClientDocument, amount: number): Promise<void> {
    verifyData(this);
    this.stats!.correct = (this.stats?.correct ?? 0) + amount;
    await this.save();
}

export async function addIncorrect(this: IClientDocument, amount: number): Promise<void> {
    verifyData(this);
    this.stats!.incorrect = (this.stats?.incorrect ?? 0) + amount;
    await this.save();
}

function verifyData(document: IClientDocument) {
    if (document.stats == undefined) {
        document.stats = { XP: 0, correct: 0, incorrect: 0 };
    }
    if (document.stats.XP == undefined) {
        document.stats.XP = 0;
    }
    if (document.stats.correct == undefined) {
        document.stats.correct = 0;
    }
    if (document.stats.incorrect == undefined) {
        document.stats.incorrect = 0;
    }
}

//#endregion

//#region MODEL METHODS

export async function createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument> {
    const newClient = this.create({
        username: username,
        password: password,
        stats: { XP: 0, correct: 0, incorrect: 0 },
    });
    return newClient;
}

export async function findPlayer(this: IClientModel, name: string): Promise<IClientDocument | null> {
    return await ClientModel.findOne({
        username: { $regex: new RegExp("^" + name.trim() + "$", "i") },
    });
}

//#endregion
