import * as THREE from 'three';
import Experience from "../../Experience";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class ProgressText
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config
        this.sizes = this.experience.sizes
        this.progress = this.experience.darmfestProgress

        this.size = 1
        this.text = "" + Math.ceil(this.progress *100) +"%"

        this.brightness = 0
        this.flickerIntensity = 0.1 *this.experience.goWildAmount
        this.opacityFlickerIntensity = 1 *this.experience.goWildAmount
        this.movingIntensity = 1 *this.experience.goWildAmount

        this.position = new THREE.Vector3
        (
            0,
            12,
            -20,
        )
        
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.resize()
    }

    setGeometry()
    {
        this.font = this.resources.items.poppinsFont

        this.geometry = new TextGeometry( this.text, {
            font: this.font,
            size: this.size,
            depth: this.size * 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: this.size * 0.1,
            bevelSize: this.size * 0.03,
            bevelOffset: 0,
            bevelSegments: 5

        } );
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
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.geometry.computeBoundingBox();
        const boundingBox = this.geometry.boundingBox;
        const centerX = (boundingBox.max.x + boundingBox.min.x) / 2;
        const centerY = (boundingBox.max.y + boundingBox.min.y) / 2;
        const centerZ = (boundingBox.max.z + boundingBox.min.z) / 2;

        // // Adjust the geometry's position to center it
        this.geometry.translate(-centerX, -centerY, -centerZ);

        this.mesh.rotation.set(0, 0, 0)
        this.mesh.position.set(this.position.x, this.position.y, this.position.z)
        

        this.scene.add(this.mesh)
    }

    resize()
    {
        if(this.sizes.aspectRatio < 1.8) // Offset Z to make sure text fits on screen, if aspect ratio is less than 1.8 text would be cropped
        {
            this.Zoffset = (1 - this.sizes.aspectRatio / 1.8) ** 2 * 120 // Adjust the Z offset based on aspect ratio
            this.position.z = -20 - this.Zoffset
        } else
        {
            this.Zoffset = 0
            this.position.z = -20 - this.Zoffset
        }
    }

    update()
    {   

        // TODO: fix this mess

        this.resize() // Update position based on aspect ratio
        this.mesh.position.set(this.position.x + (Math.random()-0.5)*this.movingIntensity, this.position.y + (Math.random()-0.5)*this.movingIntensity, this.position.z + (Math.random()-0.5)*this.movingIntensity)
        // set color to a random gray value between white and black
        let grayValue = Math.random() * this.flickerIntensity + this.brightness; // between 0.5 and 1
        this.material.color.setRGB(grayValue, grayValue, grayValue);
        
        // Opacity fluctuates between 1 and 1 - flickerIntensity
        this.material.opacity = 1 - this.opacityFlickerIntensity + Math.random() * this.opacityFlickerIntensity;
        

    }

}