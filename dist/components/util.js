"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = {
    VERSION: '0.1.1',
    PI: Math.PI,
    TAU: Math.PI * 2,
    DEG_TO_RAD: 0.0174532925,
    RAD_TO_DEG: 57.2957795,
    SQRT3: Math.sqrt(3),
    TILE: 'tile',
    ENT: 'entity',
    STR: 'structure',
    HEX: 'hex',
    SQR: 'square',
    ABS: 'abstract',
};
var UtilGenerator = (function () {
    function UtilGenerator() {
    }
    UtilGenerator.prototype.generateID = function () {
        return Math.random().toString(36).slice(2) + Date.now();
    };
    return UtilGenerator;
}());
exports.UtilGenerator = UtilGenerator;
