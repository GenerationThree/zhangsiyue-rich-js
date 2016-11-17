import Player from '../../src/Player';
import SellToolCommand from '../../src/command/SellToolCommand';
import {TOOL_TYPE} from '../../src/Tool';
import * as Status from '../../src/status';
import Tool from "../../src/Tool";

describe('sell tool command test', () => {
    it('should be wait command after sell tool command', () => {
        let player = new Player();
        let tool = new Tool(1);
        player.points = 0;
        player.tools = [tool];
        let sellToolCommand = new SellToolCommand(1);

        player.execute(sellToolCommand);

        expect(player.status).toBe(Status.WAIT_COMMAND);
        expect(player.points).toBe(TOOL_TYPE[1]);
        expect(player.tools.length).toBe(0);
    });
})