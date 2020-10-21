import { model, Document, Model, HookNextFunction } from "mongoose";

import ClientSchema from "./Client.Schema";

export const ClientModel = model<IClientDocument>("players", ClientSchema) as IClientModel;

export interface IClient {
    username: string;
    password: string;

    dateOfEntry?: Date;
    lastUpdated?: Date;
}
export interface IClientDocument extends IClient, Document {
    saveAndUpdate(this: IClientDocument, next: HookNextFunction): Promise<void>;
    verifyPassword(this: IClientDocument, given: string): Promise<boolean>;
}
export interface IClientModel extends Model<IClientDocument> {
    createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument>;
}
