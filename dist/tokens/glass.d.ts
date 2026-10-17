/** Glass recipe numeric values — mirror css/glass.css --glass-* vars */
export declare const glass: {
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
        /** Top-edge specular gradient stops in px */
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
export type GlassTokens = typeof glass;
//# sourceMappingURL=glass.d.ts.map