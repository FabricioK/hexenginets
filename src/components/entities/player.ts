import { Entity } from './entity'
import * as  THREE from 'three'

export class Player extends Entity {
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    material: THREE.MeshPhongMaterial;
    skinnedMesh: THREE.SkinnedMesh;
    constructor() {
        super();
    }
}