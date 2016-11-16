import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Estate from '../../src/place/Estate';
import Map from '../../src/Map';
import Dice from '../../src/Dice';
import RollCommand from '../../src/command/RollCommand';
import YesToBuyResponse from '../../src/command/YesToBuyResponse';
import NoToBuyResponse from '../../src/command/NoToBuyResponse';
import * as Status from '../../src/status';


describe('roll to empty test', () => {

    let startPoint;
    let targetPlace;
    let player;
    let map;
    let dice;
    let rollCommand;

    beforeEach(() => {
        startPoint = new Place();
        targetPlace = new Estate();
        player = new Player(startPoint);
        map = new Map(startPoint, targetPlace);
        dice = new Dice();
        rollCommand = new RollCommand(map, dice);

        dice.next = () => (1);
    });

    it('should player be wait response when roll to empty', ()=> {

        player.execute(rollCommand);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
        expect(player.action).toBe("走到空地");
        expect(player.currentPlace).toBe(targetPlace);
    });

    it('should be end turn when respond yes to buy empty', ()=> {
        targetPlace.price = 200;
        player.currentPlace = targetPlace;
        player.balance = 1000;
        let yesToBuy = new YesToBuyResponse();

        player.execute(yesToBuy);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.balance).toBe(1000 - 200);
    })

    it('should be end turn when respond no to buy empty', ()=> {
        player.balance = 1000;
        player.currentPlace = targetPlace;
        let noToBuy = new NoToBuyResponse();

        player.execute(noToBuy);

        expect(player.status).toBe(Status.END_TURN);
        expect(player.balance).toBe(1000);
    })
});