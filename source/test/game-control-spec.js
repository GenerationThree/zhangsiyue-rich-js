import GameControl from "../src/GameControl";
import * as GameStatus from '../src/gameStatus';
import StartPoint from "../src/place/StartPoint";

describe('game control test', () => {
    let game;

    beforeEach(()=>{
       game = new GameControl();
    });

    it('should be wait init player after set init balance', ()=>{
        expect(game.initBalance).toBe(10000);

        game.setInitBalance(20000);

        expect(game.initBalance).toBe(20000);
        expect(game.status).toBe(GameStatus.WAIT_INIT_PLAYER);
    });

    it('should be wait init player after set invalid init balance and keep init balance default value', ()=>{
        expect(game.initBalance).toBe(10000);

        game.setInitBalance(999);

        expect(game.initBalance).toBe(10000);
        expect(game.status).toBe(GameStatus.WAIT_INIT_PLAYER);
    });

    it('should be in process after init player', () => {
        game.initPlayers(3,1,2);

        expect(game.players.length).toBe(3);
        expect(game.players[0].id).toBe(1);
        let startPoint = game.map.places.filter(p => p instanceof StartPoint)[0];
        expect(game.players[0].currentPlace).toBe(startPoint);
        expect(startPoint.locateHere.length).toBe(3);
    });
});