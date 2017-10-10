"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine() {
        this.scenes = {};
    }
    Engine.prototype.init = function (config) {
        this.canvasElementId = config.canvasElementId;
        this.containerId = config.containerId;
        if (this.canvasElementId) {
            this.canvas = document.getElementById(config.canvasElementId);
        }
        else {
            this.canvas = document.createElement('canvas');
        }
        this.canvasWidth = config.width;
        this.canvas.width = config.width;
        this.canvasHeight = config.height;
        this.canvas.height = config.height;
        this.ctx = this.canvas.getContext('2d');
        if (this.containerId) {
            this.container = document.getElementById(config.containerId);
            if (!this.canvasElementId) {
                this.container.appendChild(this.canvas);
            }
        }
        else {
            if (!this.canvasElementId) {
                document.body.appendChild(this.canvas);
            }
        }
    };
    Engine.prototype.setCurrentScene = function (key) {
        this.currentScene == key;
    };
    Engine.prototype.addScene = function (key, _scene) {
        if (this.currentScene == undefined)
            this.currentScene = key;
        this.scenes[key] = _scene;
    };
    Engine.prototype.countScenes = function () {
        return Object.keys(this.scenes).length;
    };
    Engine.prototype.resumeScene = function () {
        if (this.scenes[this.currentScene].renderer == undefined)
            this.scenes[this.currentScene].setRender(this.container);
        this.scenes[this.currentScene].animate();
    };
    return Engine;
}());
exports.Engine = Engine;
