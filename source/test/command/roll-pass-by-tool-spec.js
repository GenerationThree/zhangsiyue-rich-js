import Player from '../../src/player/Player';
import Place from '../../src/place/Place';
import Map from '../../src/GameMap';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import Hospital from "../../src/place/Hospital";
import * as Status from '../../src/player/playerStatus';

describe('roll pass by tool test', () =>{
    let startPoint;
    let toolPoint;
    let targetPlace;
    let hospital;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        toolPoint = new Place();
        targetPlace = new Place();
        hospital = new Hospital();
        player = new Player(startPoint);
        map = new Map(startPoint, toolPoint, targetPlace, hospital);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (2);
    });

    it('should stop at blocked place', ()=>{
        toolPoint.blocked = true;

        player.execute(rollCommand);

        expect(player.currentPlace).toBe(toolPoint);
        expect(toolPoint.blocked).toBe(false);
    });

    it('should bombed when pass by bombed place', () => {
        toolPoint.hasBomb = true;

        player.execute(rollCommand);

        expect(player.currentPlace).toBe(hospital);
        expect(hospital.locateHere.indexOf(player) !== -1).toBe(true);
        expect(player.status).toBe(Status.END_TURN);
        expect(player.waitTurns).toBe(3);
        expect(toolPoint.hasBomb).toBe(false);
    });
});