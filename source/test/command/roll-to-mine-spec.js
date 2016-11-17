import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import Mine from "../../src/place/Mine";
import * as Status from '../../src/status';

describe('roll to mine test', () => {
    let startPoint;
    let mine;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        mine = new Mine(20);
        player = new Player(startPoint);
        map = new Map(startPoint, mine);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
    });

    it('should end turn and gain points when roll to mine', ()=>{
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.points).toBe(20);
        expect(mine.locateHere.indexOf(player) !== -1).toBe(true);
    });
});