import * as THREE from 'three';
export declare class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animate(): void;
    render(): void;
}
