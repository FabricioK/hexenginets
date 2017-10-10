"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = (function () {
    function Scene() {
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
