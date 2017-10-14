import * as THREE from 'three';
import { Grid, Board } from '../components';
export declare class Scene {
    title: string;
    container: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    innerWidth: number;
    innerHeight: number;
    board: Board;
    grid: Grid;
    constructor(config: any);
    focusOn(obj: THREE.Object3D): void;
    setRender(container: HTMLElement, renderSettings: any): void;
    animate: () => void;
    render(): void;
}
