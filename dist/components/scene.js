"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Scene = (function () {
    function Scene(config) {
        this.title = config.title;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new THREE.Scene();
    }
    Scene.prototype.animate = function () {
        requestAnimationFrame(this.animate);
        this.render();
    };
    Scene.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
