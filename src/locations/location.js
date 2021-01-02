import { seeds } from "./seeds"

const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
export class randomLocation {
  
    constructor( ) {
        this.lat = randomSeed.lat;
        this.lng = randomSeed.lng;
    }

}

