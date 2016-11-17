import Place from './Place';
import * as Status from '../player/playerStatus';

export default class GiftHouse extends Place{
    arrive(player){
        this.locateHere.push(player);
        return Status.WAIT_RESPONSE;
    }
}