import Command from './Command';

export default class RollCommand extends Command {
    constructor(map, dice) {
        super();
        this.map = map;
        this.dice = dice;
    }

    execute(player) {
        let target = this.map.move(player.currentPlace, this.dice.next());
        player.moveTo(target);
        return target.arrive(player);
    }
}