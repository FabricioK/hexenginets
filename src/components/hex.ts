


class Point
{
    constructor (public x:number, public y:number) {}
}

class Hex
{
    constructor (public q:number, public r:number, public s:number) {}

    public static add(a:Hex, b:Hex):Hex
    {
        return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
    }


    public static subtract(a:Hex, b:Hex):Hex
    {
        return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
    }


    public static scale(a:Hex, k:number):Hex
    {
        return new Hex(a.q * k, a.r * k, a.s * k);
    }


    public static rotateLeft(a:Hex):Hex
    {
        return new Hex(-a.s, -a.q, -a.r);
    }


    public static rotateRight(a:Hex):Hex
    {
        return new Hex(-a.r, -a.s, -a.q);
    }

    public static directions:Hex[] = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];

    public static direction(direction:number):Hex
    {
        return Hex.directions[direction];
    }


    public static neighbor(hex:Hex, direction:number):Hex
    {
        return Hex.add(hex, Hex.direction(direction));
    }

    public static diagonals:Hex[] = [new Hex(2, -1, -1), new Hex(1, -2, 1), new Hex(-1, -1, 2), new Hex(-2, 1, 1), new Hex(-1, 2, -1), new Hex(1, 1, -2)];

    public static diagonalNeighbor(hex:Hex, direction:number):Hex
    {
        return Hex.add(hex, Hex.diagonals[direction]);
    }


    public static len(hex:Hex):number
    {
        return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
    }


    public static distance(a:Hex, b:Hex):number
    {
        return Hex.len(Hex.subtract(a, b));
    }


    public static round(h:Hex):Hex
    {
        var q:number = Math.round(h.q);
        var r:number = Math.round(h.r);
        var s:number = Math.round(h.s);
        var q_diff:number = Math.abs(q - h.q);
        var r_diff:number = Math.abs(r - h.r);
        var s_diff:number = Math.abs(s - h.s);
        if (q_diff > r_diff && q_diff > s_diff)
        {
            q = -r - s;
        }
        else
            if (r_diff > s_diff)
            {
                r = -q - s;
            }
            else
            {
                s = -q - r;
            }
        return new Hex(q, r, s);
    }


    public static lerp(a:Hex, b:Hex, t:number):Hex
    {
        return new Hex(a.q * (1 - t) + b.q * t, a.r * (1 - t) + b.r * t, a.s * (1 - t) + b.s * t);
    }


    public static linedraw(a:Hex, b:Hex):Hex[]
    {
        var N:number = Hex.distance(a, b);
        var a_nudge:Hex = new Hex(a.q + 0.000001, a.r + 0.000001, a.s - 0.000002);
        var b_nudge:Hex = new Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
        var results:Hex[] = [];
        var step:number = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++)
        {
            results.push(Hex.round(Hex.lerp(a_nudge, b_nudge, step * i)));
        }
        return results;
    }

}

class OffsetCoord
{
    constructor (public col:number, public row:number) {}
    public static EVEN:number = 1;
    public static ODD:number = -1;

    public static qoffsetFromCube(offset:number, h:Hex):OffsetCoord
    {
        var col:number = h.q;
        var row:number = h.r + (h.q + offset * (h.q & 1)) / 2;
        return new OffsetCoord(col, row);
    }


    public static qoffsetToCube(offset:number, h:OffsetCoord):Hex
    {
        var q:number = h.col;
        var r:number = h.row - (h.col + offset * (h.col & 1)) / 2;
        var s:number = -q - r;
        return new Hex(q, r, s);
    }


    public static roffsetFromCube(offset:number, h:Hex):OffsetCoord
    {
        var col:number = h.q + (h.r + offset * (h.r & 1)) / 2;
        var row:number = h.r;
        return new OffsetCoord(col, row);
    }


    public static roffsetToCube(offset:number, h:OffsetCoord):Hex
    {
        var q:number = h.col - (h.row + offset * (h.row & 1)) / 2;
        var r:number = h.row;
        var s:number = -q - r;
        return new Hex(q, r, s);
    }

}

