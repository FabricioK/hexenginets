import { Cell } from './cell';
import * as THREE from 'three';
export declare class Grid {
    cellShape: THREE.Shape;
    cellGeo: THREE.Geometry;
    cellShapeGeo: THREE.ShapeGeometry;
    cellSize: number;
    cells: any;
    numCells: number;
    _cellWidth: number;
    _cellLength: number;
    _hashDelimeter: string;
    _directions: Array<Cell>;
    _diagonals: Array<Cell>;
    _list: Array<any>;
    _vec3: THREE.Vector3;
    _cel: Cell;
    _conversionVec: THREE.Vector3;
    _geoCache: Array<any>;
    _matCache: Array<any>;
    constructor(config: any);
    _createVertex(i: any): THREE.Vector3;
    cellToPixel(cell: Cell): THREE.Vector3;
    generateOverlay(size: any, overlayObj: any, overlayMat: any): void;
    dispose(): void;
}
