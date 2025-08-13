import * as THREE from 'three';
import Experience from "../../Experience";

export default class FloatingCubes 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

    }

    setGeometry()
    {

        this.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1,)
        this.cubeCount = 50
    }

    setMaterial()
    {
        this.material = new THREE.MeshNormalMaterial()


        // this.material.size = 0.1
        // this.material.sizeAttenuation = true

        // this.material.color = new THREE.Color('#ffffff')

        this.material.transparent = true
        this.material.opacity = 0.1

        // this.material.alphaMap = this.resources.items.circleTexture
        // this.material.depthWrite = false
        // this.material.blending = THREE.AdditiveBlending
        // this.material.vertexColors = true
    }

    setMesh()
    {
        this.instances = []

        for(let i = 0; i < this.cubeCount; i++)
        {
            const cube = new THREE.Mesh(this.geometry, this.material)
            cube.position.x = (Math.random() - 0.5) * 20
            cube.position.y = (Math.random() - 0.5) * 5 +5
            cube.position.z = (Math.random() - 0.5) * 10
            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            cube.scale.set(scale, scale, scale)

            this.scene.add(cube)

            this.instances.push([cube, Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()])
        }
        
    } 

    update()
    {   
        this.instances.forEach(cube => 
        {
        // Example animations:
        // Rotate randomly
            cube[0].rotation.x = this.experience.time.elapsed * 0.001 * (cube[3] -0.5) +cube[1]*Math.PI*2; // Small random rotation
            cube[0].rotation.y = this.experience.time.elapsed * 0.001 * (cube[4] -0.5) +cube[2]*Math.PI*2;



            
            cube[0].position.x = cube[0].position.x + this.experience.time.delta/1000 * (cube[5]-0.5) * 1
            if(cube[0].position.x > 11){
                cube[0].position.x = -10
            } else if(cube[0].position.x < -11){
                cube[0].position.x = 10
            }
            cube[0].position.y = cube[0].position.y + this.experience.time.delta/1000 * (cube[6]-0.5) * 1
            if(cube[0].position.y > 11){
                cube[0].position.y = 0
            } else if(cube[0].position.y < -1){
                cube[0].position.y = 10
            }




        })
    }

}