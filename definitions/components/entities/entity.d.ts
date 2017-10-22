import * as THREE from 'three';
export declare class Entity {
    textureLoader: THREE.TextureLoader;
    loader: THREE.JSONLoader;
    mixer: THREE.AnimationMixer;
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    skinnedMesh: THREE.SkinnedMesh;
    material: THREE.MeshPhongMaterial;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    object3D: THREE.Object3D;
    constructor();
}
