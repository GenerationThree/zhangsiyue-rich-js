import Map from '../../src/GameMap';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import UseMagicResponse from '../../src/command/UseMagicResponse';
import MagicHouse from "../../src/place/MagicHouse";
import Place from "../../src/place/Place";
import * as Status from '../../src/player/playerStatus';
import Player from "../../src/player/Player";

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
        expect(magicHouse.locateHere.indexOf(player) !== -1).toBe(true);
    });

    it('should end turn after use magic response', () => {
        player.execute(rollCommand);
        player.execute(useMagicResponse);

        expect(player.status).toBe(Status.END_TURN);
    });

});