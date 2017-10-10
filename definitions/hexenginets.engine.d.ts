import { Scene } from './components/scene';
export declare class Engine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasElementId: string;
    container: HTMLElement;
    containerId: string;
    canvasWidth: number;
    canvasHeight: number;
    currentScene: string;
    scenes: {
        [key: string]: Scene;
    };
    constructor();
    init(config: any): void;
    setCurrentScene(key: string): void;
    addScene(key: string, _scene: Scene): void;
    countScenes(): number;
    resumeScene(): void;
}
