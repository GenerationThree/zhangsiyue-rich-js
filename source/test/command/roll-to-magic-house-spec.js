import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import UseMagicResponse from '../../src/command/UseMagicResponse';
import MagicHouse from "../../src/place/MagicHouse";
import Place from "../../src/place/Place";
import * as Status from '../../src/status';
import Player from "../../src/Player";

describe('roll to magic house test', () => {
    let startPoint;
    let magicHouse;
    let player;
    let map;
    let dice;
    let rollCommand;
    let useMagicResponse;

    beforeEach(() => {
        startPoint = new Place();
        magicHouse = new MagicHouse();
        player = new Player(startPoint);
        map = new Map(startPoint, magicHouse);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);
        useMagicResponse = new UseMagicResponse();

        dice.next = () => (1);
    });

    it('should wait response when roll to magic house', ()=>{
       player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
    });

    it('should end turn after use magic response', () => {
        player.execute(rollCommand);
        player.execute(useMagicResponse);

        expect(player.status).toBe(Status.END_TURN);
    });

});