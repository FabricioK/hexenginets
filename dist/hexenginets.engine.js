"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine = (function () {
    function Engine() {
        this.scenes = {};
    }
    Engine.prototype.init = function (config) {
        this.canvasElementId = config.canvasElementId;
        if (this.canvasElementId) {
            this.canvas = document.getElementById(config.canvasElementId);
        }
        else {
            this.canvas = document.createElement('canvas');
        }
        this.ctx = this.canvas.getContext('2d');
        if (config.containerId) {
            if (!this.canvasElementId) {
                document.getElementById(config.containerId).appendChild(this.canvas);
            }
        }
        else {
            if (!this.canvasElementId) {
                document.body.appendChild(this.canvas);
            }
        }
    };
    Engine.prototype.addScene = function (key, _scene) {
        this.scenes[key] = _scene;
    };
    Engine.prototype.countScenes = function () {
        return Object.keys(this.scenes).length;
    };
    return Engine;
}());
exports.Engine = Engine;
