import * as THREE from 'three';
import { Grid, Board, Entity, SkinnedEntity } from '../components';
export declare class Scene {
    title: string;
    container: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    innerWidth: number;
    innerHeight: number;
    board: Board;
    grid: Grid;
    clock: THREE.Clock;
    private entities;
    private skinnedentities;
    constructor(config: any);
    focusOn(obj: THREE.Object3D): void;
    setRender(container: HTMLElement, renderSettings: any): void;
    animate: () => void;
    addEntity(key: string, entity: Entity): void;
    addSkinnedEntity(key: string, entity: SkinnedEntity): void;
    render(): void;
}
