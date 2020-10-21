import { IClientDocument, IClientModel } from "./Client.Model";

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

//#endregion

//#region MODEL METHODS

export async function createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument> {
    const newClient = this.create({ username: username, password: password });
    return newClient;
}

//#endregion
