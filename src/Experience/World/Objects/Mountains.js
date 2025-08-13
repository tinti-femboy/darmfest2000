import * as THREE from 'three';
import Experience from "../../Experience";


export default class Mountains 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        this.lastNewGen = 0
    }

    setGeometry()
    {
        this.xSegments = this.config.sceneDepth
        this.zSegments = 200
        this.geometry = new THREE.PlaneGeometry(this.zSegments, this.xSegments, this.zSegments, this.xSegments)

        for(let i = 0; i < (this.xSegments*this.zSegments); i++)
        {
            let i3 = i * 3
            this.geometry.attributes.position.array[i3+2] = (Math.random()*0.3 +0.7) * Math.abs(this.geometry.attributes.position.array[i3] *0.4) -2

        }

    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.blueGridTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(this.zSegments, this.xSegments)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.color
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        
        this.mesh.rotation.set(Math.PI * -0.5, 0, Math.PI)
        this.mesh.position.set(0, 0, 50 - (this.xSegments * 0.5)) // Make sure there is few mesh behind the camera

        this.scene.add(this.mesh)
    }

    update()
    {
        // TODO: Clean up this mess
        this.mesh.position.z += this.experience.time.delta / 1000
        if(this.experience.time.elapsed > this.lastNewGen +1000) // Execute this every +1000 ms
        {
            this.lastNewGen = this.lastNewGen + 1000 
            this.mesh.position.z += -1

            for(let i = 0; i < (this.xSegments*this.zSegments); i++)
            {   
                let i3 = i*3
                this.geometry.attributes.position.array[i3+2] = this.geometry.attributes.position.array[i3+this.zSegments*3+3+2]
                
                            
            }
            // Start where last loop left off and generate
            for(let i = this.xSegments*this.zSegments - this.xSegments; i < (this.xSegments*this.zSegments + this.xSegments); i++) 
            {
                let i3 = i*3
                
                this.geometry.attributes.position.array[i3+2] =  (Math.random()*0.3 +0.7) * Math.abs(this.geometry.attributes.position.array[i3] *0.4) -2
            }
            this.geometry.attributes.position.needsUpdate = true    
        }
    }
}