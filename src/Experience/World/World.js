import * as THREE from 'three'
import Experience from "../Experience";
import { BoxGeometry } from 'three';
import Floor from './Objects/Floor';
import Sun from './Objects/Sun';
import Particles from './Objects/Particles';
import FloatingCubes from './Objects/FloatingCubes';
import Mountains from './Objects/Mountains';
import TitleText from './Objects/TitleText';
import SubitleText from './Objects/SubtitleText';
import ProgressText from './Objects/ProgressText';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            // Load objects after resources have loaded
            this.floor = new Floor()
            this.mountains = new Mountains()
            this.sun = new Sun()
            this.particles = new Particles()
            this.floatingCubes = new FloatingCubes()
            this.titleText = new TitleText()
            this.subtitleText = new SubitleText()
            this.progressText = new ProgressText()
        })


    }

    resize()
    {
        if(this.titleText)
        {
            this.titleText.resize()
        }
    }

    update()
    {
        if(this.floor)
        {
            this.floor.update()
        }
        if(this.mountains)
        {
            this.mountains.update()
        }
        if(this.particles)
        {
            this.particles.update()
        }
        if(this.floatingCubes)
        {
            this.floatingCubes.update()
        }
        if(this.titleText)
        {
            this.titleText.update()
        }
        if(this.subtitleText)
        {
            this.subtitleText.update()
        }
        if(this.progressText)
        {
            this.progressText.update()
        }



    }
}