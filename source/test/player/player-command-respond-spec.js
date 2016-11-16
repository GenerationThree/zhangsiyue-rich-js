import Player from '../../src/Player';
import Command from '../../src/command/Command';
import * as Status from '../../src/status';

describe('player command respond test', () => {

    let player, command, response;

    beforeEach(() => {
        player = new Player();
        command = new Command();
        response = new Command();
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

    it('should be end turn after command', ()=>{
        command.execute = () => Status.END_TURN;

        player.execute(command);

        expect(player.status).toBe(Status.END_TURN);
    });

    it('should be end turn after player respond', ()=>{
        response.execute = () => Status.END_TURN;

        player.execute(response);

        expect(player.status).toBe(Status.END_TURN);
    });

    it('should be wait response after player respond', ()=>{
        response.execute = () => Status.WAIT_RESPONSE;

        player.execute(response);

        expect(player.status).toBe(Status.WAIT_RESPONSE);
    });

});