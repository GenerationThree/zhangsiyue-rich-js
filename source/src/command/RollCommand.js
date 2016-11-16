import Command from './Command';
import * as Status from '../status';

export default class RollCommand extends Command{
    constructor(map, dice){
        super();
        this.map = map;
        this.dice = dice;
    }

    execute(player){
        let target = this.map.move(player.currentPlace, this.dice.next());
        player.moveTo(target);
        player.action = '走到空地';
        return Status.WAIT_RESPONSE;
    }
}