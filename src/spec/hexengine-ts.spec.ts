import {  Grid ,Scene ,Engine } from '../index';

describe('add', () => {

    var cl = new Scene({ title:'scene01'});
    var hexengine = new Engine();
    
    hexengine.addScene(cl.title,cl);
    
    it('should sum given numbers', () => {
        expect(hexengine.countScenes()).toBe(1);
    });

});