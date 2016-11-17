import Place from './place/Place';

export default class Map{
    constructor(...places){
        this.places = places;
    }

    move(currentPlace, step){
        let currentIndex = this.places.indexOf(currentPlace);

        for (let i = 1; i <= step; i++){
            let place = this.places[(currentIndex + i) % this.places.length];
            if(place.blocked || place.hasBomb){
                return place;
            }
        }
        return this.places[(currentIndex + step) % this.places.length];
    }
}