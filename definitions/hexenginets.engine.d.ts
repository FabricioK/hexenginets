import { Scene } from './components/scene';
export declare class Engine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasElementId: string;
    canvasWidth: number;
    canvasHeight: number;
    scenes: {
        [key: string]: Scene;
    };
    constructor();
    init(config: any): void;
    addScene(key: string, _scene: Scene): void;
    countScenes(): number;
}
