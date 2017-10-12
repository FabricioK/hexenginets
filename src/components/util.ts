
export var util = { // eslint-disable-line
    VERSION: '0.1.1',

    PI: Math.PI,
    TAU: Math.PI * 2,
    DEG_TO_RAD: 0.0174532925,
    RAD_TO_DEG: 57.2957795,
    SQRT3: Math.sqrt(3), // used often in hex conversions

    // useful enums for type checking. change to whatever fits your game. these are just examples
    TILE: 'tile', // visual representation of a grid cell
    ENT: 'entity', // dynamic things
    STR: 'structure', // static things

    HEX: 'hex',
    SQR: 'square',
    ABS: 'abstract',
};

export class UtilGenerator {
    generateID(): string {
        return Math.random().toString(36).slice(2) + Date.now();
    }
}