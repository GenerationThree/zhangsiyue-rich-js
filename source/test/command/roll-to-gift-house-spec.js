import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import SelectGiftResponse from '../../src/command/SelectGiftResponse';
import GiftHouse from "../../src/place/GiftHouse";
import * as Status from '../../src/status';

describe('roll to prison test', () => {
    let startPoint;
    let giftHouse;
    let player;
    let map;
    let dice;
    let rollCommand;
    let selectGiftResponse;

    beforeEach(() => {
        startPoint = new Place();
        giftHouse = new GiftHouse();
        player = new Player(startPoint);
        map = new Map(startPoint, giftHouse);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);
        selectGiftResponse = new SelectGiftResponse(1);

        dice.next = () => (1);
    });

    it('should wait response when roll to gift house', () => {
        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
    });

    it('should end turn after select gift response at gift house', () =>{
        player.balance = 100;

        player.execute(selectGiftResponse);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.balance).toBe(100 + 2000);
    });
});