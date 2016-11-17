import * as Status from './status';
import {LEVEL_LIMIT} from './place/Estate';
import Hospital from './place/Hospital';
import Prison from './place/Prison';
import {TOOL_TYPE} from './Tool';
import Tool from "./Tool";

export default class Player{
    constructor(startPoint, balance){
        this.status = Status.WAIT_COMMAND;
        this.currentPlace = startPoint;
        this.action = null;
        this.balance = balance;
        this.points = 0;
        this.freeTurns = -1;
        this.waitTurns = -1;
        this.estates = [];
        this.tools = [];
    }

    execute(command){
        this.status = command.execute(this);
    }

    respond(response){
        this.status = response.execute(this);
    }

    moveTo(target){
        this.currentPlace = target;
    }

    buyCurrent(){
        if (this.balance >= this.currentPlace.price) {
            this.balance -= this.currentPlace.price;
            this.currentPlace.owner = this;
            this.estates.push(this.currentPlace);
            this.action = '购买空地'
        }
        else
            this.action = '财富不足,无法购买空地'
    }

    buildCurrent(){
        if(this.currentPlace.level == LEVEL_LIMIT){
            this.action = '房产已到最高级';
        }else
        if(this.balance >= this.currentPlace.price) {
            this.balance -= this.currentPlace.price;
            this.currentPlace.level++;
            this.action = '建设房产';
        }else
            this.action = '财富不足,无法建设房产';
    }

    payFee(){
        if(this.freeTurns < 0
            && !(this.currentPlace.owner.currentPlace instanceof Hospital)
            && !(this.currentPlace.owner.currentPlace instanceof Prison)) {
            let fee = this.currentPlace.getFee();
            this.balance -= fee;
            this.currentPlace.owner.gainFee(fee);
            this.action = '交过路费' + fee + '元';
        }
    }

    gainFee(fee){
        this.balance += fee;
    }

    buyTool(type){
        let price = TOOL_TYPE[type];
        if(price <= this.points) {
            this.points -= price;
            this.tools.push(new Tool(type));
        }
    }

}