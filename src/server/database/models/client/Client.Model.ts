import { model, Document, Model, HookNextFunction } from "mongoose";

import ClientSchema from "./Client.Schema";

export const ClientModel = model<IClientDocument>("players", ClientSchema) as IClientModel;

export interface IClient {
    username: string;
    password: string;

    stats?: { XP?: number; correct?: number; incorrect?: number };

    dateOfEntry?: Date;
    lastUpdated?: Date;
}
export interface IClientDocument extends IClient, Document {
    saveAndUpdate(this: IClientDocument, next: HookNextFunction): Promise<void>;
    verifyPassword(this: IClientDocument, given: string): Promise<boolean>;
    getXp(this: IClientDocument): number;
    addXp(this: IClientDocument, amount: number): Promise<void>;
    addCorrect(this: IClientDocument, amount: number): Promise<void>;
    addIncorrect(this: IClientDocument, amount: number): Promise<void>;

}
export interface IClientModel extends Model<IClientDocument> {
    createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument>;
    findPlayer(this: IClientModel, name: string): Promise<IClientDocument | null>
}
