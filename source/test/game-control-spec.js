import GameControl from "../src/GameControl";
import * as GameStatus from '../src/gameStatus';
import StartPoint from "../src/place/StartPoint";
import Player from "../src/player/Player";
import * as PlayerStatus from '../src/player/playerStatus';

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

    it('should find first player and start his turn when init game', () => {
        let firstPlayer = new Player(1, 10000);
        let secondPlayer = new Player(2, 10000);
        game.players = [firstPlayer, secondPlayer];
        game.currentPlayer = undefined;
        game.startTurn();

        expect(game.currentPlayer).toBe(firstPlayer);
        expect(firstPlayer.status).toBe(PlayerStatus.WAIT_COMMAND);
    });

    it('should skip the wait player', () => {
        let firstPlayer = new Player();
        let secondPlayer = new Player();
        secondPlayer.waitTurns = 1;
        game.players = [firstPlayer, secondPlayer];
        game.currentPlayer = firstPlayer;

        game.startTurn();

        expect(game.currentPlayer).toBe(secondPlayer);
        expect(firstPlayer.status).toBe(PlayerStatus.END_TURN);
    });

    it('should end game when find winner', () => {
        let firstPlayer = new Player();
        let secondPlayer = new Player();
        firstPlayer.status = PlayerStatus.END_GAME;
        secondPlayer.status = PlayerStatus.END_TURN;
        game.players = [firstPlayer, secondPlayer];
        game.currentPlayer = firstPlayer;

        game.endTurn();

        expect(game.winner).toBe(secondPlayer);
        expect(game.status).toBe(GameStatus.END);
    });
});