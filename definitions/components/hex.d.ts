declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Hex {
    q: number;
    r: number;
    s: number;
    constructor(q: number, r: number, s: number);
    static add(a: Hex, b: Hex): Hex;
    static subtract(a: Hex, b: Hex): Hex;
    static scale(a: Hex, k: number): Hex;
    static rotateLeft(a: Hex): Hex;
    static rotateRight(a: Hex): Hex;
    static directions: Hex[];
    static direction(direction: number): Hex;
    static neighbor(hex: Hex, direction: number): Hex;
    static diagonals: Hex[];
    static diagonalNeighbor(hex: Hex, direction: number): Hex;
    static len(hex: Hex): number;
    static distance(a: Hex, b: Hex): number;
    static round(h: Hex): Hex;
    static lerp(a: Hex, b: Hex, t: number): Hex;
    static linedraw(a: Hex, b: Hex): Hex[];
}
declare class OffsetCoord {
    col: number;
    row: number;
    constructor(col: number, row: number);
    static EVEN: number;
    static ODD: number;
    static qoffsetFromCube(offset: number, h: Hex): OffsetCoord;
    static qoffsetToCube(offset: number, h: OffsetCoord): Hex;
    static roffsetFromCube(offset: number, h: Hex): OffsetCoord;
    static roffsetToCube(offset: number, h: OffsetCoord): Hex;
}
declare class Orientation {
    f0: number;
    f1: number;
    f2: number;
    f3: number;
    b0: number;
    b1: number;
    b2: number;
    b3: number;
    start_angle: number;
    constructor(f0: number, f1: number, f2: number, f3: number, b0: number, b1: number, b2: number, b3: number, start_angle: number);
}
declare class Layout {
    orientation: Orientation;
    size: Point;
    origin: Point;
    constructor(orientation: Orientation, size: Point, origin: Point);
    static pointy: Orientation;
    static flat: Orientation;
    static hexToPixel(layout: Layout, h: Hex): Point;
    static pixelToHex(layout: Layout, p: Point): Hex;
    static hexCornerOffset(layout: Layout, corner: number): Point;
    static polygonCorners(layout: Layout, h: Hex): Point[];
}
declare class Tests {
    constructor();
    static equalHex(name: String, a: Hex, b: Hex): void;
    static equalOffsetcoord(name: String, a: OffsetCoord, b: OffsetCoord): void;
    static equalInt(name: String, a: number, b: number): void;
    static equalHexArray(name: String, a: Hex[], b: Hex[]): void;
    static testHexArithmetic(): void;
    static testHexDirection(): void;
    static testHexNeighbor(): void;
    static testHexDiagonal(): void;
    static testHexDistance(): void;
    static testHexRotateRight(): void;
    static testHexRotateLeft(): void;
    static testHexRound(): void;
    static testHexLinedraw(): void;
    static testLayout(): void;
    static testConversionRoundtrip(): void;
    static testOffsetFromCube(): void;
    static testOffsetToCube(): void;
    static testAll(): void;
}
declare function complain(name: any): void;
