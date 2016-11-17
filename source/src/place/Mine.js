import Place from "./Place";
import * as Status from '../status';

export default class Mine extends Place{
    constructor(points){
        super();
        this.points = points;
    }

    arrive(player){
        player.points += this.points;
        return Status.END_TURN;
    }
}