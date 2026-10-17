export declare const MATERIALS: {
    readonly windows: {
        readonly base: "mica";
        readonly acrylic: "rgba(9,10,12,0.7) + backdrop-blur(20px) + saturate(180%)";
        readonly card: "rgba(126,186,181,0.08) + border: 1px solid rgba(126,186,181,0.15)";
    };
    readonly macos: {
        readonly base: "liquid-glass";
        readonly vibrancy: "rgba(126,186,181,0.12) + backdrop-filter: blur(40px) saturate(200%) brightness(1.1)";
        readonly chromaShift: "1px rgba(126,186,181,0.3)";
    };
    readonly android: {
        readonly base: "material-you";
        readonly surface: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)";
        readonly card: "rgba(126,186,181,0.06) + border: 1px solid rgba(126,186,181,0.1)";
    };
    readonly web: {
        readonly base: "glassmorphism";
        readonly panel: "rgba(9,10,12,0.6) + backdrop-filter: blur(16px) saturate(150%)";
        readonly border: "1px solid rgba(126,186,181,0.2)";
    };
};
export type Materials = typeof MATERIALS;
//# sourceMappingURL=materials.d.ts.map