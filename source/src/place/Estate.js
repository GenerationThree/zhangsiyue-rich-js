import Place from './Place'
export default class Estate extends Place{
    constructor(price){
        super();
        this.owner = null;
        this.price = price;
    }
}