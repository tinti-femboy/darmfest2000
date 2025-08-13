import * as THREE from "three"
import Experience from "../../Experience";

 
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'


export default class PostProcessingRenderPass
{
    constructor()
    {
        
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {   
        this.instance = new RenderPass(this.scene, this.camera.instance)
        
    }
}