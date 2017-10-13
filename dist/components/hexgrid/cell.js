"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var Cell = (function () {
    function Cell(q, r, s, h) {
        this.q = q || 0;
        this.r = r || 0;
        this.s = s || 0;
        this.h = h || 1;
        this.tile = null;
        this.userData = {};
        this.walkable = true;
        this._calcCost = 0;
        this._priority = 0;
        this._visited = false;
        this._parent = null;
        var util = new util_1.UtilGenerator();
        this.uniqueID = util.generateID();
    }
    Cell.prototype.set = function (q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
        return this;
    };
    Cell.prototype.copy = function (cell) {
        this.q = cell.q;
        this.r = cell.r;
        this.s = cell.s;
        this.h = cell.h;
        this.tile = cell.tile || null;
        this.userData = cell.userData || {};
        this.walkable = cell.walkable;
        return this;
    };
    Cell.prototype.add = function (cell) {
        this.q += cell.q;
        this.r += cell.r;
        this.s += cell.s;
        return this;
    };
    Cell.prototype.equals = function (cell) {
        return this.q === cell.q && this.r === cell.r && this.s === cell.s;
    };
    return Cell;
}());
exports.Cell = Cell;
;
