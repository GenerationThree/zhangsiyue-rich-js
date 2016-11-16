import * as Status from './status';
import {LEVEL_LIMIT} from './place/Estate';

export default class Player{
    constructor(startPoint, balance){
        this.status = Status.WAIT_COMMAND;
        this.currentPlace = startPoint;
        this.action = null;
        this.balance = balance;
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

}