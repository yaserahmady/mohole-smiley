import * as THREE from "three";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";
import { COLORS } from "./config";
import { Howl, Howler } from "howler";

const sound = new Howl({
  src: ["bounce.mp3"],
  volume: 0.2,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // Field of view
  1 / 1, // Aspect ratio (width/height)
  0.1, // Near clip plane
  1000 // Far clip plane
);
camera.position.z = 8; // positive numbers means backwards in this case
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  canvas: document.querySelector("canvas"),
}); //alpha true makes background body tag color show up
const loader = new THREE.ObjectLoader();

renderer.setPixelRatio(window.devicePixelRatio);
const canvasWidth = clamp(window.innerWidth, 320, 640);
renderer.setSize(canvasWidth, canvasWidth);
renderer.autoClear = false;

var smileyGroup = new THREE.Group();

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
    console.error("Error loading 'ship.obj'");
  }
);

var faceSphereGeometry = new THREE.SphereGeometry(1.5, 50, 50);
var faceSphereMaterial = new THREE.MeshBasicMaterial({ color: COLORS.bg });
var faceSphereMesh = new THREE.Mesh(faceSphereGeometry, faceSphereMaterial);
smileyGroup.add(faceSphereMesh);

scene.add(smileyGroup);

var outlineEffect = new OutlineEffect(renderer, {
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
  var mouse3D = new THREE.Vector3(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1,
    0.5
  );

  smileyGroup.lookAt(mouse3D);
});

function clamp(val, min, max) {
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
