
// three.js
import * as THREE from 'three'
import { UtilGenerator, util } from '../util'
import { Cell } from '../components'
export class Tile {
    public uniqueID: string;
    geometry: THREE.Geometry;
    mesh: THREE.Mesh;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    cell: Cell;
    material: THREE.MeshPhongMaterial;
    util: UtilGenerator;
    _emissive: number;

    constructor(config: any) {
        this.util = new UtilGenerator();
        if (!config.material && !this.material) {
            this.material = new THREE.MeshPhongMaterial({
                color: this.util.randomizeRGB('30, 30, 30', 13)
            });
        }

        this.cell = config.cell;
        if (this.cell.tile && this.cell.tile !== this) this.cell.tile.dispose(); // remove whatever was there
        this.cell.tile = this;

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData.structure = this;

        // create references so we can control orientation through this (Tile), instead of drilling down
        this.position = this.mesh.position;
        this.rotation = this.mesh.rotation;

        // rotate it to face "up" (the threejs coordinate space is Y+)
        this.rotation.x = -90 * util.DEG_TO_RAD;
        this.mesh.scale.set(config.scale, config.scale, 1);

        if (this.material.emissive) {
            this._emissive = this.material.emissive.getHex();
        }
        else {
            this._emissive = null;
        }
    }

    dispose() {
        if (this.cell && this.cell.tile) this.cell.tile = null;
        this.cell = null;
        this.position = null;
        this.rotation = null;
        if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
        this.mesh.userData.structure = null;
        this.mesh = null;
        this.material = null;
        this.geometry = null;
        this._emissive = null;
    }
}