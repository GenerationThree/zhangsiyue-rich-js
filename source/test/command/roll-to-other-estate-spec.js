import Player from '../../src/player/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';
import Map from '../../src/GameMap';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import * as Status from '../../src/player/playerStatus';

describe('roll to other estate test', () => {
    let startPoint;
    let targetPlace;
    let player;
    let otherPlayer;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        targetPlace = new Estate(200);
        targetPlace.level = 0;

        player = new Player(startPoint);
        player.freeTurns = -1;
        player.balance = 1000;

        otherPlayer = new Player(startPoint);
        otherPlayer.currentPlace = targetPlace;
        otherPlayer.balance = 1000;

        map = new Map(startPoint, targetPlace);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
        targetPlace.owner = otherPlayer;
    });

    it('should end turn when roll to other estate', () => {
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.balance).toBe(1000 - targetPlace.getFee());
        expect(otherPlayer.balance).toBe(1000 + targetPlace.getFee());
        expect(targetPlace.locateHere.indexOf(player) !== -1).toBe(true);
    });

    it('should end game when roll to other estate with out enough balance', () => {
        let estate = new Estate(200);
        estate.owner = player;
        player.estates.push(estate);
        player.balance = targetPlace.getFee() - 1;
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_GAME);
        expect(player.action).toBe("破产啦");
        player.estates.forEach(estate => {
            expect(estate.owner).toBe(null);
            expect(estate.level).toBe(0);
        });
        expect(otherPlayer.balance).toBe(1000);
    });
});