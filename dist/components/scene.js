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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
    }
    Scene.prototype.setRender = function (container, ctx) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: container,
            antialias: false
        });
        this.renderer.context = ctx;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    Scene.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
