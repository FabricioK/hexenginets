import * as THREE from 'three';
export declare class Scene {
    title: string;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    innerWidth: number;
    innerHeight: number;
    constructor(config: any);
    setRender(container: HTMLElement): void;
    animate: () => void;
    render(): void;
}
