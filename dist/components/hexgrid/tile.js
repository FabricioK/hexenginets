"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var util_1 = require("../util");
var Tile = (function () {
    function Tile(config) {
        this.util = new util_1.UtilGenerator();
        if (!this.material) {
            this.material = new THREE.MeshPhongMaterial({
                color: this.util.randomizeRGB('30, 30, 30', 13)
            });
        }
        this.cell = config.cell;
        if (this.cell.tile && this.cell.tile !== this)
            this.cell.tile.dispose();
        this.cell.tile = this;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData.structure = this;
        this.position = this.mesh.position;
        this.rotation = this.mesh.rotation;
        this.rotation.x = -90 * util_1.util.DEG_TO_RAD;
        this.mesh.scale.set(config.scale, config.scale, 1);
        if (this.material.emissive) {
            this._emissive = this.material.emissive.getHex();
        }
        else {
            this._emissive = null;
        }
    }
    Tile.prototype.dispose = function () {
        if (this.cell && this.cell.tile)
            this.cell.tile = null;
        this.cell = null;
        this.position = null;
        this.rotation = null;
        if (this.mesh.parent)
            this.mesh.parent.remove(this.mesh);
        this.mesh.userData.structure = null;
        this.mesh = null;
        this.material = null;
        this.geometry = null;
        this._emissive = null;
    };
    return Tile;
}());
exports.Tile = Tile;
