import Command from "./Command";
import {POINTS_LIMIT} from '../place/ToolHouse';
import * as Status from '../status';

export default class BuyToolResponse extends Command{

    constructor(type){
        super();
        this.type = type;
    }

    execute(player){
        player.buyTool(this.type);

        if(this.type === 'F' || this.type === 'f')
            return Status.END_TURN;

        if(player.points < POINTS_LIMIT)
            return Status.END_TURN;
        else
            return Status.WAIT_RESPONSE;
    }
}