export default class Dice {
    next(){
        return Math.floor(Math.random()*6 + 1);
    }
}