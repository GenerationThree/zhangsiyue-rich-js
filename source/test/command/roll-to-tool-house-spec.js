import Player from '../../src/player/Player';
import Place from '../../src/place/Place';
import Map from '../../src/GameMap';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import BuyToolResponse from '../../src/command/BuyToolResponse';
import ToolHouse from '../../src/place/ToolHouse';
import {POINTS_LIMIT} from '../../src/place/ToolHouse';
import {TOOL_TYPE} from '../../src/Tool';
import * as Status from '../../src/player/playerStatus';

describe('roll to tool house test', () => {
    let startPoint;
    let toolHouse;
    let player;
    let map;
    let dice;
    let rollCommand;
    let buyToolResponse;

    beforeEach(() => {
        startPoint = new Place();
        toolHouse = new ToolHouse();
        player = new Player(startPoint);
        map = new Map(startPoint, toolHouse);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);
        buyToolResponse = new BuyToolResponse(1);

        dice.next = () => (1);
    });

    it('should wait response when roll to tool house with enough points', () => {
        player.points = POINTS_LIMIT + 1;
        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(toolHouse.locateHere.indexOf(player) !== -1).toBe(true);
    });

    it('should end turn when roll to tool house without enough points', () => {
        player.points = POINTS_LIMIT - 1;
        player.execute(rollCommand);

        expect(player.status).toBe(Status.END_TURN);
    });

    it('should wait response after buy tool', () => {
       player.points = 100;
        player.execute(buyToolResponse);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(player.points).toBe(100 - TOOL_TYPE[1]);
        expect(player.tools.length).toBe(1);
    });

    it('should end turn after quite tool house', () => {
        player.points = 100;
        buyToolResponse.type = 'F';
        player.execute(buyToolResponse);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.points).toBe(100);
        expect(player.tools.length).toBe(0);
    });

    it('should end turn after buy tool without enough rest points', () => {
        player.points = TOOL_TYPE[1];
        player.execute(buyToolResponse);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.points).toBe(0);
        expect(player.tools.length).toBe(1);
    });
});