import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import * as Status from '../../src/status';


describe('roll to empty test', () =>{

    it('should player be wait response when roll to empty', ()=>{
       let startPoint = new Place();
       let targetPlace = new Place();
        let player = new Player(startPoint);
        let map = new Map(startPoint, targetPlace);
        let dice = new Dice();
        dice.next = () => (1);
        let rollCommand = new RollCommand(map, dice);

        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(player.currentPlace).toBe(targetPlace);
    });
});