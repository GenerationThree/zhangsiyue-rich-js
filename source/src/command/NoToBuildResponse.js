import Command from './Command';
import * as Status from '../status';

export default class YesToPromoteResponse extends Command{
    execute(){
        return Status.END_TURN;
    }
}