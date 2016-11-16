import Command from './Command';
import * as Status from '../status';

export default class NoToBuyResponse extends Command{
    execute(player){
        player.action = '';
        return Status.END_TURN;
    }
}