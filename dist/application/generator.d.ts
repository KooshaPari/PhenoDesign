import type { Composer, DesignError, DesignSpec, GeneratedDesign, Renderer, Result, Validator } from '../domain/types';
export interface GeneratorDeps {
    renderer: Renderer;
    composer: Composer;
    validator: Validator;
}
export interface GeneratorOptions {
    /** Per-step timeout in milliseconds. Default: 30_000. */
    stepTimeout?: number;
    /** Optional AbortSignal for cancellation. */
    signal?: AbortSignal;
}
export declare class DesignGenerator {
    private readonly spec;
    private readonly deps;
    private readonly options;
    private readonly logPrefix;
    constructor(spec: DesignSpec, deps: GeneratorDeps, options?: GeneratorOptions);
    generate(): Promise<Result<GeneratedDesign, DesignError>>;
    /**
     * Wraps a promise with a configurable timeout and optional external
     * AbortSignal.  Throws on timeout (TimeoutError) or cancellation
     * (AbortError) so the caller handles a single error channel.
     */
    private withTimeout;
    private toDesignError;
    private wrapError;
    private logStep;
}
//# sourceMappingURL=generator.d.ts.map