import Command from './Command';
import Hospital from "../place/Hospital";

export default class RollCommand extends Command {
    constructor(map, dice) {
        super();
        this.map = map;
        this.dice = dice;
    }

    execute(player) {
        let target = this.map.move(player.currentPlace, this.dice.next());
        if(target.blocked){
            target.blocked = false;
        }
        if(target.hasBomb){
            player.waitTurns = 3;
            target.hasBomb = false;
            let  hospital = this.map.places.filter(place => place instanceof Hospital)[0];
            target = hospital;
        }
        player.moveTo(target);
        return target.arrive(player);
    }
}