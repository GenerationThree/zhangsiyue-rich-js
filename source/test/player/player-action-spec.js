import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';
import {LEVEL_LIMIT} from '../../src/place/Estate';

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
        expect(player.action).toBe('财富不足,无法购买空地');
    });

    it('should build owned estate', () => {
        let estate = new Estate(200);
        estate.level = 0;
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000 - 200);
        expect(estate.level).toBe(1);
        expect(player.action).toBe('建设房产');
    });

    it('should not build owned estate without enough balance', () => {
        let estate = new Estate(1001);
        estate.level = 0;
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000);
        expect(estate.level).toBe(0);
        expect(player.action).toBe('财富不足,无法建设房产');
    });

    it('should not build top level owned estate', () => {
        let estate = new Estate(200);
        estate.level = LEVEL_LIMIT;
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000);
        expect(estate.level).toBe(LEVEL_LIMIT);
        expect(player.action).toBe('房产已到最高级');
    });
});