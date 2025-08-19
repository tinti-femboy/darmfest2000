import Experience from './Experience.js'

export default class Config 
{
    constructor() 
    {   
        /**
         * Camera Settings
         */
        this.parallaxEnabled = true         // Enable parallax effect, needs camera controls to be off
        this.enableCameraControls = false   // Camera controls for debugging

        /**
         * Video Settings
         */
        this.postProcessingEnabled = true   // Enable post processing effects
        this.pixelRatioFactor = 0.5           // Factor to reduce pixel ratio for retro resolution, raise >1 for SSAA
        this.antialiasingSamples = 0        // Number of samples for MSAA, 0 for no MSAA
        this.RGBShiftDistance = 0.01        // Distance for RGB shift effect, 0.01 is a good value
        
        /** 
         * World Settings
         */
        this.sceneDepth = 200               // Depth of the synthwave scene
        this.particleCount = 10000         // Number of particles in the scene
        this.sunBrightness = 0.5            // Brightness of the sun

        /**
         * Darmfest Settings
         */
        this.darmfestDate = 1758380400000 // date for Darmfest event
    }

}

