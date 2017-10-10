import { Scene } from './components/scene'

export class Engine {

    public canvas: HTMLCanvasElement;

    public ctx: CanvasRenderingContext2D;

    public canvasElementId: string;

    public canvasWidth: number;

    public canvasHeight: number;

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

        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        if (!this.canvasElementId) {
            document.body.appendChild(this.canvas);
        }
    }

    addScene(key: string, _scene: Scene) {
        this.scenes[key] = _scene;
    }

    countScenes(): number {
        return Object.keys(this.scenes).length
    }
}