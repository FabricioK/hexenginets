import { util } from './util'
import { Cell } from './cell'
// three.js
import * as THREE from 'three'

// create the scene
export class Grid {
    cellShape: THREE.Shape;
    cellGeo: THREE.Geometry;
    cellShapeGeo: THREE.ShapeGeometry;
    cellSize: number;
    cells: any;
    numCells: number;
    _cellWidth: number;
    _cellLength: number;
    _hashDelimeter: string;
    // pre-computed permutations
    _directions: Array<Cell>;
    _diagonals: Array<Cell>;
    // cached objects
    _list: Array<any>;
    _vec3: THREE.Vector3;
    _cel: Cell;
    _conversionVec: THREE.Vector3;
    _geoCache: Array<any>;
    _matCache: Array<any>;

    constructor(config: any) {
        this.cellSize = 10;
        this._cel = new Cell(undefined, undefined, undefined, undefined);
        this._cellWidth = this.cellSize * 2;
        this._cellLength = (util.SQRT3 * 0.5) * this._cellWidth;

        // create base shape used for building geometry
        var i, verts = [];
        // create the skeleton of the hex
        for (i = 0; i < 6; i++) {
            verts.push(this._createVertex(i));
        }
        // copy the verts into a shape for the geometry to use
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

    _createVertex(i): THREE.Vector3 {
        var angle = (util.TAU / 6) * i;
        return new THREE.Vector3((this.cellSize * Math.cos(angle)), (this.cellSize * Math.sin(angle)), 0);
    }
    cellToPixel(cell: Cell): THREE.Vector3 {
        this._vec3 = null;
        this._vec3 = new THREE.Vector3();
        this._vec3.x = cell.q * this._cellWidth * 0.75;
        this._vec3.y = cell.h;
        this._vec3.z = -((cell.s - cell.r) * this._cellLength * 0.5);
        return this._vec3;
    }
    public generateOverlay(size, overlayObj, overlayMat) {
        var x, y, z;
        var geo = this.cellShape.createPointsGeometry(6);
        for (x = -size; x < size + 1; x++) {
            for (y = -size; y < size + 1; y++) {
                z = -x - y;
                if (Math.abs(x) <= size && Math.abs(y) <= size && Math.abs(z) <= size) {
                    this._cel.set(x, y, z); // define the cell
                    var line = new THREE.Line(geo, overlayMat);
                    line.position.copy(this.cellToPixel(this._cel));
                    line.rotation.x = 90 * util.DEG_TO_RAD;
                    overlayObj.add(line);
                }
            }
        }
    }

    dispose() {
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
    }
}
