export declare var util: {
    VERSION: string;
    PI: number;
    TAU: number;
    DEG_TO_RAD: number;
    RAD_TO_DEG: number;
    SQRT3: number;
    TILE: string;
    ENT: string;
    STR: string;
    HEX: string;
    SQR: string;
    ABS: string;
};
export declare class UtilGenerator {
    generateID(): string;
    randomInt(min: any, max?: any): number;
    randomizeRGB(base: any, range: any): string;
}
