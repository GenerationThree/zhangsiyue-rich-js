import * as Status from './status';

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
            this.action = '财富不足，无法购买空地'
    }

}