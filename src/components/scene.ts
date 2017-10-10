// three.js
import * as THREE from 'three'

// create the scene
export class Scene {
    public title :string;
    constructor(config : any){
        this.title = config.title;
    }    

    public scene: THREE.Scene;
    // create the camera
    public camera: THREE.PerspectiveCamera;

    public renderer: THREE.WebGLRenderer;

    public animate() {
        requestAnimationFrame(this.animate);
        this.render();
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }
}