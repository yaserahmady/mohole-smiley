import * as THREE from "three";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import { COLORS } from "./config";
import { Howl, Howler } from "howler";

const sound = new Howl({
  src: ["bounce.mp3"],
  volume: 0.2,
});

const loader = new THREE.ObjectLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // Field of view
  1 / 1, // Aspect ratio (width/height)
  0.1, // Near clip plane
  1000 // Far clip plane
);
camera.position.z = 7; // positive numbers means backwards in this case

const canvasWidth = clamp(window.innerWidth, 320, 640);
const renderer = new THREE.WebGLRenderer({
  alpha: true, // alpha true makes background body tag color show up
  antialias: true,
  canvas: document.querySelector("canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasWidth);
// renderer.autoClear = false;

let smileyGroup = new THREE.Group();

const faceFeaturesMaterial = new THREE.MeshBasicMaterial({
  color: COLORS.fg,
});

loader.load(
  "model.json",
  function (obj) {
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = faceFeaturesMaterial;
      }
    });
    smileyGroup.add(obj);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (err) {
    console.error("Error loading 'model.json'");
  }
);

let faceSphereGeometry = new THREE.SphereGeometry(1.5, 50, 50);
let faceSphereMaterial = new THREE.MeshBasicMaterial({ color: COLORS.bg });
let faceSphereMesh = new THREE.Mesh(faceSphereGeometry, faceSphereMaterial);
smileyGroup.add(faceSphereMesh);

scene.add(smileyGroup);

let outlineEffect = new OutlineEffect(renderer, {
  defaultThickness: 0.0,
  defaultColor: [0.0784313725, 0.0, 1],
  defaultAlpha: 0.8,
});

faceSphereMaterial.userData.outlineParameters = {
  thickness: 0.04,
  color: COLORS.fg,
  visible: true,
  keepAlive: true,
};

window.addEventListener("mousemove", function (e) {
  let mouse3D = new THREE.Vector3(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1,
    0.5
  );

  smileyGroup.lookAt(mouse3D);
});

function clamp(val, min, max) {
  // Questa funzione costringe un valore `val` entro un limite massimo `max` e un limite minimo `min`.
  return val < min ? min : val > max ? max : val;
}

function render() {
  requestAnimationFrame(render);
  outlineEffect.render(scene, camera);
}

render();

document.addEventListener("DOMContentLoaded", function (event) {
  renderer.domElement.classList.add("animate__jackInTheBox");

  renderer.domElement.addEventListener("click", (event) => {
    renderer.domElement.classList.add("animate__jello");
    sound.play();
  });

  renderer.domElement.addEventListener("animationend", () => {
    renderer.domElement.classList.remove(
      "animate__jello",
      "animate__jackInTheBox"
    );
  });
});
