"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Board = (function () {
    function Board(grid) {
        this.group = new THREE.Object3D();
        var mat = new THREE.LineBasicMaterial({
            color: 0x000000,
            opacity: 0.3
        });
        this.overlay = new THREE.Object3D();
        this.group.add(this.overlay);
        this.setGrid(grid);
    }
    Board.prototype.setGrid = function (newGrid) {
        this.group.remove(this.tileGroup);
        if (this.grid && newGrid !== this.grid) {
            this.removeAllTiles();
            this.tiles.forEach(function (t) {
                this.grid.remove(t.cell);
                t.dispose();
            });
            this.grid.dispose();
        }
        this.grid = newGrid;
        this.tiles = [];
        this.tileGroup = new THREE.Object3D();
        this.group.add(this.tileGroup);
    };
    Board.prototype.removeAllTiles = function () {
        if (!this.tileGroup)
            return;
        var tiles = this.tileGroup.children;
        for (var i = 0; i < tiles.length; i++) {
            this.tileGroup.remove(tiles[i]);
        }
    };
    Board.prototype.generateOverlay = function (size) {
        var mat = new THREE.LineBasicMaterial({
            color: 0x000000,
            opacity: 0.3
        });
        if (this.overlay) {
            this.group.remove(this.overlay);
        }
        this.overlay = new THREE.Object3D();
        this.grid.generateOverlay(size, this.overlay, mat);
        this.group.add(this.overlay);
    };
    return Board;
}());
exports.Board = Board;
