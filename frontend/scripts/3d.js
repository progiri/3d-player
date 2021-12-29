import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 65);
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement);

const gltfLoader = new GLTFLoader();

gltfLoader.load('models/3d_radio_v6.glb', function(gltf) {

    const model = gltf.scene;
    model.rotation.y += 3.17;
    scene.add(model);

}, undefined, function(error) {

    console.error(error);

});

const light1 = new THREE.PointLight(0xFAF4D4, 1, 1000);
light1.position.set(5, 5, 8);
light1.castShadow = true;
scene.add(light1);


const light2 = new THREE.AmbientLight(0xffffff, 1, 1000);
light2.position.set(1, 5, 8);
scene.add(light2);

const light3 = new THREE.AmbientLight(0xFAF4D4, 1, 1000);
light3.position.set(5, 5, 5);
scene.add(light3);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 5, 10);
camera.rotateX(-0.15)
camera.rotateY(0.041)

controls.update();

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}
animate();