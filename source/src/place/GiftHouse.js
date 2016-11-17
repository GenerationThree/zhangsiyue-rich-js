import Place from './Place';
import * as Status from '../status';

export default class GiftHouse extends Place{
    arrive(){
        return Status.WAIT_RESPONSE;
    }
}