"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('createBoard', function () {
    var grid = new index_1.Grid({
        rings: 5,
        cellSize: 10
    });
    _this.board = new index_1.Board(grid);
    it('should sum given numbers', function () {
        expect(_this.board).toBe(undefined);
    });
});
