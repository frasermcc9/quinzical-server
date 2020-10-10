"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerImpl = void 0;
const inversify_1 = require("inversify");
let TimerImpl = class TimerImpl {
    constructor() {
        this.running = false;
    }
    start() {
        this.running = true;
        this.started = new Date();
        if (this.callback === undefined || this.remaining === undefined) {
            throw new ReferenceError("Delay and Function was not set for Timer.");
        }
        this.id = setTimeout(this.callback, this.remaining);
    }
    stop() {
        this.running = false;
        clearTimeout(this.id);
        this.remaining = this.delay;
    }
    getTimeLeft() {
        return this.delay - (new Date().getTime() - this.started.getTime());
    }
    getStateRunning() {
        return this.running;
    }
    setFunction(callback) {
        this.callback = callback;
        return this;
    }
    setDelay(delay) {
        this.delay = delay;
        this.remaining = delay;
        return this;
    }
};
TimerImpl = __decorate([
    inversify_1.injectable()
], TimerImpl);
exports.TimerImpl = TimerImpl;
//# sourceMappingURL=Timer.js.map