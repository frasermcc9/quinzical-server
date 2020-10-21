import { IClientDocument, IClientModel } from "./Client.Model";
import { HookNextFunction } from "mongoose";
export declare function saveAndUpdate(this: IClientDocument, next: HookNextFunction): Promise<void>;
export declare function verifyPassword(this: IClientDocument, given: string): Promise<boolean>;
export declare function createNewUser(this: IClientModel, username: string, password: string): Promise<IClientDocument>;
//# sourceMappingURL=Client.Functions.d.ts.map