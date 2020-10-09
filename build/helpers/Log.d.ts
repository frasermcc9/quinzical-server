/// <reference types="node" />
import "reflect-metadata";
export default class LogImpl implements Log {
    private readonly console;
    private readonly process;
    constructor(console: Console, process: NodeJS.Process);
    debug(src: string, msg: string): void;
    trace(src: string, msg: string, error?: Error): void;
    info(src: string, msg: string, error?: Error): void;
    warn(src: string, msg: string, error?: Error): void;
    error(src: string, msg: string, error?: Error): void;
    critical(src: string, msg: string, error?: Error): void;
    logo(name: string): void;
    private log;
    private static colorResolver;
    private static formatError;
}
export interface Log {
    debug(src: string, msg: string): void;
    trace(src: string, msg: string, error?: Error): void;
    info(src: string, msg: string, error?: Error): void;
    warn(src: string, msg: string, error?: Error): void;
    error(src: string, msg: string, error?: Error): void;
    critical(src: string, msg: string, error?: Error): void;
    logo(name: string): void;
}
//# sourceMappingURL=Log.d.ts.map