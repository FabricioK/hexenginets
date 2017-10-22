"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var components_1 = require("../components");
var Scene = (function () {
    function Scene(config) {
        var _this = this;
        this.entities = {};
        this.skinnedentities = {};
        this.animate = function () {
            requestAnimationFrame(_this.animate);
            _this.render();
        };
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(50, this.innerWidth / this.innerHeight, 1, 5000);
        this.camera.position.z = 5;
        this.clock = new THREE.Clock();
        this.container = new THREE.Scene();
        this.grid = new components_1.Grid(config.gridConfig);
        this.grid.generate();
        this.board = new components_1.Board(this.grid);
        this.container.add(this.board.group);
        this.focusOn(this.board.group);
    }
    Scene.prototype.focusOn = function (obj) {
        this.camera.lookAt(obj.position);
    };
    Scene.prototype.setRender = function (container, renderSettings) {
        this.renderer = new THREE.WebGLRenderer(renderSettings);
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        container.appendChild(this.renderer.domElement);
    };
    Scene.prototype.addEntity = function (key, entity) {
        this.entities[key] = entity;
    };
    Scene.prototype.addSkinnedEntity = function (key, entity) {
        this.skinnedentities[key] = entity;
    };
    Scene.prototype.render = function () {
        var delta = this.clock.getDelta();
        for (var key in this.skinnedentities) {
            var entity = this.skinnedentities[key];
            entity.mixer.update(delta);
        }
        ;
        for (var key in this.entities) {
            var entity = this.entities[key];
            entity.mixer.update(delta);
        }
        ;
        this.renderer.render(this.container, this.camera);
    };
    return Scene;
}());
exports.Scene = Scene;
