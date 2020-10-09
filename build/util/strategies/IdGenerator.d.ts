declare class IdGeneratorContextImpl implements IdGenerationContext {
    generateIdStrategy(type: "FIXED" | "RANDOM"): IdGenerationStrategy;
}
interface IdGenerationStrategy {
    generateId(): string;
}
interface IdGenerationContext {
    generateIdStrategy(type: "FIXED" | "RANDOM"): IdGenerationStrategy;
}
export { IdGenerationContext, IdGeneratorContextImpl };
//# sourceMappingURL=IdGenerator.d.ts.map