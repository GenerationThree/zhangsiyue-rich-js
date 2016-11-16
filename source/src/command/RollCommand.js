import Command from './Command';
import * as Status from '../status';
import Estate from '../place/Estate';

export default class RollCommand extends Command {
    constructor(map, dice) {
        super();
        this.map = map;
        this.dice = dice;
    }

    execute(player) {
        let target = this.map.move(player.currentPlace, this.dice.next());
        player.moveTo(target);
        if (player.currentPlace instanceof Estate) {

            if (player.currentPlace.owner === null) {
                player.action = '走到空地';
                return Status.WAIT_RESPONSE;
            }

            if (player.currentPlace.owner === player){
                player.action = '走到所属地产';
                return Status.WAIT_RESPONSE;
            }

        }
    }
}