"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var components_1 = require("./components");
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
        this.camera = new THREE.PerspectiveCamera(50, this.innerWidth / this.innerHeight, 1, 5000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
        var grid = new components_1.Grid({
            rings: 5,
            cellSize: 10
        });
        this.board = new components_1.Board(grid);
        this.scene.add(this.board.group);
    }
    Scene.prototype.focusOn = function (obj) {
        this.camera.lookAt(obj.position);
    };
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
