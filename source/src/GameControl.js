import Dice from "./Dice";
import * as GameStatus from './gameStatus';
import GameMap from "./GameMap";
import StartPoint from "./place/StartPoint";
import Estate from "./place/Estate";
import Hospital from "./place/Hospital";
import ToolHouse from "./place/ToolHouse";
import GiftHouse from "./place/GiftHouse";
import Prison from "./place/Prison";
import MagicHouse from "./place/MagicHouse";
import Mine from "./place/Mine";
import Player from "./player/Player";

export const INIT_BALANCE_LOW_LIMIT = 1000;
export const INIT_BALANCE_HIGH_LIMIT = 50000;

export default class GameControl {
    constructor() {
        this.players = [];
        this.dice = new Dice();
        this.initBalance = 10000;
        this.status = GameStatus.WAIT_INIT_BALANCE;
        this.currentPlayer = null;
        this.map = new GameMap();
        this.initGameMap();
    }

    initGameMap() {
        this.map.places.push(new StartPoint());
        for (let i = 0; i < 13; i++)
            this.map.places.push(new Estate(200));
        this.map.places.push(new Hospital());
        for (let i = 0; i < 13; i++)
            this.map.places.push(new Estate(200));
        this.map.places.push(new ToolHouse());
        for (let i = 0; i < 6; i++)
            this.map.places.push(new Estate(500));
        this.map.places.push(new GiftHouse());
        for (let i = 0; i < 13; i++)
            this.map.places.push(new Estate(300));
        this.map.places.push(new Prison());
        for (let i = 0; i < 13; i++)
            this.map.places.push(new Estate(200));
        this.map.places.push(new MagicHouse());
        this.map.places.push(new Mine(20));
        this.map.places.push(new Mine(80));
        this.map.places.push(new Mine(100));
        this.map.places.push(new Mine(40));
        this.map.places.push(new Mine(80));
        this.map.places.push(new Mine(60));
    }

    setInitBalance(balance){
        if(balance >= INIT_BALANCE_LOW_LIMIT && balance <= INIT_BALANCE_HIGH_LIMIT)
            this.initBalance = balance;
        this.status = GameStatus.WAIT_INIT_PLAYER;
    }

    initPlayers(...ids){
        let startPoint = this.map.places.filter(p => p instanceof StartPoint)[0];
        ids.forEach(id => {
            var player = new Player(startPoint, this.initBalance, id);
            this.players.push(player);
            startPoint.locateHere.push(player);
        });
        this.players = this.players.sort((a,b) =>(a.id - b.id));
        this.status = GameStatus.IN_PROCESS;
    }
}