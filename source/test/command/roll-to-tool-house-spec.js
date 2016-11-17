import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import ToolHouse from "../../src/place/ToolHouse";
import {POINTS_LIMIT} from "../../src/place/ToolHouse";
import * as Status from '../../src/status';

describe('roll to tool house test', () => {
    let startPoint;
    let toolHouse;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        toolHouse = new ToolHouse();
        player = new Player(startPoint);
        map = new Map(startPoint, toolHouse);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
    });

    it('should wait response when roll to tool house with enough points', () => {
        player.points = POINTS_LIMIT + 1;
        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
    });

    it('should end turn when roll to tool house without enough points', () => {
        player.points = POINTS_LIMIT - 1;
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
    });
});