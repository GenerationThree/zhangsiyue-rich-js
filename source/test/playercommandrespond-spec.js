import Player from '../src/Player';
import Command from '../src/command/Command';
import * as Status from '../src/status';

describe('player command respond test', () => {

    let player;
    let command;

    beforeEach(() => {
        player = new Player();
        command = new Command();
    });

    it('should be wait command after command not need response', ()=>{
        command.execute = () => Status.WAIT_COMMAND;

        player.execute(command);

        expect(player.status).toBe(Status.WAIT_COMMAND);
    });

    it('should be wait response after command need response', ()=>{
        command.execute = () => Status.WAIT_RESPONSE;

        player.execute(command);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
    });

});