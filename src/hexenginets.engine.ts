import { Scene } from './components/hexgrid/scene'

export class Engine {

    private container: HTMLElement;
    private containerId: string;
    private currentScene: string;
    private renderSettings: any;
    private scenes: { [key: string]: Scene; } = {};

    constructor() {

    }

    init(config: any) {
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

    countScenes(): number {
        return Object.keys(this.scenes).length
    }

    resumeScene() {
        if (this.scenes[this.currentScene].renderer == undefined)
            this.scenes[this.currentScene].setRender(this.container, this.renderSettings);

        this.scenes[this.currentScene].animate();
    }
}