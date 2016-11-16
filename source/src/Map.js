import Place from './place/Place';

export default class Map{
    constructor(...places){
        this.places = places;
    }

    move(currentPlace, step){
        let currentIndex = this.places.indexOf(currentPlace);
        return this.places[(currentIndex + step) % this.places.length];
    }
}