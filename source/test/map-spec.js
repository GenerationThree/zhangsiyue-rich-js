import Map from '../src/Map';

describe('player command respond test', () => {
    let startPoint, endPoint;

    it('should return target place', () =>{
        let map = new Map(startPoint, endPoint);

        expect(map.move(startPoint, 1)).toBe(endPoint);
        expect(map.move(startPoint, 2)).toBe(startPoint);
    })
});