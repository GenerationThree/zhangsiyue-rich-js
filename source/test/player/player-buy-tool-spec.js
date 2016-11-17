import Player from '../../src/player/Player';
import {TOOL_TYPE} from '../../src/Tool';
import Tool from "../../src/Tool";

describe('player buy tool test', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    it('should decrease points and add tool after buy tool', () => {
        player.points = 100;
        player.buyTool(1);

        expect(player.points).toBe(100 - TOOL_TYPE[1]);
        expect(player.tools.length).toBe(1);
    });

    it('should not buy tool with enough points', () => {
        player.points = TOOL_TYPE[1] -1 ;
        player.buyTool(1);

        expect(player.points).toBe(TOOL_TYPE[1] -1);
        expect(player.tools.length).toBe(0);
    });

    it('should not buy tool when already have ten tools', () => {
       for(let i = 0; i < 10; i++){
           player.tools.push(new Tool(1));
       }
       player.points = 100;

        player.buyTool(1);

        expect(player.tools.length).toBe(10);
        expect(player.points).toBe(100);
    });
});