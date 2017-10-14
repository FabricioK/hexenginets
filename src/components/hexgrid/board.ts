import * as  THREE from 'three'
import { Grid, Cell } from '../components'
export class Board {
    overlay: THREE.Object3D;
    group: THREE.Object3D;
    grid: Grid;
    tileGroup: THREE.Object3D;
    tiles: Array<any>;

    constructor(grid: Grid) {
        this.group = new THREE.Object3D();
        let mat = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            opacity: 0.3
        });
        this.overlay = new THREE.Object3D();

        this.group.add(this.overlay);

        this.setGrid(grid);
        this.generateOverlay(grid.cellSize);
        this.generateTilemap();
    }

    setGrid(newGrid: Grid) {
        this.group.remove(this.tileGroup);
        if (this.grid && newGrid !== this.grid) {
            this.removeAllTiles();
            this.tiles.forEach(function (t) {
                this.grid.remove(t.cell);
                t.dispose();
            });
            this.grid.dispose();
        }
        this.grid = newGrid;
        this.tiles = [];
        this.tileGroup = new THREE.Object3D();
        this.group.add(this.tileGroup);
    }

    removeAllTiles() {
        if (!this.tileGroup) return;
        var tiles = this.tileGroup.children;
        for (var i = 0; i < tiles.length; i++) {
            this.tileGroup.remove(tiles[i]);
        }
    }    
    generateOverlay(size: number) {
        var mat = new THREE.LineBasicMaterial({
            color: 0x000000,
            opacity: 0.3
        });

        if (this.overlay) {
            this.group.remove(this.overlay);
        }

        this.overlay = new THREE.Object3D();

        this.grid.generateOverlay(size, this.overlay, mat);

        this.group.add(this.overlay);
    }

    generateTilemap() {
        this.reset();

        var tiles = this.grid.generateTiles();
        this.tiles = tiles;

        this.tileGroup = new THREE.Object3D();
        for (var i = 0; i < tiles.length; i++) {
            this.tileGroup.add(tiles[i].mesh);
        }

        this.group.add(this.tileGroup);
    }
    reset() {
        // removes all tiles from the scene, but leaves the grid intact
        this.removeAllTiles();
        if (this.tileGroup) this.group.remove(this.tileGroup);
    }
}