"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Entity = (function () {
    function Entity() {
        this.textureLoader = new THREE.TextureLoader();
        this.loader = new THREE.JSONLoader();
    }
    return Entity;
}());
exports.Entity = Entity;
