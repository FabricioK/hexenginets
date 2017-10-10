import { Scene } from './components/scene'

export class Engine {

    public canvas: HTMLCanvasElement;

    public ctx: CanvasRenderingContext2D;

    public canvasElementId: string;

    public container: HTMLElement;
    public containerId: string;

    public canvasWidth: number;

    public canvasHeight: number;

    public currentScene: string;

    scenes: { [key: string]: Scene; } = {};
    constructor() {
    }

    init(config: any) {
        this.containerId = config.containerId;
         
        if (this.containerId) {
            this.container = document.getElementById(config.containerId);
          
        } 
    }

    setCurrentScene(key: string) {
        this.currentScene == key;
    }

    addScene(key: string, _scene: Scene) {
        if (this.currentScene == undefined)
            this.currentScene = key;

        this.scenes[key] = _scene;
    }

    countScenes(): number {
        return Object.keys(this.scenes).length
    }

    resumeScene() {
        if (this.scenes[this.currentScene].renderer == undefined)
            this.scenes[this.currentScene].setRender(this.container);

        this.scenes[this.currentScene].animate();
    }
}