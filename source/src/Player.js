import * as Status from './status';

export default class Player{
    constructor(startPoint){
        this.status = Status.WAIT_COMMAND;
        this.currentPlace = startPoint;
        this.action = null;
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

}