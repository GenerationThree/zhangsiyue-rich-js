import Command from "./Command";
import * as Status from '../player/playerStatus';

export default class SellCommand extends Command{
    constructor(map, position){
        super();
        this.map = map;
        this.position = position;
    }

    execute(player){
        player.sellEstate(this.map, this.position);
        return Status.WAIT_COMMAND;
    }
}