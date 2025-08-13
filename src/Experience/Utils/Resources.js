import * as THREE from 'three'
import EventEmitter from './EventEmitter'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        // Options 
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.fontLoader = new FontLoader()
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if(source.type === 'font')
            {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            // TODO: Add GLTF Support

            // else if(source.type === 'gltfModel')
            // {
            //     this.loaders.textureLoader.load(
            //         source.path,
            //         (file) => 
            //         {
            //             console.log(source, file)
            //         }
            //     )
            // }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            console.log("finished loading resources")
            this.trigger('ready')
        }
    }
}