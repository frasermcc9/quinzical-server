import { IClientDocument, IClientModel } from "./Client.Model";
import { HookNextFunction } from "mongoose";
export declare function saveAndUpdate(this: IClientDocument, next: HookNextFunction): Promise<void>;
export declare function verifyPassword(this: IClientDocument, given: string): Promise<boolean>;
export declare function getXp(this: IClientDocument): number;
export declare function addXp(this: IClientDocument, amount: number): Promise<void>;
export declare function addCorrect(this: IClientDocument, amount: number): Promise<void>;
export declare function addIncorrect(this: IClientDocument, amount: number): Promise<void>;
export declare function createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument>;
export declare function findPlayer(this: IClientModel, name: string): Promise<IClientDocument | null>;
//# sourceMappingURL=Client.Functions.d.ts.map