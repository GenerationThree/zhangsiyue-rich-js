import Place from "./Place";
import * as Status from '../player/playerStatus';

export default class StartPoint extends Place{
    arrive(){
        return Status.END_TURN;
    }
}