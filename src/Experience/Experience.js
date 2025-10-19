import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import PostProcessingEffectComposer from './PostProcessing/EffectComposer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Config from './Config.js'


let instance = null

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        // Options
        this.canvas = canvas

        // Load config first
        this.config = new Config()

        // Time for Darmfest Progress analysation
        this.time = new Time()

        /**
         * Darmfest Progress
         */ 
        let timeTillDarmfest = (1758380400000 - this.time.current)
        let timeFromCountdownstart = (3288149569 - timeTillDarmfest)

        this.darmfestProgress = timeFromCountdownstart / 3288140000
        // this.goWildAmount = Math.pow(this.darmfestProgress, 9)
        // now, that the darmfest2000 has entered the past,
        // we freeze the screen jittering.
       this.goWildAmount = 0   
        
        // Setup
        this.sizes = new Sizes()

        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera(this.config.enableCameraControls) // Bool for controls
        this.renderer = new Renderer()
        this.world = new World()
        this.effectComposer = new PostProcessingEffectComposer()


        

        // Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.effectComposer.resize()
        this.world.resize()

    }

    update()
    {
        this.camera.update()
        this.world.update()

        if(this.config.postProcessingEnabled)
        {
            this.effectComposer.update()
        } else
        {
            this.renderer.update()
        }
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
        
        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'functions')
                    {
                        value.dispose()
                    }
                }
            }
        })
        if(this.camera.controls)
        {
            this.camera.controls.dispose
        }
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
        this.renderer.instance.dispose()
    }

}
