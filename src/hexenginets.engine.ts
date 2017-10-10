import { Scene } from './components/scene'

export class Engine {

    public canvas: HTMLCanvasElement;

    public ctx: CanvasRenderingContext2D;

    public canvasElementId: string;

    public canvasWidth: number;

    public canvasHeight: number;

    public currentScene: string;

    scenes: { [key: string]: Scene; } = {};
    constructor() {
    }

    init(config: any) {
        this.canvasElementId = config.canvasElementId;
        if (this.canvasElementId) {
            this.canvas = <HTMLCanvasElement>document.getElementById(config.canvasElementId);
        } else {
            this.canvas = <HTMLCanvasElement>document.createElement('canvas');
        }

        this.canvasWidth = config.width;
        this.canvas.width = config.width;
        this.canvasHeight = config.height;
        this.canvas.height = config.height;

        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        if (config.containerId) {
            if (!this.canvasElementId) {
                document.getElementById(config.containerId).appendChild(this.canvas);
            }
        } else {
            if (!this.canvasElementId) {
                document.body.appendChild(this.canvas);
            }
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
            this.scenes[this.currentScene].setRender(this.canvas);
            
        this.scenes[this.currentScene].animate();
    }
}