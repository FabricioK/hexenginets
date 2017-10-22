// three.js
import * as THREE from 'three'
import { Grid, Board , Entity ,SkinnedEntity } from '../components'
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
    public clock: THREE.Clock;
    private entities: { [key: string]: Entity } = {};
    private skinnedentities: { [key: string]: SkinnedEntity } = {};
    
    constructor(config: any) {
        this.title = config.title;
        this.innerHeight = config.innerHeight | 500;
        this.innerWidth = config.innerWidth | 500;
        this.camera = new THREE.PerspectiveCamera(50, this.innerWidth / this.innerHeight, 1, 5000);
        this.camera.position.z = 5;
        this.clock = new THREE.Clock();
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

    addEntity(key: string, entity: Entity) {
        this.entities[key] = entity;
    }
    addSkinnedEntity(key: string, entity: SkinnedEntity) {
        this.skinnedentities[key] = entity;
        this.container.add(entity.skinnedMesh);
    }
    public render() {
        var delta = this.clock.getDelta();
        
        for(let key in this.skinnedentities){
            let entity = this.skinnedentities[key];
            entity.mixer.update(delta);    
        };
        for(let key in this.entities){
            let entity = this.entities[key];
            entity.mixer.update(delta);    
        };
        this.renderer.render(this.container, this.camera)
    }
}