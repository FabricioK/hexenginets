import * as THREE from 'three';
import { Grid } from '../components';
export declare class Board {
    overlay: THREE.Object3D;
    group: THREE.Object3D;
    grid: Grid;
    tileGroup: THREE.Object3D;
    tiles: Array<any>;
    constructor(grid: Grid);
    setGrid(newGrid: Grid): void;
    removeAllTiles(): void;
    generateOverlay(size: number): void;
    generateTilemap(): void;
    reset(): void;
}
