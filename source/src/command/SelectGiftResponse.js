import Command from "./Command";
import * as Status from '../player/playerStatus';

export default class SelectGiftResponse extends Command{
    constructor(choice){
        super();
        this.choice = choice;
    }

    execute(player){
        player.selectGift(this.choice);
        return Status.END_TURN;
    }
}