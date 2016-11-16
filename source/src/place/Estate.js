import Place from './Place'

export const LEVEL_LIMIT = 3;

export default class Estate extends Place{
    constructor(price){
        super();
        this.owner = null;
        this.price = price;
        this.level = 0;
    }
}