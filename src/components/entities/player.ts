import { Entity } from './entity'

export class Player extends Entity {
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    material: THREE.MeshPhongMaterial;

    constructor() {

        super();
    }
}