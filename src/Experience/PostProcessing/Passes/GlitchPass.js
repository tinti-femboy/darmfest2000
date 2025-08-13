import { GlitchPass } from "three/examples/jsm/Addons.js";

export default class PostProcessingGlitchPass
{
    constructor()
    {
        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new GlitchPass()
    }
}