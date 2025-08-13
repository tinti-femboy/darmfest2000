import * as THREE from "three"
import Experience from "../../Experience";

 
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";

export default class PostProcessingBloomPass
{
    constructor()
    {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new BloomPass(
            1, // strength
            25, // kernel size
            1, // sigma
            256 // blur render target resolution
        )
    }
}