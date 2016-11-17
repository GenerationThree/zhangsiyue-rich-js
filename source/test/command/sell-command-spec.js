import Player from '../../src/player/Player';
import Estate from '../../src/place/Estate';
import Map from '../../src/GameMap';
import SellCommand from '../../src/command/SellCommand';
import * as Status from '../../src/player/playerStatus';

describe('sell command test', () => {
    it('should be wait command after sell command', () => {
        let player = new Player();
        let estate = new Estate(200);
        let map = new Map(estate);
        estate.owner = player;
        estate.level = 1;
        player.estates = [estate];
        player.balance = 0;
        let sellCommand = new SellCommand(map, 0);

        player.execute(sellCommand);

        expect(player.status).toBe(Status.WAIT_COMMAND);
        expect(player.balance).toBe(2 * 2 * 200);
        expect(player.estates.length).toBe(0);
        expect(estate.owner).toBe(null);
        expect(estate.level).toBe(0);
    });
})