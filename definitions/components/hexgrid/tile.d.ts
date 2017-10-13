import * as THREE from 'three';
import { UtilGenerator } from '../util';
import { Cell } from '../components';
export declare class Tile {
    uniqueID: string;
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    cell: Cell;
    material: THREE.MeshPhongMaterial;
    util: UtilGenerator;
    _emissive: number;
    constructor(config: any);
    dispose(): void;
}
