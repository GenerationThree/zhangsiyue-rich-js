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
import * as PlayerStatus from './player/playerStatus';
import RollCommand from "./command/RollCommand";
import YesToBuyResponse from "./command/YesToBuyResponse";
import YesToBuildResponse from "./command/YesToBuildResponse";
import NoToBuyResponse from "./command/NoToBuyResponse";
import NoToBuildResponse from "./command/NoToBuildResponse";

export const INIT_BALANCE_LOW_LIMIT = 1000;
export const INIT_BALANCE_HIGH_LIMIT = 50000;

export default class GameControl {
    constructor() {
        this.players = [];
        this.dice = new Dice();
        this.initBalance = 10000;
        this.status = GameStatus.WAIT_INIT_BALANCE;
        this.currentPlayer = undefined;
        this.winner = undefined;
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

    initPlayers(ids){
        let startPoint = this.map.places.filter(p => p instanceof StartPoint)[0];
        ids.forEach(id => {
            var player = new Player(startPoint, this.initBalance, id);
            this.players.push(player);
            startPoint.locateHere.push(player);
        });
        this.players = this.players.sort((a,b) =>(a.id - b.id));
        this.status = GameStatus.IN_PROCESS;
    }

    startTurn(){

        if(this.currentPlayer === undefined)
            this.currentPlayer = this.players[0];
        else
            this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer)+1)%this.players.length];

        this.currentPlayer.startTurn();
    }

    endTurn(){
        let survivePlayers = this.players.filter(p => p.status !== PlayerStatus.END_GAME);
        if(survivePlayers.length === 1){
            this.winner = survivePlayers[0];
            this.status = GameStatus.END;
        }
    }

    execute(input, rl){
        input = input.toLowerCase();
        if(input === 'rich'){
            rl.question('输入玩家初始金额（1000-50000):', (balance) => {
                this.setInitBalance(balance);

                rl.question('选择参与玩家(1,2,3,4):', (input) =>{
                    let idsInput = input.split(',');
                    let ids = [];
                    idsInput.forEach(id => {
                        ids.push(parseInt(id));
                    })
                    this.initPlayers(ids);
                    this.startTurn();
                    rl.question(this.currentPlayer.name + '->', (input) => {
                        this.execute(input, rl);
                    });
                });
            });
        }

        if(input === 'roll'){
            this.currentPlayer.execute(new RollCommand(this.map, this.dice));
            if(this.currentPlayer.currentPlace instanceof Estate) {
                if(this.currentPlayer.status === PlayerStatus.END_TURN) {
                    console.log('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '交过路费');
                    this.endTurn();
                }
                else
                if(this.currentPlayer.currentPlace.owner === null){
                    rl.question('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '是否购买空地？(y/n) ', (input)=>{
                        this.execute(input, rl);
                    });
                }
                else {
                    rl.question('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '是否升级地产？(y/n) ', (input)=>{
                        this.execute(input, rl);
                    });
                }
            }

            if(this.currentPlayer.currentPlace instanceof Mine){
                console.log('走到矿地，获取点数' + this.currentPlayer.currentPlace.points);
                this.endTurn();
                this.startTurn();
                rl.question(this.currentPlayer.name + '->', (input) => {
                    this.execute(input, rl);
                });
            }

        }

        if(input === 'y'){
            if(this.currentPlayer.currentPlace instanceof Estate) {
                if(this.currentPlayer.currentPlace.owner === null){
                    this.currentPlayer.execute(new YesToBuyResponse());
                    // console.log('购买空地');
                }
                else {
                    this.currentPlayer.execute(new YesToBuildResponse());
                    // console.log('升级地产');
                }
                this.endTurn();
                this.startTurn();
                rl.question(this.currentPlayer.name + '->', (input) => {
                    this.execute(input, rl);
                });
            }
        }

        if(input === 'n'){
            if(this.currentPlayer.currentPlace instanceof Estate) {
                if(this.currentPlayer.currentPlace.owner === null){
                    this.currentPlayer.execute(new NoToBuyResponse());
                    // console.log('购买空地');
                }
                else {
                    this.currentPlayer.execute(new NoToBuildResponse());
                    // console.log('升级地产');
                }
                this.endTurn();
                this.startTurn();
                rl.question(this.currentPlayer.name + '->', (input) => {
                    this.execute(input, rl);
                });
            }
        }

    }
}