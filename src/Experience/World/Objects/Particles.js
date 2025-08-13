import * as THREE from 'three';
import Experience from "../../Experience";

export default class Particles 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {

        this.geometry = new THREE.BufferGeometry()
        this.particleCount = this.config.particleCount

        this.positions = new Float32Array(this.particleCount * 3)
        this.colors = new Float32Array(this.particleCount * 3)

        for(let i = 0; i < this.particleCount; i++)
        {
            let i3 = i*3
            this.positions[i3+0] = (Math.random() - 0.5) * 40
            this.positions[i3+1] = (Math.random() - 0.5) * 20 +5
            this.positions[i3+2] = (Math.random() - 0.5) * 10 -10
            this.colors[i3+0] = 1
            this.colors[i3+1] = 1
            this.colors[i3+2] = 1
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial()

        this.material.size = 0.1
        this.material.sizeAttenuation = true

        this.material.color = new THREE.Color('#ffffff')

        this.material.transparent = true
        this.material.opacity = 0.2

        this.material.alphaMap = this.resources.items.circleTexture
        this.material.depthWrite = false
        this.material.blending = THREE.AdditiveBlending
        this.material.vertexColors = true
    }

    setMesh()
    {


        this.particles = new THREE.Points(this.geometry, this.material)
        this.particles.scale.set(5, 5, 20)
        this.particles.position.set(0, 20, 100)
        this.scene.add(this.particles)
    }

    update()
    {   
        for(let i = 0; i < this.particleCount; i++)
        {
            let i3 = i * 3
            
            // TODO: Clean up this mess and make the values 0-1

            const x = this.geometry.attributes.position.array[i3]
            this.geometry.attributes.position.array[i3 + 0] = this.geometry.attributes.position.array[i3 + 0] + this.experience.time.delta/1000 * (Math.floor(i/50)%50/50 -0.5) * 0.3
            if(this.geometry.attributes.position.array[i3 + 0] > 21){
                this.geometry.attributes.position.array[i3 + 0] = -20
            } else if(this.geometry.attributes.position.array[i3 + 0] < -21){
                this.geometry.attributes.position.array[i3 + 0] = 20
            }
            this.geometry.attributes.position.array[i3 + 1] = this.geometry.attributes.position.array[i3 + 1] + this.experience.time.delta/1000 * (i%50/50 -0.5) * 0.3
            if(this.geometry.attributes.position.array[i3 + 1] > 16){
                this.geometry.attributes.position.array[i3 + 1] = -5
            } else if(this.geometry.attributes.position.array[i3 + 1] < -6){
                this.geometry.attributes.position.array[i3 + 1] = 15
            }
        }
        this.geometry.attributes.position.needsUpdate = true
    }

}




























