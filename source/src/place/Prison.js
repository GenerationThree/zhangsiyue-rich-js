import Place from './Place';
import * as Status from '../player/playerStatus';


export default class Prison extends Place{
    constructor(){
        super();
    }

    arrive(player){
        this.locateHere.push(player);
        player.waitTurns = 3;
        return Status.END_TURN;
    }
}