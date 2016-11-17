import Place from "./Place";
import * as Status from '../player/playerStatus';

export default class Mine extends Place{
    constructor(points){
        super();
        this.points = points;
    }

    arrive(player){
        this.locateHere.push(player);
        player.points += this.points;
        return Status.END_TURN;
    }
}