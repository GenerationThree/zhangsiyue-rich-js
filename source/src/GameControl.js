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
import BuyToolResponse from "./command/BuyToolResponse";
import SellCommand from "./command/SellCommand";
import SellToolCommand from "./command/SellToolCommand";
import UseToolCommand from "./command/UseToolCommand";
import SelectGiftResponse from "./command/SelectGiftResponse";
import UseMagicResponse from "./command/UseMagicResponse";

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

    setInitBalance(balance) {
        if (balance >= INIT_BALANCE_LOW_LIMIT && balance <= INIT_BALANCE_HIGH_LIMIT)
            this.initBalance = balance;
        this.status = GameStatus.WAIT_INIT_PLAYER;
    }

    initPlayers(ids) {
        let startPoint = this.map.places.filter(p => p instanceof StartPoint)[0];
        ids.forEach(id => {
            var player = new Player(startPoint, this.initBalance, id);
            this.players.push(player);
            startPoint.locateHere.push(player);
        });
        this.players = this.players.sort((a, b) =>(a.id - b.id));
        this.status = GameStatus.IN_PROCESS;
    }

    startTurn() {

        if (this.currentPlayer === undefined)
            this.currentPlayer = this.players[0];
        else
            this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];

        this.currentPlayer.startTurn();
    }

    endTurn() {
        let survivePlayers = this.players.filter(p => p.status !== PlayerStatus.END_GAME);
        if (survivePlayers.length === 1) {
            this.winner = survivePlayers[0];
            this.status = GameStatus.END;
            console.log('游戏结束 ' + this.winner + '获胜' );
        }
    }

    execute(input, rl) {
        input = input.toLowerCase();
        if (this.status === GameStatus.WAIT_INIT_BALANCE) {
            rl.question('输入玩家初始金额（1000-50000):', (balance) => {
                this.setInitBalance(balance);
                rl.question('选择参与玩家(1,2,3,4):', (input) => {
                    this.execute(input, rl);
                });
            });
        }

        if (this.status === GameStatus.WAIT_INIT_PLAYER) {
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
        }

        if (this.status === GameStatus.IN_PROCESS) {
            input = input.split(' ');
            switch (this.currentPlayer.status) {
                case PlayerStatus.WAIT_COMMAND:
                    if (input[0] === 'roll') {
                        this.currentPlayer.execute(new RollCommand(this.map, this.dice));

                        if (this.currentPlayer.currentPlace instanceof Estate) {
                            if (this.currentPlayer.status === PlayerStatus.END_TURN) {
                                console.log('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '交过路费');
                                this.endTurn();
                                this.startTurn();
                                rl.question(this.currentPlayer.name + '->', (input) => {
                                    this.execute(input, rl);
                                });
                            }
                            else if (this.currentPlayer.currentPlace.owner === null) {
                                rl.question('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '是否购买空地？(y/n) ', (input)=> {
                                    this.execute(input, rl);
                                });
                            }
                            else {
                                rl.question('走到' + this.map.places.indexOf(this.currentPlayer.currentPlace) + '是否升级地产？(y/n) ', (input)=> {
                                    this.execute(input, rl);
                                });
                            }
                        }

                        if (this.currentPlayer.currentPlace instanceof Mine) {
                            console.log('走到矿地，获取点数' + this.currentPlayer.currentPlace.points);
                            this.endTurn();
                            this.startTurn();
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                        if (this.currentPlayer.currentPlace instanceof GiftHouse) {
                            if (this.currentPlayer.status === PlayerStatus.WAIT_RESPONSE) {
                                rl.question('走到道具屋，挑选道具:', ()=> {
                                    this.execute(input, rl);
                                });
                            }
                            else {
                                console.log('点数不足，自动退出道具屋');
                                this.endTurn();
                                this.startTurn();
                                rl.question(this.currentPlayer.name + '->', (input) => {
                                    this.execute(input, rl);
                                });
                            }
                        }

                        if(this.currentPlayer.currentPlace instanceof GiftHouse) {
                            rl.question('走到礼品屋，挑选礼品:', (input)=>{
                                this.execute(input, rl);
                            });
                        }

                        if(this.currentPlayer.currentPlace instanceof MagicHouse) {
                            rl.question('走到魔法屋，使用魔法:', (input)=>{
                                this.execute(input, rl);
                            });
                        }

                        if(this.currentPlayer.currentPlace instanceof Prison) {
                            console.log('走到监狱');
                            this.endTurn();
                            this.startTurn();
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                        if(this.currentPlayer.currentPlace instanceof Hospital) {
                            console.log('走到医院');
                            this.endTurn();
                            this.startTurn();
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                    }

                    if(input[0] === 'sell'){
                        this.currentPlayer.execute(new SellCommand(this.map, parseInt(input[1])));
                        rl.question(this.currentPlayer.name + '->', (input) => {
                            this.execute(input, rl);
                        });
                    }

                    if(input[0] === 'sellTool'){
                        this.currentPlayer.execute(new SellToolCommand(parseInt(input[1])));
                        rl.question(this.currentPlayer.name + '->', (input) => {
                            this.execute(input, rl);
                        });
                    }

                    if(input[0] === 'block'){
                        this.currentPlayer.execute(new UseToolCommand(this.map, 1, parseInt(input[1])));
                        rl.question(this.currentPlayer.name + '->', (input) => {
                            this.execute(input, rl);
                        });
                    }

                    if(input[0] === 'bomb'){
                        this.currentPlayer.execute(new UseToolCommand(this.map, 3, parseInt(input[1])));
                        rl.question(this.currentPlayer.name + '->', (input) => {
                            this.execute(input, rl);
                        });
                    }

                    if(input[0] === 'robot'){
                        this.currentPlayer.execute(new UseToolCommand(this.map, 2, 10));
                        rl.question(this.currentPlayer.name + '->', (input) => {
                            this.execute(input, rl);
                        });
                    }
                    break;

                case PlayerStatus.WAIT_RESPONSE:
                    if (input[0] === 'y') {

                        if (this.currentPlayer.currentPlace instanceof Estate) {
                            if (this.currentPlayer.currentPlace.owner === null) {
                                this.currentPlayer.execute(new YesToBuyResponse());
                            }
                            else {
                                this.currentPlayer.execute(new YesToBuildResponse());
                            }
                            this.endTurn();
                            this.startTurn();
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }
                    }

                    if (input[0] === 'n') {
                        if (this.currentPlayer.currentPlace instanceof Estate) {
                            if (this.currentPlayer.currentPlace.owner === null) {
                                this.currentPlayer.execute(new NoToBuyResponse());
                                this.endTurn();
                                this.startTurn();
                                rl.question(this.currentPlayer.name + '->', (input) => {
                                    this.execute(input, rl);
                                });
                            }
                            else {
                                this.currentPlayer.execute(new NoToBuildResponse());
                                this.endTurn();
                                this.startTurn();
                                rl.question(this.currentPlayer.name + '->', (input) => {
                                    this.execute(input, rl);
                                });
                            }
                        }
                    }

                    else {
                        if (this.currentPlayer.currentPlace instanceof ToolHouse) {
                            this.currentPlayer.execute(new BuyToolResponse(input[0]));
                            if (this.currentPlayer.status === PlayerStatus.END_TURN) {
                                this.endTurn();
                                this.startTurn();
                            }
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                        if(this.currentPlayer.currentPlace instanceof GiftHouse){
                            this.currentPlayer.execute(new SelectGiftResponse(parseInt(input[0])));
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                        if(this.currentPlayer.currentPlace instanceof MagicHouse){
                            this.currentPlayer.execute(new UseMagicResponse(parseInt(input[0])));
                            rl.question(this.currentPlayer.name + '->', (input) => {
                                this.execute(input, rl);
                            });
                        }

                    }

                    break;

                default:
            }

        }
    }
}