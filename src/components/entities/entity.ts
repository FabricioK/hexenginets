import { Tile } from "./../../index"
import * as  THREE from 'three'
export class Entity {
    textureLoader: THREE.TextureLoader;
    loader: THREE.JSONLoader;
    mixer: THREE.AnimationMixer;
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    skinnedMesh: THREE.SkinnedMesh;
    material: THREE.MeshPhongMaterial;

    currentTile : Tile;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    object3D: THREE.Object3D;
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.loader = new THREE.JSONLoader();        
    }
}