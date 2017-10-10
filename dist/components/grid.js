"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = (function () {
    function Grid() {
    }
    Grid.prototype.animate = function () {
        requestAnimationFrame(this.animate);
        this.render();
    };
    Grid.prototype.render = function () {
        this.renderer.render(this.scene, this.camera);
    };
    return Grid;
}());
exports.Grid = Grid;
