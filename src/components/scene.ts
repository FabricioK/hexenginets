// three.js
import * as THREE from 'three'
import { Grid, Board } from './components'
// create the scene
export class Scene {
    public title: string;
    public container: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public innerWidth: number;
    public innerHeight: number;
    board: Board;
    constructor(config: any) {
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(50, this.innerWidth / this.innerHeight, 1, 5000);
        this.camera.position.z = 5;
        this.container = new THREE.Scene();

        var grid = new Grid({
            rings: 5,
            cellSize: 10
        });
        this.board = new Board(grid);

        this.container.add(this.board.group);
        this.focusOn(this.board.group);
    }
    public focusOn(obj: THREE.Object3D) {
        this.camera.lookAt(obj.position);
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
        this.renderer.render(this.container, this.camera)
    }
}