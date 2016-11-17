import Place from './Place';
import * as Status from '../status';

export const LEVEL_LIMIT = 3;

export default class Estate extends Place{
    constructor(price){
        super();
        this.owner = null;
        this.price = price;
        this.level = 0;
    }

    arrive(player){
        switch (this.owner){
            case null:
                player.action = '走到空地';
                return Status.WAIT_RESPONSE;
            case player:
                player.action = '走到所属地产';
                return Status.WAIT_RESPONSE;
            default:
                if (player.balance < this.getFee()) {
                    player.action = '破产啦';
                    player.estates.forEach(estate => {
                        estate.owner = null;
                        estate.level = 0;
                    });
                    return Status.END_GAME;
                } else {
                    player.payFee();
                    return Status.END_TURN;
                }
        }
    }

    getFee(){
        return this.price * Math.pow(2, this.level-1);
    }
}