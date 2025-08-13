import * as THREE from 'three';
import Experience from "../../Experience";

export default class Floor 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config

        this.xSegments = 30
        this.zSegments = this.config.sceneDepth

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(this.xSegments, this.zSegments, 1, 1)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.gridTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(this.xSegments, this.zSegments)
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

        this.mesh.rotation.set(Math.PI * -0.5, 0, 0)
        this.mesh.position.set(0, 0, -40) // Make sure there is few mesh behind the camera


        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.position.z = (this.experience.time.elapsed / 1000 % 1) +50 - (this.zSegments * 0.5)
    }

}