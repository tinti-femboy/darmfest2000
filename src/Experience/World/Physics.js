import * as THREE from 'three';
import Experience from "../Experience";
import RAPIER from '@dimforge/rapier3d-compat';

export default class Physics
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.config = this.experience.config



        this.Segments = 10

        // start async Rapier setup (don't block constructor)
        this.ready = this.setupRapier()

        // store active physics objects
        this.bodies = []

        // spawn a sphere on every mouse click
        window.addEventListener('click', (e) => this.spawnSphere(e.clientX, e.clientY))
    }

    // async init wrapper: wait for WASM/glue, then create world and meshes
    async setupRapier()
    {
        // safe guard: only call init if function exists
        if (typeof RAPIER.init === 'function') {
            await RAPIER.init()
        }

        this.initializeWorld() // Initialize Rapier world
        this.setGeometry()
        this.setMaterial()

        // create collider for mountains (if mountains exports a THREE.Mesh or geometry)
        this.addMountainsCollider(this.experience.world.mountains)
    }
    
    initializeWorld()
    {
        this.world = new RAPIER.World({ x: 0, y: -9.81, z: 0 })
        const floorBody = this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -1, 0))
        this.world.createCollider(
            RAPIER.ColliderDesc.cuboid(50, 1, this.config.sceneDepth)
            .setRestitution(0.9)
            .setFriction(0.2),
            floorBody
        )
    }
    
    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(1, this.Segments, this.Segments);
    }

    setMaterial()
    {
        this.material = new THREE.MeshNormalMaterial({
            color: 0xffffff,
            wireframe: true
        })
    }

    spawnSphere(clientX, clientY)
    {
        // ensure rapier is ready
        if (!this.world || !this.geometry || !this.material) return

        // convert screen coordinates to normalized device coords
        const mouse = new THREE.Vector2(
            ((clientX - 0.5*window.innerWidth) / window.innerHeight) *2, // pay attention to aspect ratio
            -(clientY / window.innerHeight) * 2 + 1
        )

        console.log(mouse)

        // create mesh (reuse geometry/material)
        const mesh = new THREE.Mesh(this.geometry, this.material)
        // choose spawn position (change as needed)
        const spawnX = mouse.x *3 -0.5
        const spawnY = (mouse.y +0.3) * 3 + 4.5 // spawn above the mouse position
        const spawnZ = (Math.random() - 0.5) * 4
        mesh.position.set(spawnX, spawnY, spawnZ)
        this.scene.add(mesh)

        // create rapier dynamic body at same position
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(spawnX, spawnY, spawnZ)
        const body = this.world.createRigidBody(bodyDesc)
        this.world.createCollider(RAPIER.ColliderDesc.ball(1).setDensity(1.0), body)

        const initialVelocity = { x: Math.random()*0.2-0.1 + mouse.x*7, y: Math.random()*0.2-0.1 + mouse.y*7, z: -40 }
        body.setLinvel(initialVelocity, true)

        // keep track for syncing / removal
        this.bodies.push({ mesh, body })
    }

    addMountainsCollider(mountains)
    {
        if (!mountains) return

        // get mesh and geometry
        const mesh = (mountains.isMesh) ? mountains : (mountains.mesh || null)
        const geometry = mesh ? mesh.geometry : (mountains.isBufferGeometry ? mountains : null)
        if (!geometry || !geometry.attributes || !geometry.attributes.position) {
            console.warn('mountains geometry not found or invalid')
            return
        }

        // clone positions and apply mesh matrixWorld if mesh provided
        const posAttr = geometry.attributes.position
        const vertexCount = posAttr.count
        const positions = new Float32Array(vertexCount * 3)
        const tmp = new THREE.Vector3()
        const mat = mesh ? mesh.matrixWorld : new THREE.Matrix4().identity()

        for (let i = 0; i < vertexCount; i++) {
            tmp.fromBufferAttribute(posAttr, i).applyMatrix4(mat)
            positions[i * 3 + 0] = tmp.x
            positions[i * 3 + 1] = tmp.y
            positions[i * 3 + 2] = tmp.z
        }

        // build indices (use geometry.index if present)
        let indices
        if (geometry.index) {
            indices = Array.from(geometry.index.array)
        } else {
            // non-indexed: assume sequential triangles
            indices = new Array(vertexCount)
            for (let i = 0; i < vertexCount; i++) indices[i] = i
        }

        // create a fixed body and attach the trimesh collider
        const body = this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed())
        const collider = RAPIER.ColliderDesc.trimesh(Array.from(positions), indices)
            .setFriction(0.6)
            .setRestitution(0.2)
        this.world.createCollider(collider, body)
    }

    update()
    {
        // don't step until world exists
        if (!this.world) return

        this.world.step()

        // sync all spawned spheres and remove those that fell below y = -10
        for (let i = this.bodies.length - 1; i >= 0; i--) {
            const { mesh, body } = this.bodies[i]
            const p = body.translation()
            const r = body.rotation()

            mesh.position.set(p.x, p.y, p.z)

            mesh.quaternion.set(r.x, r.y, r.z, r.w)

            // dispose when fallen below threshold
            if (p.y < -10) {
                // remove Rapier body and its colliders
                this.world.removeRigidBody(body, true)

                // remove mesh from scene
                this.scene.remove(mesh)



                // remove from array
                this.bodies.splice(i, 1)
            }
        }
    }

}