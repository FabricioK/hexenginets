import { Entity } from './entity'
import { Tile } from './../hexgrid/tile'
import * as  THREE from 'three'

export class SkinnedEntity extends Entity {
    constructor() {
        super();
    }

    StartAnimationMixer(callback: Function) {
        this.mixer = new THREE.AnimationMixer(this.skinnedMesh);
        callback();
    }

    SetTile(tile: Tile) {
        this.currentTile = tile;
    }
    Load(path: string, callback: Function) {
        this.loader.load(path, (geometry, materials) => {
            materials.forEach(function (material: any) {
                material.skinning = true;
            });
            this.skinnedMesh = new THREE.SkinnedMesh(
                geometry,
                new THREE.MeshFaceMaterial(materials)
            );
            if (this.currentTile) {
                this.skinnedMesh.position.set(this.currentTile.position.x, this.currentTile.position.y, this.currentTile.position.z);
            }
            this.geometry = geometry;
            callback();
        });
    }
}