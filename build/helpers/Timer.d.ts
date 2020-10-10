declare class TimerImpl implements Timer {
    private id?;
    private started?;
    private running;
    private callback?;
    private delay?;
    private remaining?;
    start(): void;
    stop(): void;
    getTimeLeft(): number;
    getStateRunning(): boolean;
    setFunction(callback: () => void): this;
    setDelay(delay: number): this;
}
interface Timer {
    start(): void;
    stop(): void;
    getTimeLeft(): number;
    getStateRunning(): boolean;
    setFunction(callback: () => void): this;
    setDelay(delay: number): this;
}
export { Timer, TimerImpl };
//# sourceMappingURL=Timer.d.ts.map