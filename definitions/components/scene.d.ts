import * as THREE from 'three';
export declare class Scene {
    title: string;
    constructor(config: any);
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animate(): void;
    render(): void;
}
