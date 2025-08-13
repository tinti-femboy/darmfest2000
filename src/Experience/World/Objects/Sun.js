import * as THREE from 'three';
import Experience from "../../Experience";

export default class Sun
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config

        this.size = 35

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(10, 10, 1, 1)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.sunTexture
        this.textures.color.encoding = THREE.sRGBEncoding
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: this.config.sunBrightness,
            map: this.textures.color
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.rotation.set(0, 0, 0)
        this.mesh.position.set(0, this.size -5, -300)
        
        this.mesh.scale.set(this.size, this.size, 1)

        this.scene.add(this.mesh)
    }

}