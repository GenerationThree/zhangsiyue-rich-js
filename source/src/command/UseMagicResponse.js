import Command from "./Command";
import * as Status from '../player/playerStatus';

export default class UseMagicResponse extends Command{
    execute(){
        return Status.END_TURN;
    }
}