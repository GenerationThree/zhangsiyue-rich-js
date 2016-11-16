import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import * as Status from '../../src/status';

describe('roll to owned estate test', () => {
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
        player = new Player(startPoint);
        otherPlayer = new Player(startPoint);
        map = new Map(startPoint, targetPlace);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
        targetPlace.owner = otherPlayer;
    });

    it('should end turn when roll to other estate', () => {
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
    });
});