/**
 * Keycap Palette — Design Tokens
 *
 * Programmatic access to the Phenotype design system colors.
 * For CSS usage, import the CSS files directly.
 */
export declare const keycap: {
    readonly accent: "#7ebab5";
    readonly accentHover: "#95ccc8";
    readonly accentActive: "#6aa8a3";
    readonly accentDim: "#569691";
    readonly accentContrast: "#4a9c97";
    readonly slate: "#353a40";
    readonly dark: {
        readonly bg: "#090a0c";
        readonly bgAlt: "#0e1014";
        readonly bgSoft: "#14171b";
        readonly bgElv: "#1a1e24";
        readonly text1: "#f6f5f5";
        readonly text2: "#a8adb5";
        readonly text3: "#6b7280";
        readonly divider: "#1f2329";
        readonly gutter: "#0c0d0f";
        readonly codeBlockBg: "#060708";
    };
    readonly light: {
        readonly bg: "#f8f9fa";
        readonly bgAlt: "#f0f1f3";
        readonly bgSoft: "#e8eaed";
        readonly bgElv: "#ffffff";
        readonly text1: "#1a1c1e";
        readonly text2: "#4a4f57";
        readonly text3: "#6b7280";
        readonly divider: "#d4d7dc";
        readonly gutter: "#e8eaed";
        readonly codeBlockBg: "#f0f1f3";
    };
    readonly font: {
        readonly base: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        readonly mono: "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace";
    };
};
export type KeycapTokens = typeof keycap;
//# sourceMappingURL=keycap.d.ts.map