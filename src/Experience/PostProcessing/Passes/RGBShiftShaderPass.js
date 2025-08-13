import { RGBShiftShader } from "three/examples/jsm/Addons.js";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

export default class PostProcessingRGBShiftShaderPass
{
    constructor()
    {
        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new ShaderPass(RGBShiftShader) 
    }
}