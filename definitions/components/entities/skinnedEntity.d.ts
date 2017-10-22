import { Entity } from './entity';
export declare class SkinnedEntity extends Entity {
    constructor();
    StartAnimationMixer(callback: Function): void;
    Load(path: string, callback: Function): void;
}
