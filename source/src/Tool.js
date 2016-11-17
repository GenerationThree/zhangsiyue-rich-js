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
}