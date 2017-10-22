import { Entity } from './entity'
import * as  THREE from 'three'

export class SkinnedEntity extends Entity {
    constructor() {
        super();
    }

    StartAnimationMixer(callback : Function) {
        this.mixer = new THREE.AnimationMixer(this.skinnedMesh);
        callback();
    }

    Load(path: string, callback :Function) {
        this.loader.load(path, (geometry, materials) => {
            materials.forEach(function (material: any) {
                material.skinning = true;
            });
            this.skinnedMesh = new THREE.SkinnedMesh(
                geometry,
                new THREE.MeshFaceMaterial(materials)
            );
            this.geometry = geometry;
            callback();
        });
    }
}