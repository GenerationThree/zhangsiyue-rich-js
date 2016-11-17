import Player from '../../src/Player';
import Place from '../../src/place/Place';
import Hospital from '../../src/place/Hospital';
import Prison from '../../src/place/Prison';
import Estate from '../../src/place/Estate';
import Map from '../../src/Map';
import {LEVEL_LIMIT} from '../../src/place/Estate';
import Tool from "../../src/Tool";
import {TOOL_TYPE} from "../../src/Tool";

describe('player action test', () => {
    let startPoint;
    let targetPoint;
    let player;
    let empty;
    let estate;
    let hospital;
    let prison;

    beforeEach(() => {
        startPoint = new Place();
        targetPoint = new Place();
        player = new Player();
        hospital = new Hospital();
        prison = new Prison();
        empty = new Estate(200);
        estate = new Estate(200);
        estate.level = 0;

        player.balance = 1000;
    });

    it('should move to target place', ()=> {
        player.currentPlace = startPoint;

        player.moveTo(targetPoint);

        expect(player.currentPlace).toBe(targetPoint);
    });

    it('should buy empty', () => {
        player.currentPlace = empty;

        player.buyCurrent();

        expect(player.balance).toBe(1000 - 200);
        expect(empty.owner).toBe(player);
        expect(player.action).toBe('购买空地');
        expect(player.estates.length).toBe(1);
    })

    it('should not buy empty without enough money', () => {
        empty.price = 1001;
        player.currentPlace = empty;

        player.buyCurrent();

        expect(player.balance).toBe(1000);
        expect(empty.owner).toBe(null);
        expect(player.action).toBe('财富不足,无法购买空地');
        expect(player.estates.length).toBe(0);
    });

    it('should build owned estate', () => {
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000 - 200);
        expect(estate.level).toBe(1);
        expect(player.action).toBe('建设房产');
    });

    it('should not build owned estate without enough balance', () => {
        estate.price = 1001;
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000);
        expect(estate.level).toBe(0);
        expect(player.action).toBe('财富不足,无法建设房产');
    });

    it('should not build top level owned estate', () => {
        estate.level = LEVEL_LIMIT;
        player.currentPlace = estate;

        player.buildCurrent();

        expect(player.balance).toBe(1000);
        expect(estate.level).toBe(LEVEL_LIMIT);
        expect(player.action).toBe('房产已到最高级');
    });

    it('should pay fee to current estate owner', () => {
        player.currentPlace = estate;
        let otherPlayer = new Player();
        otherPlayer.balance = 1000;
        otherPlayer.currentPlace = estate;
        estate.owner = otherPlayer;

        player.payFee();

        expect(player.balance).toBe(1000 - estate.getFee());
        expect(player.action).toBe('交过路费' + estate.getFee() + '元');
        expect(otherPlayer.balance).toBe(1000 + estate.getFee());
    });

    it('should not pay fee to current estate owner with free turns', () => {
        player.freeTurns = 1;
        player.currentPlace = estate;
        let otherPlayer = new Player();
        otherPlayer.balance = 1000;
        estate.owner = otherPlayer;

        player.payFee();

        expect(player.balance).toBe(1000);
        expect(otherPlayer.balance).toBe(1000);
    });

    it('should not pay fee to current estate owner when owner is in hospital or prison', () => {
        player.freeTurns = 1;
        player.currentPlace = estate;
        let otherPlayer = new Player();
        estate.owner = otherPlayer;
        otherPlayer.balance = 1000;
        otherPlayer.currentPlace = hospital;

        player.payFee();

        expect(player.balance).toBe(1000);
        expect(otherPlayer.balance).toBe(1000);

        otherPlayer.currentPlace = prison;

        player.payFee();

        expect(player.balance).toBe(1000);
        expect(otherPlayer.balance).toBe(1000);
    });

    it('should sell owned estate', () => {
        estate.owner = player;
        estate.level = 1;
        player.estates.push(estate);
        let map = new Map(estate);

        player.sellEstate(map, 0);

        expect(player.balance).toBe(1000 + 2 * 200 * 2);
        expect(player.estates.length).toBe(0);
        expect(estate.owner).toBe(null);
        expect(estate.level).toBe(0);
    })

    it('should not sell not owned estate', () => {
        let otherPlayer = new Player();
        estate.owner = otherPlayer;
        estate.level = 1;
        let map = new Map(estate);

        player.sellEstate(map, 0);

        expect(player.balance).toBe(1000);
        expect(estate.owner).toBe(otherPlayer);
        expect(estate.level).toBe(1);
    })

    it('should sell tool', () => {
        let tool = new Tool(1);
        player.tools = [tool];
        player.points = 0;

        player.sellTool(1);

        expect(player.points).toBe(TOOL_TYPE[1]);
        expect(player.tools.filter(tool => tool.type === 1).length).toBe(0);
    })

    it('should not sell tool not have', () => {
        let tool = new Tool(2);
        player.tools = [tool];
        player.points = 0;

        player.sellTool(1);

        expect(player.points).toBe(0);
        expect(player.tools.length).toBe(1);
    });

});