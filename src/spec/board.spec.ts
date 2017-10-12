import { Board, Grid } from '../index';
import * as THREE from 'three'

describe('createBoard', () => {
    var grid = new Grid({
        rings: 5,
        cellSize: 10
    });
    this.board = new Board(grid);

    it('should sum given numbers', () => {
        expect(this.board).toBe(undefined);
    });

});