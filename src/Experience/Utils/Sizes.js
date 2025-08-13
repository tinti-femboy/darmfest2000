import EventEmitter from "./EventEmitter"
import Experience from "../Experience"

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        //Setup

        this.experience = new Experience()
        this.config = this.experience.config

        this.width = window.innerWidth 
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2) * this.config.pixelRatioFactor
        this.aspectRatio = this.width / this.height
        

        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) * this.config.pixelRatioFactor
            // this.pixelRatio = 0.75
            this.trigger('resize')

            this.aspectRatio = this.width / this.height
        })

        
    }
}