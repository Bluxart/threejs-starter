import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

import vertex from '../shaders/vertex.glsl';
import fragment from '../shaders/fragment.glsl';

export default class Canvas {

    constructor(options) {

        this.container = options.domElement;

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.time = 0;

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createMesh();

        this.addControls();
        this.addGUI();
        this.debugStats();

        this.addEventListeners();
        this.update();

    }

    createScene(){
        this.scene = new THREE.Scene();
    }

    createCamera(){
        const fov = (2 * Math.atan( (this.height/2 ) / 600 ) * 180/Math.PI);
        this.camera = new THREE.PerspectiveCamera( fov, this.width/this.height, 10, 1000 );
        this.camera.position.z = 600;
    }

    createRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.container.appendChild(this.renderer.domElement);
    }

    createMesh(){

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this.geometry = new THREE.PlaneBufferGeometry(200, 200, 1, 1);

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add(this.mesh);

    }

    addControls(){
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    addGUI(){

        this.gui = new dat.GUI();

        const meshTab = this.gui.addFolder('Rotation');
        meshTab.add(this.mesh.rotation, 'x', 0, 10.0).name('x').listen().step(0.1);
        meshTab.add(this.mesh.rotation, 'y', 0, 10.0).name('y').listen().step(0.1);
        meshTab.open();

    }

    debugStats(){
        this.stats = Stats();
        this.container.appendChild(this.stats.domElement);
    }

    /** Events */
    onResize(){

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

    }

    /** Loop */
    update(){

        this.time += 0.05;
        this.mesh.rotation.z += 0.02;

        this.material.uniforms.time.value = this.time;

        this.stats.update();
        this.renderer.render( this.scene, this.camera );

        this.frame = window.requestAnimationFrame(this.update.bind(this));

    }

    /** Listeners */
    addEventListeners(){
        this.onResizeEvent = this.onResize.bind(this);
        window.addEventListener('resize', this.onResizeEvent);
    }

    removeEventListeners(){
        window.removeEventListener('resize', this.onResizeEvent);
    }

    /** Destroy */
    destroy(){
        //this.renderer.dispose();
        //this.scene.clear();
        this.removeEventListeners();
    }

}
