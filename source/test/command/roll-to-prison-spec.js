import Player from '../../src/player/Player';
import Place from '../../src/place/Place';
import Map from '../../src/GameMap';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import Prison from "../../src/place/Prison";
import * as Status from '../../src/player/playerStatus';

describe('roll to prison test', () => {
    let startPoint;
    let prison;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        prison = new Prison();
        player = new Player(startPoint);
        map = new Map(startPoint, prison);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
    });

    it('should end turn and wait three turns when roll to prison', () => {
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.waitTurns).toBe(3);
        expect(prison.locateHere.indexOf(player) !== -1).toBe(true);
    });
});