class Orientation
{
    constructor (public f0:number, public f1:number, public f2:number, public f3:number, public b0:number, public b1:number, public b2:number, public b3:number, public start_angle:number) {}
}

class Layout
{
    constructor (public orientation:Orientation, public size:Point, public origin:Point) {}
    public static pointy:Orientation = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    public static flat:Orientation = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

    public static hexToPixel(layout:Layout, h:Hex):Point
    {
        var M:Orientation = layout.orientation;
        var size:Point = layout.size;
        var origin:Point = layout.origin;
        var x:number = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y:number = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point(x + origin.x, y + origin.y);
    }


    public static pixelToHex(layout:Layout, p:Point):Hex
    {
        var M:Orientation = layout.orientation;
        var size:Point = layout.size;
        var origin:Point = layout.origin;
        var pt:Point = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q:number = M.b0 * pt.x + M.b1 * pt.y;
        var r:number = M.b2 * pt.x + M.b3 * pt.y;
        return new Hex(q, r, -q - r);
    }


    public static hexCornerOffset(layout:Layout, corner:number):Point
    {
        var M:Orientation = layout.orientation;
        var size:Point = layout.size;
        var angle:number = 2.0 * Math.PI * (M.start_angle - corner) / 6;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }


    public static polygonCorners(layout:Layout, h:Hex):Point[]
    {
        var corners:Point[] = [];
        var center:Point = Layout.hexToPixel(layout, h);
        for (var i = 0; i < 6; i++)
        {
            var offset:Point = Layout.hexCornerOffset(layout, i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }

}


class Tests
{
    constructor () {}

    public static equalHex(name:String, a:Hex, b:Hex):void
    {
        if (!(a.q == b.q && a.s == b.s && a.r == b.r))
        {
            complain(name);
        }
    }


    public static equalOffsetcoord(name:String, a:OffsetCoord, b:OffsetCoord):void
    {
        if (!(a.col == b.col && a.row == b.row))
        {
            complain(name);
        }
    }


    public static equalInt(name:String, a:number, b:number):void
    {
        if (!(a == b))
        {
            complain(name);
        }
    }


    public static equalHexArray(name:String, a:Hex[], b:Hex[]):void
    {
        Tests.equalInt(name, a.length, b.length);
        for (var i = 0; i < a.length; i++)
        {
            Tests.equalHex(name, a[i], b[i]);
        }
    }


    public static testHexArithmetic():void
    {
        Tests.equalHex("hex_add", new Hex(4, -10, 6), Hex.add(new Hex(1, -3, 2), new Hex(3, -7, 4)));
        Tests.equalHex("hex_subtract", new Hex(-2, 4, -2), Hex.subtract(new Hex(1, -3, 2), new Hex(3, -7, 4)));
    }


    public static testHexDirection():void
    {
        Tests.equalHex("hex_direction", new Hex(0, -1, 1), Hex.direction(2));
    }


    public static testHexNeighbor():void
    {
        Tests.equalHex("hex_neighbor", new Hex(1, -3, 2), Hex.neighbor(new Hex(1, -2, 1), 2));
    }


    public static testHexDiagonal():void
    {
        Tests.equalHex("hex_diagonal", new Hex(-1, -1, 2), Hex.diagonalNeighbor(new Hex(1, -2, 1), 3));
    }


    public static testHexDistance():void
    {
        Tests.equalInt("hex_distance", 7, Hex.distance(new Hex(3, -7, 4), new Hex(0, 0, 0)));
    }


    public static testHexRotateRight():void
    {
        Tests.equalHex("hex_rotate_right", Hex.rotateRight(new Hex(1, -3, 2)), new Hex(3, -2, -1));
    }


    public static testHexRotateLeft():void
    {
        Tests.equalHex("hex_rotate_left", Hex.rotateLeft(new Hex(1, -3, 2)), new Hex(-2, -1, 3));
    }


    public static testHexRound():void
    {
        var a:Hex = new Hex(0, 0, 0);
        var b:Hex = new Hex(1, -1, 0);
        var c:Hex = new Hex(0, -1, 1);
        Tests.equalHex("hex_round 1", new Hex(5, -10, 5), Hex.round(Hex.lerp(new Hex(0, 0, 0), new Hex(10, -20, 10), 0.5)));
        Tests.equalHex("hex_round 2", Hex.round(a), Hex.round(Hex.lerp(a, b, 0.499)));
        Tests.equalHex("hex_round 3", Hex.round(b), Hex.round(Hex.lerp(a, b, 0.501)));
        Tests.equalHex("hex_round 4", Hex.round(a), Hex.round(new Hex(a.q * 0.4 + b.q * 0.3 + c.q * 0.3, a.r * 0.4 + b.r * 0.3 + c.r * 0.3, a.s * 0.4 + b.s * 0.3 + c.s * 0.3)));
        Tests.equalHex("hex_round 5", Hex.round(c), Hex.round(new Hex(a.q * 0.3 + b.q * 0.3 + c.q * 0.4, a.r * 0.3 + b.r * 0.3 + c.r * 0.4, a.s * 0.3 + b.s * 0.3 + c.s * 0.4)));
    }


    public static testHexLinedraw():void
    {
        Tests.equalHexArray("hex_linedraw", [new Hex(0, 0, 0), new Hex(0, -1, 1), new Hex(0, -2, 2), new Hex(1, -3, 2), new Hex(1, -4, 3), new Hex(1, -5, 4)], Hex.linedraw(new Hex(0, 0, 0), new Hex(1, -5, 4)));
    }


    public static testLayout():void
    {
        var h:Hex = new Hex(3, 4, -7);
        var flat:Layout = new Layout(Layout.flat, new Point(10, 15), new Point(35, 71));
        Tests.equalHex("layout", h, Hex.round(Layout.pixelToHex(flat, Layout.hexToPixel(flat, h))));
        var pointy:Layout = new Layout(Layout.pointy, new Point(10, 15), new Point(35, 71));
        Tests.equalHex("layout", h, Hex.round(Layout.pixelToHex(pointy, Layout.hexToPixel(pointy, h))));
    }


    public static testConversionRoundtrip():void
    {
        var a:Hex = new Hex(3, 4, -7);
        var b:OffsetCoord = new OffsetCoord(1, -3);
        Tests.equalHex("conversion_roundtrip even-q", a, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a)));
        Tests.equalOffsetcoord("conversion_roundtrip even-q", b, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b)));
        Tests.equalHex("conversion_roundtrip odd-q", a, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a)));
        Tests.equalOffsetcoord("conversion_roundtrip odd-q", b, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b)));
        Tests.equalHex("conversion_roundtrip even-r", a, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a)));
        Tests.equalOffsetcoord("conversion_roundtrip even-r", b, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b)));
        Tests.equalHex("conversion_roundtrip odd-r", a, OffsetCoord.roffsetToCube(OffsetCoord.ODD, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a)));
        Tests.equalOffsetcoord("conversion_roundtrip odd-r", b, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, OffsetCoord.roffsetToCube(OffsetCoord.ODD, b)));
    }


    public static testOffsetFromCube():void
    {
        Tests.equalOffsetcoord("offset_from_cube even-q", new OffsetCoord(1, 3), OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new Hex(1, 2, -3)));
        Tests.equalOffsetcoord("offset_from_cube odd-q", new OffsetCoord(1, 2), OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new Hex(1, 2, -3)));
    }


    public static testOffsetToCube():void
    {
        Tests.equalHex("offset_to_cube even-", new Hex(1, 2, -3), OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord(1, 3)));
        Tests.equalHex("offset_to_cube odd-q", new Hex(1, 2, -3), OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord(1, 2)));
    }


    public static testAll():void
    {
        Tests.testHexArithmetic();
        Tests.testHexDirection();
        Tests.testHexNeighbor();
        Tests.testHexDiagonal();
        Tests.testHexDistance();
        Tests.testHexRotateRight();
        Tests.testHexRotateLeft();
        Tests.testHexRound();
        Tests.testHexLinedraw();
        Tests.testLayout();
        Tests.testConversionRoundtrip();
        Tests.testOffsetFromCube();
        Tests.testOffsetToCube();
    }

}



// Tests
function complain(name) { console.log("FAIL", name); }
