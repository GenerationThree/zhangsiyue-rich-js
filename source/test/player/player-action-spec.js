import Player from '../../src/Player';
import Place from '../../src/place/Place';

describe('player action test', () => {

    it('should move to target place', ()=> {
        let startPoint = new Place();
        let targetPoint = new Place();
        let player = new Player(startPoint);

        player.moveTo(targetPoint);

        expect(player.currentPlace).toBe(targetPoint);
    });
});