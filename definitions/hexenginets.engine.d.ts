import { Scene } from './components/scene';
export declare class Engine {
    container: HTMLElement;
    containerId: string;
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
