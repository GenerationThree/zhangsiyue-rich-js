import * as Status from './playerStatus';
import {LEVEL_LIMIT} from '../place/Estate';
import Hospital from '../place/Hospital';
import Prison from '../place/Prison';
import {TOOL_TYPE} from '../Tool';
import Tool from "../Tool";

export default class Player {
    constructor(startPoint, balance, id) {
        this.id = id;
        switch (id){
            case 1:
                this.name = 'Q';
                break;
            case 1:
                this.name = 'A';
                break;
            case 1:
                this.name = 'S';
                break;
            case 1:
                this.name = 'J';
                break;
            default:
        }
        this.status = Status.END_TURN;
        this.currentPlace = startPoint;
        this.action = null;
        this.balance = balance;
        this.points = 0;
        this.freeTurns = -1;
        this.waitTurns = -1;
        this.estates = [];
        this.tools = [];
    }

    startTurn(){
        if(this.waitTurns === -1) {
            this.status = Status.WAIT_COMMAND;
        }
        else
            this.waitTurns -- ;
    }

    execute(command) {
        this.status = command.execute(this);
    }

    respond(response) {
        this.status = response.execute(this);
    }

    moveTo(target) {
        this.currentPlace.locateHere.pop(this);
        this.currentPlace = target;
    }

    buyCurrent() {
        if (this.balance >= this.currentPlace.price) {
            this.balance -= this.currentPlace.price;
            this.currentPlace.owner = this;
            this.estates.push(this.currentPlace);
            this.action = '购买空地'
        }
        else
            this.action = '财富不足,无法购买空地'
    }

    buildCurrent() {
        if (this.currentPlace.level == LEVEL_LIMIT) {
            this.action = '房产已到最高级';
        } else if (this.balance >= this.currentPlace.price) {
            this.balance -= this.currentPlace.price;
            this.currentPlace.level++;
            this.action = '建设房产';
        } else
            this.action = '财富不足,无法建设房产';
    }

    payFee() {
        if (this.freeTurns < 0
            && !(this.currentPlace.owner.currentPlace instanceof Hospital)
            && !(this.currentPlace.owner.currentPlace instanceof Prison)) {
            let fee = this.currentPlace.getFee();
            this.balance -= fee;
            this.currentPlace.owner.gainFee(fee);
            this.action = '交过路费' + fee + '元';
        }
    }

    gainFee(fee) {
        this.balance += fee;
    }

    buyTool(type) {
        if(this.tools.length >= 10)
            return;
        let price = TOOL_TYPE[type];
        if (price <= this.points) {
            this.points -= price;
            this.tools.push(new Tool(type));
        }
    }

    selectGift(choice) {
        switch (choice) {
            case 1:
                this.balance += 2000;
                break;
            case 2:
                this.points += 200;
                break;
            case 3:
                this.freeTurns = 5;
                break;
            default:
                break;
        }
    }

    sellEstate(map, position) {
        let estate = map.places[position % map.places.length];
        if (estate.owner == this) {
            this.balance += 2 * (estate.level + 1) * estate.price;
            estate.owner = null;
            estate.level = 0;
            this.estates.pop(estate);
        }
    }

    sellTool(type) {
        let targetTool = this.tools.filter(tool => tool.type === type)[0];
        if (targetTool !== undefined) {
            this.tools.pop(targetTool);
            this.points += targetTool.price;
        }
    }

    useTool(type, distance, map) {
        let targetTool = this.tools.filter(tool => tool.type === type)[0];
        if (targetTool !== undefined) {
            if (targetTool.use(map, this.currentPlace, distance))
                this.tools.pop(targetTool);
        }

    }

}