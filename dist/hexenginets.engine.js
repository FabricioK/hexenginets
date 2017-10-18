"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine(config) {
        this.scenes = {};
        this.entities = {};
        this.containerId = config.containerId;
        this.renderSettings = config.renderSettings;
        if (this.containerId) {
            this.container = document.getElementById(config.containerId);
        }
    }
    Engine.prototype.setCurrentScene = function (key) {
        this.currentScene == key;
    };
    Engine.prototype.addScene = function (key, _scene) {
        if (this.currentScene == undefined)
            this.currentScene = key;
        this.scenes[key] = _scene;
    };
    Engine.prototype.addEntity = function (key, entity) {
        this.entities[key] = entity;
    };
    Engine.prototype.countScenes = function () {
        return Object.keys(this.scenes).length;
    };
    Engine.prototype.resumeScene = function () {
        if (this.scenes[this.currentScene].renderer == undefined)
            this.scenes[this.currentScene].setRender(this.container, this.renderSettings);
        this.scenes[this.currentScene].animate();
    };
    return Engine;
}());
exports.Engine = Engine;
