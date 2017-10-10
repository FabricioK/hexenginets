"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Scene = (function () {
    function Scene(config) {
        var _this = this;
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            _this.render();
        };
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(75, this.innerWidth / this.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
    }
    Scene.prototype.setRender = function (container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        container.appendChild(this.renderer.domElement);
    };
    Scene.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
