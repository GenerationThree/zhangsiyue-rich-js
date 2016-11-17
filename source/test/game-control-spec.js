import GameControl from "../src/GameControl";
import * as GameStatus from '../src/gameStatus';

describe('game control test', () => {
    it('should be wait init player after set init balance', ()=>{
        let game = new GameControl();

        expect(game.initBalance).toBe(10000);

        game.setInitBalance(20000);

        expect(game.initBalance).toBe(20000);
        expect(game.status).toBe(GameStatus.WAIT_INIT_PLAYER);
    });

    it('should be wait init player after set invalid init balance and keep init balance default value', ()=>{
        let game = new GameControl();

        expect(game.initBalance).toBe(10000);

        game.setInitBalance(999);

        expect(game.initBalance).toBe(10000);
        expect(game.status).toBe(GameStatus.WAIT_INIT_PLAYER);
    });
});