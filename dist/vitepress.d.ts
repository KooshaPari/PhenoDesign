/**
 * VitePress theme helper for Phenotype projects.
 *
 * Usage in your .vitepress/theme/index.ts:
 *
 *   import DefaultTheme from 'vitepress/theme'
 *   import '@phenotype/design/css/keycap-palette.css'
 *   // or: import '@phenotype/design/css/vitepress-theme.css'
 *   export default { extends: DefaultTheme }
 */
export declare const vitepressMarkdownTheme: {
    readonly light: "github-light";
    readonly dark: "vitesse-dark";
};
export declare const vitepressConfig: {
    appearance: "dark";
    markdown: {
        lineNumbers: boolean;
        theme: {
            readonly light: "github-light";
            readonly dark: "vitesse-dark";
        };
    };
};
//# sourceMappingURL=vitepress.d.ts.map