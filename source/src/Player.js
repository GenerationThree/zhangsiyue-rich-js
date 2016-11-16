import * as Status from './status';

export default class Player{
    constructor(){
        this.status = Status.WAIT_COMMAND;
    }

    execute(command){
        this.status = command.execute(this);
    }
}