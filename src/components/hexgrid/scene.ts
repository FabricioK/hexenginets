// three.js
import * as THREE from 'three'
import { Grid, Board } from '../components'
// create the scene
export class Scene {
    public title: string;
    public container: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public innerWidth: number;
    public innerHeight: number;
    public board: Board;
    public grid: Grid;
    constructor(config: any) {
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(50, this.innerWidth / this.innerHeight, 1, 5000);
        this.camera.position.z = 5;
        this.container = new THREE.Scene();

        this.grid = new Grid(config.gridConfig);
        this.grid.generate();
        this.board = new Board(this.grid);

        this.container.add(this.board.group);
        this.focusOn(this.board.group);
    }
    public focusOn(obj: THREE.Object3D) {
        this.camera.lookAt(obj.position);
    }
    public setRender(container: HTMLElement, renderSettings) {
        this.renderer = new THREE.WebGLRenderer(renderSettings);
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