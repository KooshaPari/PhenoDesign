export class DesignGenerator {
    spec;
    deps;
    options;
    logPrefix = '[DesignGenerator]';
    constructor(spec, deps, options = {}) {
        this.spec = spec;
        this.deps = deps;
        this.options = options;
    }
    async generate() {
        const timeout = this.options.stepTimeout ?? 30_000;
        const signal = this.options.signal;
        try {
            // ── validate ──────────────────────────────────────────────────
            this.logStep('validate:start', { specId: this.spec.id });
            const validationResult = await this.withTimeout(this.deps.validator.validate(this.spec), timeout, signal, 'validate');
            if (!validationResult.ok) {
                this.logStep('validate:failed', validationResult.error);
                return {
                    ok: false,
                    error: this.wrapError(validationResult.error, 'validate'),
                };
            }
            this.logStep('validate:complete', {
                warnings: validationResult.value.warnings.length,
            });
            // ── compose ───────────────────────────────────────────────────
            this.logStep('compose:start', { specId: this.spec.id });
            const composeResult = await this.withTimeout(this.deps.composer.compose(this.spec), timeout, signal, 'compose');
            if (!composeResult.ok) {
                return { ok: false, error: this.wrapError(composeResult.error, 'compose') };
            }
            this.logStep('compose:complete', {
                sectionCount: composeResult.value.sections.length,
            });
            // ── render ────────────────────────────────────────────────────
            this.logStep('render:start', { specId: this.spec.id });
            const renderResult = await this.withTimeout(this.deps.renderer.render({
                spec: this.spec,
                layout: composeResult.value,
                warnings: validationResult.value.warnings,
            }), timeout, signal, 'render');
            if (!renderResult.ok) {
                return { ok: false, error: this.wrapError(renderResult.error, 'render') };
            }
            this.logStep('render:complete', {
                format: renderResult.value.format,
                outputId: renderResult.value.id,
            });
            return { ok: true, value: renderResult.value };
        }
        catch (err) {
            return {
                ok: false,
                error: this.toDesignError(err, 'unknown'),
            };
        }
    }
    // ── helpers ─────────────────────────────────────────────────────
    /**
     * Wraps a promise with a configurable timeout and optional external
     * AbortSignal.  Throws on timeout (TimeoutError) or cancellation
     * (AbortError) so the caller handles a single error channel.
     */
    async withTimeout(promise, ms, signal, step) {
        // Fast-path: already aborted
        if (signal?.aborted) {
            throw Object.assign(new DOMException(`Step "${step}" cancelled before start`, 'AbortError'), { step });
        }
        const controller = new AbortController();
        const onParentAbort = () => {
            controller.abort(signal?.reason);
        };
        if (signal) {
            signal.addEventListener('abort', onParentAbort, { once: true });
        }
        const timer = setTimeout(() => {
            controller.abort(Object.assign(new DOMException(`Step "${step}" timed out after ${ms}ms`, 'TimeoutError'), { step }));
        }, ms);
        // Enrich rejections from the original promise with step context
        const enriched = promise.catch((err) => {
            const enriched = err instanceof Error ? err : new Error(String(err));
            enriched.step = step;
            throw enriched;
        });
        try {
            return await Promise.race([
                enriched,
                new Promise((_, reject) => {
                    controller.signal.addEventListener('abort', () => {
                        reject(controller.signal.reason);
                    }, { once: true });
                }),
            ]);
        }
        finally {
            clearTimeout(timer);
            if (signal) {
                signal.removeEventListener('abort', onParentAbort);
            }
        }
    }
    toDesignError(err, step) {
        if (err instanceof DOMException) {
            const typed = err;
            if (err.name === 'TimeoutError') {
                return {
                    code: 'TIMEOUT',
                    message: err.message,
                    step: typed.step ?? step,
                    hint: 'The generation step took too long. Try a simpler design spec or increase the stepTimeout option.',
                };
            }
            if (err.name === 'AbortError') {
                return {
                    code: 'CANCELLED',
                    message: err.message,
                    step: typed.step ?? step,
                    hint: 'The operation was cancelled by the caller.',
                };
            }
        }
        // Generic / unexpected error — try to extract step from enriched error
        const enriched = err;
        const actualStep = enriched.step ?? step;
        return {
            code: 'INTERNAL_ERROR',
            message: `Step "${actualStep}" failed: ${err instanceof Error ? err.message : String(err)}`,
            cause: err instanceof Error ? err.message : String(err),
            step: actualStep,
        };
    }
    wrapError(err, step) {
        return {
            ...err,
            step: err.step ?? step,
            hint: err.hint ?? `The "${step}" step failed. Check the error details above.`,
        };
    }
    logStep(step, payload) {
        console.info(this.logPrefix, step, payload);
    }
}
