import * as THREE from 'three';
export declare class Grid {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animate(): void;
    render(): void;
}