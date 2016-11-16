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
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        targetPlace = new Estate(200);
        player = new Player(startPoint);
        map = new Map(startPoint, targetPlace);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
        targetPlace.owner = player;
    });

    it('should wait response when roll to owned estate', () => {
        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(player.action).toBe("走到所属地产");
        expect(player.currentPlace).toBe(targetPlace);
    });

});