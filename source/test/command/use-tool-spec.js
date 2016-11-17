import Player from '../../src/Player';
import Map from '../../src/Map';
import Place from '../../src/place/Place';
import UseToolCommand from '../../src/command/UseToolCommand';
import * as Status from '../../src/status';
import Tool from "../../src/Tool";

describe('use tool command test', () => {
    it('should be wait command after use tool command', () => {
        let startPoint = new Place();
        let targetPoint = new Place();
        let map = new Map(startPoint, targetPoint);
        let player = new Player();
        let tool = new Tool(1);
        player.tools = [tool];
        player.currentPlace = startPoint;
        let useToolCommand = new UseToolCommand(map, 1, 1);

        player.execute(useToolCommand);

        expect(player.status).toBe(Status.WAIT_COMMAND);
        expect(player.tools.length).toBe(0);
    });
});