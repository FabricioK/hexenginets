// three.js
import * as THREE from 'three'

// create the scene
export class Scene {
    public title :string;    
    public scene: THREE.Scene;
    // create the camera
    public camera: THREE.PerspectiveCamera;

    public renderer: THREE.WebGLRenderer;


    constructor(config : any){
        this.title = config.title;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();        
        this.renderer.setSize( window.innerWidth, window.innerHeight );        
        this.scene = new THREE.Scene();
    }    

    public animate =  () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }
}