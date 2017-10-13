"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var cell_1 = require("./cell");
var THREE = require("three");
var Grid = (function () {
    function Grid(config) {
        this.cellSize = 10;
        this._cel = new cell_1.Cell(undefined, undefined, undefined, undefined);
        this._cellWidth = this.cellSize * 2;
        this._cellLength = (util_1.util.SQRT3 * 0.5) * this._cellWidth;
        var i, verts = [];
        for (i = 0; i < 6; i++) {
            verts.push(this._createVertex(i));
        }
        this.cellShape = new THREE.Shape();
        this.cellShape.moveTo(verts[0].x, verts[0].y);
        for (i = 1; i < 6; i++) {
            this.cellShape.lineTo(verts[i].x, verts[i].y);
        }
        this.cellShape.lineTo(verts[0].x, verts[0].y);
        this.cellShape.autoClose = true;
        this.cellGeo = new THREE.Geometry();
        this.cellGeo.vertices = verts;
        this.cellGeo.verticesNeedUpdate = true;
        this.cellShapeGeo = new THREE.ShapeGeometry(this.cellShape);
    }
    Grid.prototype._createVertex = function (i) {
        var angle = (util_1.util.TAU / 6) * i;
        return new THREE.Vector3((this.cellSize * Math.cos(angle)), (this.cellSize * Math.sin(angle)), 0);
    };
    Grid.prototype.cellToPixel = function (cell) {
        this._vec3 = null;
        this._vec3 = new THREE.Vector3();
        this._vec3.x = cell.q * this._cellWidth * 0.75;
        this._vec3.y = cell.h;
        this._vec3.z = -((cell.s - cell.r) * this._cellLength * 0.5);
        return this._vec3;
    };
    Grid.prototype.generateOverlay = function (size, overlayObj, overlayMat) {
        var x, y, z;
        var geo = this.cellShape.createPointsGeometry(6);
        for (x = -size; x < size + 1; x++) {
            for (y = -size; y < size + 1; y++) {
                z = -x - y;
                if (Math.abs(x) <= size && Math.abs(y) <= size && Math.abs(z) <= size) {
                    this._cel.set(x, y, z);
                    var line = new THREE.Line(geo, overlayMat);
                    line.position.copy(this.cellToPixel(this._cel));
                    line.rotation.x = 90 * util_1.util.DEG_TO_RAD;
                    overlayObj.add(line);
                }
            }
        }
    };
    Grid.prototype.dispose = function () {
        this.cells = null;
        this.numCells = 0;
        this.cellShape = null;
        this.cellGeo.dispose();
        this.cellGeo = null;
        this.cellShapeGeo.dispose();
        this.cellShapeGeo = null;
        this._list = null;
        this._vec3 = null;
        this._conversionVec = null;
        this._geoCache = null;
        this._matCache = null;
    };
    return Grid;
}());
exports.Grid = Grid;
