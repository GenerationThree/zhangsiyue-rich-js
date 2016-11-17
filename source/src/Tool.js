export const TOOL_TYPE = {
    1:50,
    2:30,
    3:50
};

export default class Tool{

    constructor(type){
        this.type = type;
        this.price = TOOL_TYPE[this.type];
    }

    use(map, currentPlace, distance){
        let currentIndex = map.places.indexOf(currentPlace);
        let position = distance + currentIndex;

        let length = map.places.length;

        if (position < 0)
            position = length - (0 - position) % length;

        else if(position > 0)
            position = position % length;

        let target = map.places[position];

        switch (this.type) {
            case 1:
                if(target.blocked === false && target.hasBomb === false && target.locateHere.length == 0) {
                    target.blocked = true;
                    return true;
                }
                return false;
            case 2:
                for(let i = 1; i <= distance; i++) {
                    map.places[currentIndex + i].blocked = false;
                    map.places[currentIndex + i].hasBomb = false;
                }
                return true;
            case 3:
                if(target.blocked === false && target.hasBomb === false && target.locateHere.length == 0) {
                    target.hasBomb = true;
                    return true;
                }
            default:
                return false;
        }
    }
}