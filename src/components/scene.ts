// three.js
import * as THREE from 'three'
import { Grid, Board } from './components'
// create the scene
export class Scene {
    public title: string;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public innerWidth: number;
    public innerHeight: number;
    board: Board;
    constructor(config: any) {
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(75, this.innerWidth / this.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.scene = new THREE.Scene();

        var grid = new Grid({
            rings: 5,
            cellSize: 10
        });
        this.board = new Board(grid);

        this.scene.add(this.board.group);
    }

    public setRender(container: HTMLElement) {
        this.renderer = new THREE.WebGLRenderer({ antialias: false });
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        container.appendChild(this.renderer.domElement);
    }
    public animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    public render() {
        this.renderer.render(this.scene, this.camera)
    }
}