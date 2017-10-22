import { Scene, Entity } from './components/components';
export declare class Engine {
    private container;
    private containerId;
    private currentScene;
    private renderSettings;
    private scenes;
    private entities;
    constructor(config: any);
    setCurrentScene(key: string): void;
    addScene(key: string, _scene: Scene): void;
    addEntity(key: string, entity: Entity): void;
    countScenes(): number;
    resumeScene(): void;
}
