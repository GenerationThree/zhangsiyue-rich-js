import Place from "./Place";
import * as Status from '../status';

export default class MagicHouse extends Place{
    arrive(){
        return Status.WAIT_RESPONSE;
    }
}