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
var LogImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chalk = require("chalk");
const figlet = require("figlet");
const inversify_1 = require("inversify");
let LogImpl = LogImpl_1 = class LogImpl {
    constructor(console, process) {
        this.console = console;
        this.process = process;
    }
    debug(src, msg) {
        this.log("DEBUG", src, msg);
    }
    trace(src, msg, error) {
        this.log("TRACE", src, msg, error);
    }
    info(src, msg, error) {
        this.log("INFO", src, msg, error);
    }
    warn(src, msg, error) {
        this.log("WARN", src, msg, error);
    }
    error(src, msg, error) {
        this.log("ERROR", src, msg, error);
    }
    critical(src, msg, error) {
        this.log("CRITICAL", src, msg, error);
        this.process.exit();
    }
    logo(name) {
        this.console.log(chalk.blue(figlet.textSync(name)));
        this.console.log();
    }
    log(severity, src, msg, error) {
        const c = LogImpl_1.colorResolver(severity);
        this.console.log(c.bold(`[${severity}] `) +
            c(`${src} - ${msg}${LogImpl_1.formatError(error)}`));
    }
    static colorResolver(severity) {
        switch (severity) {
            case "DEBUG":
                return chalk.grey;
            case "TRACE":
                return chalk.whiteBright;
            case "INFO":
                return chalk.green;
            case "WARN":
                return chalk.yellow;
            case "ERROR":
                return chalk.red;
            default:
                return chalk.whiteBright.bgRed;
        }
    }
    static formatError(error) {
        if (error != null) {
            const stack = error.stack.replace(error.name + ": " + error.message + "\n", "");
            return ("\r\n" +
                chalk.bold(error.name) +
                ": " +
                error.message +
                "\r\n" +
                chalk.gray(stack));
        }
        else {
            return "";
        }
    }
};
LogImpl = LogImpl_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("console")),
    __param(1, inversify_1.inject("process")),
    __metadata("design:paramtypes", [Object, Object])
], LogImpl);
exports.default = LogImpl;
//# sourceMappingURL=Log.js.map