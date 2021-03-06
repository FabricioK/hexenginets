"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("./entity");
var THREE = require("three");
var SkinnedEntity = (function (_super) {
    __extends(SkinnedEntity, _super);
    function SkinnedEntity() {
        return _super.call(this) || this;
    }
    SkinnedEntity.prototype.StartAnimationMixer = function (callback) {
        this.mixer = new THREE.AnimationMixer(this.skinnedMesh);
        callback();
    };
    SkinnedEntity.prototype.SetTile = function (tile) {
        this.currentTile = tile;
    };
    SkinnedEntity.prototype.Load = function (path, callback) {
        var _this = this;
        this.loader.load(path, function (geometry, materials) {
            materials.forEach(function (material) {
                material.skinning = true;
            });
            _this.skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
            if (_this.currentTile) {
                _this.skinnedMesh.position.set(_this.currentTile.position.x, _this.currentTile.position.y + _this.currentTile.cell.h, _this.currentTile.position.z);
            }
            _this.geometry = geometry;
            callback();
        });
    };
    return SkinnedEntity;
}(entity_1.Entity));
exports.SkinnedEntity = SkinnedEntity;
