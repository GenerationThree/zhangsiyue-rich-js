import Player from '../../src/player/Player';

describe('player select tool test', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    it('should increase balance when select bonus', () => {
        player.balance = 100;
        player.selectGift(1);

        expect(player.balance).toBe(100 + 2000);
    });

    it('should increase points when select points', () => {
        player.points = 100;
        player.selectGift(2);

        expect(player.points).toBe(100 + 200);
    });

    it('should get five rest free turns when select free turns', () => {
        player.selectGift(3);

        expect(player.freeTurns).toBe(5);
    });
});