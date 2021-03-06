"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Board = (function () {
    function Board(grid) {
        this.group = new THREE.Object3D();
        var mat = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            opacity: 0.3
        });
        this.overlay = new THREE.Object3D();
        this.group.add(this.overlay);
        this.setGrid(grid);
        this.generateOverlay(grid.cellSize);
        this.generateTilemap();
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
    Board.prototype.generateTilemap = function () {
        this.reset();
        var tiles = this.grid.generateTiles();
        this.tiles = tiles;
        this.tileGroup = new THREE.Object3D();
        for (var i = 0; i < tiles.length; i++) {
            this.tileGroup.add(tiles[i].mesh);
        }
        this.group.add(this.tileGroup);
    };
    Board.prototype.reset = function () {
        this.removeAllTiles();
        if (this.tileGroup)
            this.group.remove(this.tileGroup);
    };
    return Board;
}());
exports.Board = Board;
