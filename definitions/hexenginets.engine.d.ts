import { Scene } from './components/hexgrid/scene';
export declare class Engine {
    private container;
    private containerId;
    private currentScene;
    private renderSettings;
    private scenes;
    constructor();
    init(config: any): void;
    setCurrentScene(key: string): void;
    addScene(key: string, _scene: Scene): void;
    countScenes(): number;
    resumeScene(): void;
}
