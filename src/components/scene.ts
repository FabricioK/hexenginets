// three.js
import * as THREE from 'three'

// create the scene
export class Scene {
    public title: string;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public innerWidth: number;
    public innerHeight: number;

    constructor(config: any) {
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(75, this.innerWidth / this.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();
    }

    public setRender(container: HTMLElement) {
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        container.appendChild( this.renderer.domElement );
    }
    public animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }
}