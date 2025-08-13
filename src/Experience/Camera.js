import * as THREE from "three"
import Experience from "./Experience.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { update } from "three/examples/jsm/libs/tween.module.js"

export default class Camera
{
    constructor(enableControls)
    {
        this.controlsEnabled = enableControls
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.time = this.experience.time
        this.config = this.experience.config

        this.parallaxEnabled = this.config.parallaxEnabled && !this.controlsEnabled

        this.setInstance()

        if(this.controlsEnabled)
        {
            this.setOrbitControls()
        } 
        if(this.parallaxEnabled)
        {
            this.initializeParallax()
        }
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1, 
            1000
        )
        this.instance.position.set(0, 5, 10)
        this.instance.rotation.set(0, 0, 0,)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    initializeParallax()
    {

        const getScaledPosition = (x, y) => {
            const scaledX = (x / window.innerWidth)* -1;
            const scaledY = (y / window.innerHeight) + 5;
            
            // Update the position of the instance
            this.xGoal = scaledX
            this.yGoal = scaledY
            
            //this.instance.position.set(scaledX , scaledY, 10);
        };

        document.addEventListener('mousemove', (event) => {
            getScaledPosition(event.clientX, event.clientY);
        });

        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0]; // Get the first touch point
            getScaledPosition(touch.clientX, touch.clientY);
        });

        
    }
    update()
    {
        if(this.controlsEnabled)
        {
            this.controls.update()
        }

        if(this.parallaxEnabled)
        {

            if(this.xGoal !== 0 && this.yGoal !== undefined)
            {
                this.instance.position.x += (this.xGoal - this.instance.position.x) * 0.1 * this.time.delta / 16;
                this.instance.position.y += (this.yGoal - this.instance.position.y) * 0.1 * this.time.delta / 16;
            }

            this.instance.position.x += Math.random()*0.2 *this.experience.goWildAmount
            this.instance.position.y += Math.random()*0.2 *this.experience.goWildAmount
        }
    }
}