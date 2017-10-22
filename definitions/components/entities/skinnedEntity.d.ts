import { Entity } from './entity';
import { Tile } from './../hexgrid/tile';
export declare class SkinnedEntity extends Entity {
    constructor();
    StartAnimationMixer(callback: Function): void;
    SetTile(tile: Tile): void;
    Load(path: string, callback: Function): void;
}
