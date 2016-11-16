import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';

describe('player action test', () => {
        let startPoint;
    let targetPoint;
    let player;
    let empty;

    beforeEach(() => {
        startPoint = new Place();
        targetPoint = new Place();
        player = new Player();
        empty = new Estate(200);

        player.balance = 1000;
    });


    it('should move to target place', ()=> {
        player.currentPlace = startPoint;

        player.moveTo(targetPoint);

        expect(player.currentPlace).toBe(targetPoint);
    });

    it('should buy empty', () => {
        player.currentPlace = empty;

        player.buyCurrent();

        expect(player.balance).toBe(1000 - 200);
        expect(empty.owner).toBe(player);
        expect(player.action).toBe('购买空地');
    })

    it('should not buy empty without enough money', () => {
        empty.price = 1001;
        player.currentPlace = empty;

        player.buyCurrent();

        expect(player.balance).toBe(1000);
        expect(empty.owner).toBe(null);
        expect(player.action).toBe('财富不足，无法购买空地');
    });
});