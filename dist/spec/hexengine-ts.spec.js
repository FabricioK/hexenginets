"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var THREE = require("three");
describe('add', function () {
    _this.engine = new index_1.Engine();
    var scene = new index_1.Scene({ title: 'scene01' });
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.scene.add(cube);
    _this.engine.init({
        containerId: 'container_id',
        width: 100,
        height: 100
    });
    _this.engine.addScene('scence01', scene);
    _this.engine.resumeScene();
    it('should sum given numbers', function () {
        expect(_this.engine.countScenes()).toBe(1);
    });
});
