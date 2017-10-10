import * as THREE from 'three';
export declare class Scene {
    title: string;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    constructor(config: any);
    setRender(container: any): void;
    animate: () => void;
    render(): void;
}
