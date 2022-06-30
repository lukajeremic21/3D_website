import './style.css';

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Scene } from 'three';

const scena = new THREE.Scene();
const kamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
kamera.position.setZ(30);

renderer.render(scena, kamera);

const objekat = new THREE.TorusGeometry(10, 3, 16, 100);
const materijal = new THREE.MeshStandardMaterial( {color: "purple",});
const torus = new THREE.Mesh(objekat, materijal);

scena.add(torus);

const pointLight = new THREE.PointLight(0xfffff);
pointLight.position.set(20, 20, 20);

const controls = new OrbitControls(kamera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xfffff);
scena.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scena.add(lightHelper, gridHelper);

const spaceTexture = new THREE.TextureLoader().load('images/svemir.jpg');
scena.background = spaceTexture;

function animate () {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scena, kamera);
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.24, 24, 24);
    const material  = new THREE.MeshStandardMaterial({color: 0xfffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scena.add(star);
}

Array(200).fill().forEach(addStar);

const texture = new THREE.TextureLoader().load('images/polygon_logo.png');

const poly = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({map: texture})
)

scena.add(poly);

const mjesec_texture = new THREE.TextureLoader().load('images/mjesec.jpg');

const mjesec = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({map: mjesec_texture})
)


scena.add(mjesec);

mjesec.position.z = 30;
mjesec.position.setX(-10);


function pomjeriKameru() {

    const a = document.body.getBoundingClientRect().top;
    mjesec.rotation.x += 0.05;
    mjesec.rotation.y += 0.075;
    mjesec.rotation.z += 0.05;

    poly.rotation.y += 0.01;
    poly.rotation.z += 0.01;

    kamera.position.z = a * -0.01; 
    kamera.position.x = a * -0.0002; 
    kamera.position.y = a * -0.0002; 

}

document.body.onscroll = pomjeriKameru

animate();