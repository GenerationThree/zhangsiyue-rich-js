import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import * as Status from '../../src/status';


describe('roll to empty test', () =>{

    let startPoint;
    let targetPlace ;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        targetPlace = new Place();
        player = new Player(startPoint);
        map = new Map(startPoint, targetPlace);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
    });

    it('should player be wait response when roll to empty', ()=>{

        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(player.action).toBe("走到空地");
        expect(player.currentPlace).toBe(targetPlace);
    });
});