import Place from './Place';
import * as Status from '../status';

export const POINTS_LIMIT = 30;

export default class ToolHouse extends Place{
    constructor(){
        super();
    }

    arrive(player){
        this.locateHere.push(player);
        if(player.points >= POINTS_LIMIT)
            return Status.WAIT_RESPONSE;
        else
            return Status.END_TURN;
    }
}