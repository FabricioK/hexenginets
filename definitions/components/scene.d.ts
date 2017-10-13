import * as THREE from 'three';
import { Board } from './components';
export declare class Scene {
    title: string;
    container: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    innerWidth: number;
    innerHeight: number;
    board: Board;
    constructor(config: any);
    focusOn(obj: THREE.Object3D): void;
    setRender(container: HTMLElement): void;
    animate: () => void;
    render(): void;
}
