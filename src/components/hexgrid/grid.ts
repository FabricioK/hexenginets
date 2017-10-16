import { util } from '../util'
import { Cell, Tile, ExtrudeSettings } from '../components'
// three.js
import * as THREE from 'three'

// create the scene
export class Grid {
    cellShape: THREE.Shape;
    cellGeo: THREE.Geometry;
    cellShapeGeo: THREE.ShapeGeometry;
    cellSize: number;
    cells: Array<Cell>;
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
    _geoCache: Array<THREE.ExtrudeGeometry>;
    _matCache: Array<any>;
    extrudeSettings: ExtrudeSettings;
    TWO_THIRDS: number;

    constructor(config: any) {
        this.extrudeSettings = new ExtrudeSettings();
        this.cellSize = config.cellSize || 5;
        this._cel = new Cell(undefined, undefined, undefined, undefined);
        this._cellWidth = this.cellSize * 2;
        this._cellLength = (util.SQRT3 * 0.5) * this._cellWidth;
        this._hashDelimeter = '.';

        this._directions = [new Cell(+1, -1, 0), new Cell(+1, 0, -1), new Cell(0, +1, -1), new Cell(-1, +1, 0), new Cell(-1, 0, +1), new Cell(0, -1, +1)];
        this._diagonals = [new Cell(+2, -1, -1), new Cell(+1, +1, -2), new Cell(-1, +2, -1), new Cell(-2, +1, +1), new Cell(-1, -1, +2), new Cell(+1, -2, +1)];

        this.TWO_THIRDS = 2 / 3;

        this._geoCache = new Array<THREE.ExtrudeGeometry>();
        this.cells = new Array<Cell>();
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
    _cubeRound(h: Cell) {
        var rx = Math.round(h.q);
        var ry = Math.round(h.r);
        var rz = Math.round(h.s);

        var xDiff = Math.abs(rx - h.q);
        var yDiff = Math.abs(ry - h.r);
        var zDiff = Math.abs(rz - h.s);

        if (xDiff > yDiff && xDiff > zDiff) {
            rx = -ry - rz;
        }
        else if (yDiff > zDiff) {
            ry = -rx - rz;
        }
        else {
            rz = -rx - ry;
        }

        return this._cel.set(rx, ry, rz);
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
    cellToHash(cell: Cell) {
        return cell.q + this._hashDelimeter + cell.r + this._hashDelimeter + cell.s;
    }
    remove(cell: Cell) {
        var h = this.cellToHash(cell);
        if (this.cells[h]) {
            delete this.cells[h];
            this.numCells--;
        }
    }
    add(cell: Cell) {
        var h = this.cellToHash(cell);
        if (this.cells[h]) {
            // console.warn('A cell already exists there');
            return;
        }
        this.cells[h] = cell;
        this.numCells++;

        return cell;
    }
    generate() {
        var x, y, z, c;
        for (x = -this.cellSize; x < this.cellSize + 1; x++) {
            for (y = -this.cellSize; y < this.cellSize + 1; y++) {
                z = -x - y;
                if (Math.abs(x) <= this.cellSize && Math.abs(y) <= this.cellSize && Math.abs(z) <= this.cellSize) {
                    c = new Cell(x, y, z, null);
                    this.add(c);
                }
            }
        }
    }
    pixelToCell(pos: THREE.Vector3) {
        // convert a position in world space ("pixels") to cell coordinates
        var q = pos.x * (this.TWO_THIRDS / this.cellSize);
        var r = ((-pos.x / 3) + (util.SQRT3 / 3) * pos.z) / this.cellSize;
        this._cel.set(q, r, -q - r);
        return this._cubeRound(this._cel);
    }
    distance(cellA: Cell, cellB: Cell) {
        var d = Math.max(Math.abs(cellA.q - cellB.q), Math.abs(cellA.r - cellB.r), Math.abs(cellA.s - cellB.s));
        d += cellB.h - cellA.h; // include vertical height
        return d;
    }

    clearPath() {
        for (let i in this.cells) {
            let c = <Cell>this.cells[i];
            c._calcCost = 0;
            c._priority = 0;
            c._parent = null;
            c._visited = false;
        }
    }

    traverse(cb: Function) {
        var i;
        for (i in this.cells) {
            cb(this.cells[i]);
        }
    }

    getNeighbors(cell: Cell, diagonal: any, filter: any) {
        // always returns an array
        var i, n, l = this._directions.length;
        this._list.length = 0;
        for (i = 0; i < l; i++) {
            this._cel.copy(cell);
            this._cel.add(this._directions[i]);
            n = this.cells[this.cellToHash(this._cel)];
            if (!n || (filter && !filter(cell, n))) {
                continue;
            }
            this._list.push(n);
        }
        if (diagonal) {
            for (i = 0; i < l; i++) {
                this._cel.copy(cell);
                this._cel.add(this._diagonals[i]);
                n = this.cells[this.cellToHash(this._cel)];
                if (!n || (filter && !filter(cell, n))) {
                    continue;
                }
                this._list.push(n);
            }
        }
        return this._list;
    }
    getCellAt(pos: THREE.Vector3) {
        // get the Cell (if any) at the passed world position
        var q = pos.x * (this.TWO_THIRDS / this.cellSize);
        var r = ((-pos.x / 3) + (util.SQRT3 / 3) * pos.z) / this.cellSize;
        this._cel.set(q, r, -q - r);
        this._cubeRound(this._cel);
        return this.cells[this.cellToHash(this._cel)];
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
    generateTile(cell, scale, material) {
        var height = Math.abs(cell.h);
        if (height < 1) height = 1;

        var geo = this._geoCache[height];
        if (!geo) {
            this.extrudeSettings.amount = height;
            geo = new THREE.ExtrudeGeometry(this.cellShape, this.extrudeSettings);
            this._geoCache[height] = geo;
        }
        var tile = new Tile({
            size: this.cellSize,
            scale: scale,
            cell: cell,
            geometry: geo,
            material: material
        });

        cell.tile = tile;

        return tile;
    }
    public generateTiles() {
        var tiles = [];
        var settings = {
            tileScale: 0.95,
            cellSize: this.cellSize,
            material: null,
            extrudeSettings: new ExtrudeSettings()
        }

        this.cellSize = settings.cellSize;
        this._cellWidth = this.cellSize * 2;
        this._cellLength = (util.SQRT3 * 0.5) * this._cellWidth;
        var i, t, c;
        for (i in this.cells) {
            c = this.cells[i];
            t = this.generateTile(c, settings.tileScale, settings.material);
            t.position.copy(this.cellToPixel(c));
            t.position.y = 0;
            tiles.push(t);
        }
        return tiles;
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
