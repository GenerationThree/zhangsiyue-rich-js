import readline from 'readline';
import GameControl from "./GameControl";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let gameControl = new GameControl();

rl.question('输入rich开始游戏:', (input) => {
    gameControl.execute(input, rl);
});