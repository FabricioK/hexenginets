import { Scene } from './components/hexgrid/scene'
import { Entity } from './components/entities/entity'
export class Engine {

    private container: HTMLElement;
    private containerId: string;
    private currentScene: string;
    private renderSettings: any;
    private scenes: { [key: string]: Scene; } = {};
    private entities: { [key: string]: Entity } = {};

    constructor(config: any) {
        this.containerId = config.containerId;
        this.renderSettings = config.renderSettings;
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

    addEntity(key: string, entity: Entity) {
        this.entities[key] = entity;
    }

    countScenes(): number {
        return Object.keys(this.scenes).length
    }

    resumeScene() {
        if (this.scenes[this.currentScene].renderer == undefined)
            this.scenes[this.currentScene].setRender(this.container, this.renderSettings);

        this.scenes[this.currentScene].animate();
    }
}