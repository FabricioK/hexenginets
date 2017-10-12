import * as THREE from 'three';
import { Board } from './components';
export declare class Scene {
    title: string;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    innerWidth: number;
    innerHeight: number;
    board: Board;
    constructor(config: any);
    setRender(container: HTMLElement): void;
    animate: () => void;
    render(): void;
}
