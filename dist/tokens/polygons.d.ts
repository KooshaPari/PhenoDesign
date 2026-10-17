export type PolygonLayer = {
    readonly rotation: number;
    readonly scale: number;
    readonly opacity: number;
};
export type PolygonPreset = {
    readonly baseShape: 'hexagon' | 'diamond' | 'pentagon' | 'triangle';
    readonly clipPath: string;
    readonly layers: readonly PolygonLayer[];
};
export declare const POLYGONS: {
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
export type Polygons = typeof POLYGONS;
//# sourceMappingURL=polygons.d.ts.map