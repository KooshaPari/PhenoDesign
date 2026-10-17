export { keycap, type KeycapTokens } from './keycap';
export { glass, type GlassTokens } from './glass';
export { typography, type TypographyTokens } from './typography';
export { MATERIALS, type Materials } from './materials';
export { POLYGONS, type PolygonLayer, type PolygonPreset, type Polygons } from './polygons';
export { NEUMORPHISM, type Neumorphism } from './neumorphism';
export declare const designTokens: {
    readonly keycap: {
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
    readonly glass: {
        readonly neo: {
            readonly blur: 16;
            readonly saturate: 1.1;
            readonly fillOpacityLight: 0.72;
            readonly fillOpacityDark: 0.72;
            readonly borderOpacityLight: 0.45;
            readonly borderOpacityDark: 0.08;
            readonly specularOpacityLight: 0.7;
            readonly specularOpacityDark: 0.12;
            readonly borderRadius: 16;
        };
        readonly liquid: {
            readonly blur: 20;
            readonly saturate: 1.4;
            readonly fillOpacityLight: 0.6;
            readonly fillOpacityDark: 0.6;
            readonly borderOpacityLight: 0.55;
            readonly borderOpacityDark: 0.1;
            readonly specularOpacityLight: 0.7;
            readonly specularOpacityDark: 0.12;
            readonly borderRadius: 14;
            readonly specularGradientHeight: "8%";
        };
        readonly mica: {
            readonly blur: 40;
            readonly saturate: 1.8;
            readonly fillOpacityLight: 0.82;
            readonly fillOpacityDark: 0.85;
            readonly borderOpacityLight: undefined;
            readonly borderOpacityDark: undefined;
            readonly borderRadius: 8;
            readonly accentTintOpacity: 0.06;
        };
        readonly nav: {
            readonly blur: 14;
            readonly saturate: 1.2;
            readonly fillOpacity: 0.88;
        };
        readonly badge: {
            readonly blur: 4;
            readonly fillOpacityDark: 0.5;
            readonly fillOpacityLight: 0.7;
        };
    };
    readonly typography: {
        readonly fontDisplay: "'Bricolage Grotesque', 'Montserrat', sans-serif";
        readonly fontBase: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        readonly fontMono: "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace";
        readonly scale: {
            readonly display: {
                readonly size: 96;
                readonly weight: 700;
                readonly letterSpacing: "-0.045em";
                readonly lineHeight: 0.95;
                readonly opsz: 96;
            };
            readonly h1: {
                readonly size: 56;
                readonly weight: 700;
                readonly letterSpacing: "-0.035em";
                readonly lineHeight: 1;
                readonly opsz: 56;
            };
            readonly h2: {
                readonly size: 36;
                readonly weight: 800;
                readonly letterSpacing: "-0.03em";
                readonly lineHeight: 1.1;
            };
            readonly h3: {
                readonly size: 22;
                readonly weight: 600;
                readonly letterSpacing: "-0.015em";
                readonly lineHeight: 1.25;
            };
            readonly body: {
                readonly size: 16;
                readonly weight: 400;
                readonly letterSpacing: "0";
                readonly lineHeight: 1.7;
            };
            readonly small: {
                readonly size: 13;
                readonly weight: 500;
                readonly letterSpacing: "0.01em";
                readonly lineHeight: 1.5;
            };
            readonly mono: {
                readonly size: 13;
                readonly weight: 500;
                readonly letterSpacing: "0";
                readonly lineHeight: 1.6;
            };
            readonly eyebrow: {
                readonly size: 11;
                readonly weight: 600;
                readonly letterSpacing: "0.18em";
                readonly lineHeight: 1.4;
            };
        };
    };
    readonly materials: {
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
    readonly polygons: {
        readonly hexagon: {
            readonly baseShape: "hexagon";
            readonly clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)";
            readonly layers: readonly [{
                readonly rotation: 0;
                readonly scale: 1;
                readonly opacity: 0.34;
            }, {
                readonly rotation: 4;
                readonly scale: 0.94;
                readonly opacity: 0.24;
            }, {
                readonly rotation: -3;
                readonly scale: 0.88;
                readonly opacity: 0.16;
            }];
        };
        readonly diamond: {
            readonly baseShape: "diamond";
            readonly clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
            readonly layers: readonly [{
                readonly rotation: 45;
                readonly scale: 1;
                readonly opacity: 0.3;
            }, {
                readonly rotation: 45;
                readonly scale: 0.92;
                readonly opacity: 0.2;
            }, {
                readonly rotation: 45;
                readonly scale: 0.84;
                readonly opacity: 0.12;
            }];
        };
        readonly pentagon: {
            readonly baseShape: "pentagon";
            readonly clipPath: "polygon(50% 0%, 95% 35%, 78% 100%, 22% 100%, 5% 35%)";
            readonly layers: readonly [{
                readonly rotation: 0;
                readonly scale: 1;
                readonly opacity: 0.3;
            }, {
                readonly rotation: 8;
                readonly scale: 0.92;
                readonly opacity: 0.2;
            }, {
                readonly rotation: -6;
                readonly scale: 0.84;
                readonly opacity: 0.14;
            }, {
                readonly rotation: 0;
                readonly scale: 0.76;
                readonly opacity: 0.08;
            }];
        };
        readonly triangle: {
            readonly baseShape: "triangle";
            readonly clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)";
            readonly layers: readonly [{
                readonly rotation: 0;
                readonly scale: 1;
                readonly opacity: 0.32;
            }, {
                readonly rotation: 180;
                readonly scale: 0.9;
                readonly opacity: 0.18;
            }, {
                readonly rotation: 0;
                readonly scale: 0.8;
                readonly opacity: 0.12;
            }, {
                readonly rotation: 0;
                readonly scale: 0.7;
                readonly opacity: 0.06;
            }];
        };
    };
    readonly neumorphism: {
        readonly lightSource: "315deg";
        readonly extrudeDepth: "4px";
        readonly shadow: "4px 4px 8px rgba(0,0,0,0.5), -4px -4px 8px rgba(126,186,181,0.1)";
        readonly shadowOffset: "4px";
        readonly highlightOffset: "-4px";
    };
};
export type DesignTokens = typeof designTokens;
//# sourceMappingURL=index.d.ts.map