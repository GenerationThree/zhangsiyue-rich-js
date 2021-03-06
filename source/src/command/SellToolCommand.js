import Command from "./Command";
import * as Status from '../player/playerStatus';

export default class SellToolCommand extends Command{
    constructor(type){
        super();
        this.type = type;
    }

    execute(player){
        player.sellTool(this.type);
        return Status.WAIT_COMMAND;
    }
}