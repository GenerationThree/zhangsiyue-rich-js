import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';

describe('player action test', () => {

    it('should move to target place', ()=> {
        let startPoint = new Place();
        let targetPoint = new Place();
        let player = new Player(startPoint);

        player.moveTo(targetPoint);

        expect(player.currentPlace).toBe(targetPoint);
    });

    it('should buy empty', () => {
        let startPoint = new Estate(200);
        let player = new Player(startPoint, 1000);

        player.buyCurrent();

        expect(player.balance).toBe(1000 - 200);
        expect(startPoint.owner).toBe(player);
    })
});