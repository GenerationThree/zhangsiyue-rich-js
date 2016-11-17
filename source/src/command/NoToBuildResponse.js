import Command from './Command';
import * as Status from '../player/playerStatus';

export default class YesToPromoteResponse extends Command{
    execute(){
        return Status.END_TURN;
    }
}