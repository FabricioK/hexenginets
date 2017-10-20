import * as  THREE from 'three'
export class Entity {
    object3D: THREE.Object3D;    
    private textureLoader:THREE.TextureLoader;
    private loader :THREE.JSONLoader;
    private mixer : THREE.AnimationMixer;
    constructor(){
        this.textureLoader = new THREE.TextureLoader();
        this.loader = new THREE.JSONLoader();
    }
}