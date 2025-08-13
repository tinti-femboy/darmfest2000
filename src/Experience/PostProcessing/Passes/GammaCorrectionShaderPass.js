import * as THREE from "three"
import Experience from "../../Experience";

 
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'


export default class PostProcessingGammaCorrectionShaderPass
{
    constructor()
    {
        
        // this.experience = new Experience()
        // this.scene = this.experience.scene
        // this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new ShaderPass(GammaCorrectionShader) 
    }
}