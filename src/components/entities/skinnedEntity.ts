import { Entity } from './entity'
import * as  THREE from 'three'

export class SkinnedEntity extends Entity {
    constructor() {
        super();
    }
    
    StartAnimationMixer() {
        this.mixer = new THREE.AnimationMixer(this.skinnedMesh);
    }

    Load(path: string) {
        this.loader.load(path, function (geometry, materials) {
            materials.forEach(function (material: any) {
                material.skinning = true;
            });
            this.skinnedMesh = new THREE.SkinnedMesh(
                geometry,
                new THREE.MeshFaceMaterial(materials)
            );
        });
    }
}