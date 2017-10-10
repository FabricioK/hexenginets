"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('add', function () {
    var cl = new index_1.Scene({ title: 'scene01' });
    var hexengine = new index_1.Engine();
    hexengine.addScene(cl.title, cl);
    it('should sum given numbers', function () {
        expect(hexengine.countScenes()).toBe(1);
    });
});
