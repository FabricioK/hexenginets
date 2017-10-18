import { Tile } from '../components';
export declare class Cell {
    q: number;
    r: number;
    s: number;
    h: number;
    tile: Tile;
    userData: any;
    walkable: boolean;
    _calcCost: number;
    _priority: number;
    _visited: boolean;
    _parent: any;
    uniqueID: string;
    constructor(q: any, r: any, s: any, h?: any);
    set(q: any, r: any, s: any): Cell;
    copy(cell: Cell): Cell;
    add(cell: Cell): this;
    equals(cell: Cell): boolean;
}
