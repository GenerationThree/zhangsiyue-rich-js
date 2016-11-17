import Command from './Command';
import * as Status from '../player/playerStatus';

export default class YesToBuyResponse extends Command{
    execute(player){
        player.buyCurrent();
        return Status.END_TURN;
    }
}