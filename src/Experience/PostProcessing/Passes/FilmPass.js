import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";

export default class PostProcessingFilmPass
{
    constructor()
    {
        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new FilmPass()
    }
}