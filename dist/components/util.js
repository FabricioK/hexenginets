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
    UtilGenerator.prototype.randomInt = function (min, max) {
        if (!max) {
            return (Math.random() * min) - (min * 0.5) | 0;
        }
        return (Math.random() * (max - min + 1) + min) | 0;
    };
    UtilGenerator.prototype.randomizeRGB = function (base, range) {
        var rgb = base.split(',');
        var color = 'rgb(';
        var i, c;
        range = this.randomInt(range);
        for (i = 0; i < 3; i++) {
            c = parseInt(rgb[i]) + range;
            if (c < 0)
                c = 0;
            else if (c > 255)
                c = 255;
            color += c + ',';
        }
        color = color.substring(0, color.length - 1);
        color += ')';
        return color;
    };
    return UtilGenerator;
}());
exports.UtilGenerator = UtilGenerator;
