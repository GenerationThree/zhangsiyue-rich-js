import Map from '../src/Map';
import Place from "../src/place/Place";

describe('map test', () => {
    let startPoint = new Place();
    let endPoint = new Place();

    it('should return target place', () =>{
        let map = new Map(startPoint, endPoint);

        expect(map.move(startPoint, 1)).toBe(endPoint);
        expect(map.move(startPoint, 2)).toBe(startPoint);
    });

    it('should stop at block when move', () => {
        let blockPoint = new Place();
        blockPoint.blocked = true;
        let map = new Map(startPoint, blockPoint, endPoint);

        expect(map.move(startPoint, 2)).toBe(blockPoint);
    });

    it('should stop at bomb when move', () => {
        let blockPoint = new Place();
        blockPoint.blocked = true;
        let map = new Map(startPoint, blockPoint, endPoint);

        expect(map.move(startPoint, 2)).toBe(blockPoint);
    });
});