import Command from "./Command";
import * as Status from '../player/playerStatus';

export default class UseToolCommand extends Command{
    constructor(map, type, distance){
        super();
        this.map = map;
        this.type = type;
        this.distance = distance;
    }

    execute(player){
        player.useTool(this.type, this.distance, this.map);
        return Status.WAIT_COMMAND;
    }
}