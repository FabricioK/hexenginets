import { Scene } from './components/components';
export declare class Engine {
    container: HTMLElement;
    private containerId;
    private currentScene;
    private renderSettings;
    private scenes;
    constructor(config: any);
    setCurrentScene(key: string): void;
    addScene(key: string, _scene: Scene): void;
    countScenes(): number;
    resumeScene(): void;
}
