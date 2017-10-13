import { UtilGenerator } from '../util'
import { Tile } from '../components'
export class Cell {
    q: number; // x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
    r: number; // y grid coordinate
    s: number; // z grid coordinate
    h: number; // 3D height of the cell, used by visual representation and pathfinder, cannot be less than 1
    tile: Tile; // optional link to the visual representation's class instance
    userData: any; // populate with any extra data needed in your game
    walkable: boolean; // if true, pathfinder will use as a through node
    // rest of these are used by the pathfinder and overwritten at runtime, so don't touch
    _calcCost: number;
    _priority: number;
    _visited: boolean;
    _parent: any;
    uniqueID: string;

    constructor(q, r, s, h) {
        this.q = q || 0; // x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
        this.r = r || 0; // y grid coordinate
        this.s = s || 0; // z grid coordinate
        this.h = h || 1; // 3D height of the cell, used by visual representation and pathfinder, cannot be less than 1
        this.tile = null; // optional link to the visual representation's class instance
        this.userData = {}; // populate with any extra data needed in your game
        this.walkable = true; // if true, pathfinder will use as a through node
        // rest of these are used by the pathfinder and overwritten at runtime, so don't touch
        this._calcCost = 0;
        this._priority = 0;
        this._visited = false;
        this._parent = null;
        let util = new UtilGenerator();
        this.uniqueID = util.generateID();
    }

    set(q, r, s): Cell {
        this.q = q;
        this.r = r;
        this.s = s;
        return this;
    }

    copy(cell: Cell): Cell {
        this.q = cell.q;
        this.r = cell.r;
        this.s = cell.s;
        this.h = cell.h;
        this.tile = cell.tile || null;
        this.userData = cell.userData || {};
        this.walkable = cell.walkable;
        return this;
    }

    add(cell: Cell) {
        this.q += cell.q;
        this.r += cell.r;
        this.s += cell.s;
        return this;
    }

    equals(cell: Cell) {
        return this.q === cell.q && this.r === cell.r && this.s === cell.s;
    }
};