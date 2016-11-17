import Place from '../src/place/Place';
import Map from '../src/GameMap';
import Tool from '../src/Tool';
import Player from "../src/player/Player";


describe('tool test', () => {
    let map;
    let startPoint;
    let targetPoint;
    let otherPoint;
    let player;
    let tool;

    beforeEach(() =>{
        startPoint = new Place();
        targetPoint = new Place();
        otherPoint = new Place();
        map = new Map(startPoint, otherPoint, targetPoint);
        player = new Player();
    });

    it('should use block at specified place', () => {
        tool = new Tool(1);

        expect(targetPoint.blocked).toBe(false);

        expect(tool.use(map, startPoint, 2)).toBe(true);

        expect(targetPoint.blocked).toBe(true);
    });

    it('should use bomb at specified place', () => {
        tool = new Tool(3);

        expect(targetPoint.blocked).toBe(false);

        expect(tool.use(map, startPoint, 2)).toBe(true);

        expect(targetPoint.hasBomb).toBe(true);
    });

    it('should remove tools in distance when use robot', () => {
        tool = new Tool(2);

        let bombPoint = new Place();
        bombPoint.hasBomb = true;

        let blockPoint = new Place();
        blockPoint.blocked = true;

        let outPoint = new Place();
        outPoint.hasBomb = true;

        map = new Map(startPoint, bombPoint, blockPoint, outPoint);

        expect(tool.use(map, startPoint, 2)).toBe(true);

        expect(bombPoint.hasBomb).toBe(false);
        expect(blockPoint.blocked).toBe(false);
        expect(outPoint.hasBomb).toBe(true);
    });

    it('should not set tool where already have tool', () => {
        tool = new Tool(1);
        targetPoint.hasBomb = true;

        expect(tool.use(map, startPoint, -1)).toBe(false);
    });

    it('should not set tool where player locate', () => {
        tool = new Tool(1);
        targetPoint.hasBomb = false;
        targetPoint.locateHere.push(player);

        expect(tool.use(map, startPoint, -1)).toBe(false);
    });

});