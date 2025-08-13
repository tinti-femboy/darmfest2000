import * as THREE from "three"
import Experience from "../Experience.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

/**
 * import Passes
 */ 
import PostProcessingRGBShiftShaderPass from "./Passes/RGBShiftShaderPass.js"
import PostProcessingRenderPass from './Passes/RenderPass.js'
import PostProcessingDotScreenPass from './Passes/DotScreenPass.js'
import PostProcessingGlitchPass from "./Passes/GlitchPass.js"
import PostProcessingGammaCorrectionShaderPass from "./Passes/GammaCorrectionShaderPass.js"
import PostProcessingFilmPass from "./Passes/FilmPass.js";
import PostProcessingBloomPass from "./Passes/BloomPass.js";

/**
 * Main Effect Composer Class
 */
export default class PostProcessingEffectComposer
{
    constructor()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        if(!this.config.postProcessingEnabled)
        {
            return
        }

        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.config = this.experience.config
        
        
        this.renderPass = new PostProcessingRenderPass()
        this.dotScreenPass = new PostProcessingDotScreenPass()
        this.glitchPass = new PostProcessingGlitchPass()
        this.RGBShiftShaderPass = new PostProcessingRGBShiftShaderPass()
        this.RGBShiftShaderPass2 = new PostProcessingRGBShiftShaderPass()
        this.gammaCorrectionShaderPass = new PostProcessingGammaCorrectionShaderPass()
        this.filmPass = new PostProcessingFilmPass()
        this.bloomPass = new PostProcessingBloomPass()

        this.setInstance()
    }

    setInstance()
    {   
        this.renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: this.config.antialiasingSamples,
            }
        )


        this.instance = new EffectComposer(this.renderer.instance, this.renderTarget)

        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)


        /**
         * Add Passes to the Composer
         */

        // Render Pass
        this.instance.addPass(this.renderPass.instance)

        // Bloom Pass
        this.instance.addPass(this.bloomPass.instance)

        // Dot Screen Pass
        this.instance.addPass(this.dotScreenPass.instance)
        this.dotScreenPass.instance.enabled = false

        // Glitch Pass
        this.instance.addPass(this.glitchPass.instance)
        this.glitchPass.instance.enabled = false
        this.glitchPass.instance.goWild = true



        // RGB Shift Shader Pass I
        this.instance.addPass(this.RGBShiftShaderPass.instance)
        this.RGBShiftShaderPass.instance.enabled = true
        this.RGBShiftShaderPass.instance.uniforms['amount'].value = this.config.RGBShiftDistance; // Adjust the amount as needed
        this.RGBShiftShaderPass.instance.uniforms['angle'].value = Math.PI*0.7;

        // RGB Shift Shader Pass II
        this.instance.addPass(this.RGBShiftShaderPass2.instance)
        this.RGBShiftShaderPass2.instance.enabled = false
        this.RGBShiftShaderPass2.instance.uniforms['amount'].value = 0.03; // Adjust the amount as needed
        this.RGBShiftShaderPass2.instance.uniforms['angle'].value = Math.PI*1;

        
        // Film Pass
        this.instance.addPass(this.filmPass.instance)
        this.filmPass.instance.enabled = true
        console.log(this.filmPass.instance.uniforms)
        this.filmPass.instance.uniforms['intensity'].value = 1; // Noise intensity
        this.filmPass.instance.uniforms['grayscale'].value = false; // Grayscale effect





        // Gamma Correction Pass
        this.instance.addPass(this.gammaCorrectionShaderPass.instance)
        this.gammaCorrectionShaderPass.instance.enabled = true
    }

    resize()
    {   
        
        console.log('Resizing Effect Composer')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)


    }

    update()
    {    
        // Rotate Angle for RGB Shift Shader
        // Uncomment the line below to enable rotation effect
        // this.RGBShiftShaderPass.instance.uniforms['angle'].value = this.experience.time.elapsed/1000%(Math.PI*2); // Adjust the angle as needed
        
        // Uncomment below to enable LSD effect
        // this.RGBShiftShaderPass2.instance.uniforms['angle'].value = Math.random() * Math.PI * 2; // Random angle for the second RGB Shift Shader Pass
        // this.RGBShiftShaderPass2.instance.uniforms['amount'].value = Math.random() * 0.05; // Random amount for the second RGB Shift Shader Pass
        
        // Render the scene with post-processing
        this.instance.render()
    }
}