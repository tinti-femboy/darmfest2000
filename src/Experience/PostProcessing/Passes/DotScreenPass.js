import * as THREE from "three"
import Experience from "../../Experience";

 
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'


export default class PostProcessingDotScreenPass
{
    constructor()
    {
        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new DotScreenPass()
    }
}