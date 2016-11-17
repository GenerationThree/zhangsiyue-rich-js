import Place from './Place';
import * as Status from '../player/playerStatus';

export default class Hospital extends Place{
    constructor(){
        super();
    }

    arrive(player){
        this.locateHere.push(player);
        return Status.END_TURN;
    }
}