import Zdog from "zdog";
import { Howl, Howler } from "howler";
import { COLORS } from "./config";

const element = document.querySelector(".zdog-canvas");
const sound = new Howl({
  src: ["assets/bounce.mp3"],
  volume: 0.2,
});

let smiley = new Zdog.Illustration({
  element: ".zdog-canvas",
  zoom: 3,
});

let contorno = new Zdog.Ellipse({
  addTo: smiley,
  width: 120,
  height: 120,
  stroke: 6,
  color: COLORS.fg,
  quarters: 1,
  fill: false,
});

contorno.copy({
  rotate: { z: Zdog.TAU / 2 },
});

contorno.copy({
  rotate: { z: Zdog.TAU / 4 },
});

contorno.copy({
  rotate: { z: -Zdog.TAU / 4 },
});

let occhi = new Zdog.Group({
  addTo: smiley,
  translate: { y: -18, x: -16, z: 40 },
  rotate: { x: -Zdog.TAU / 2.2 },
});

// . - Creiamo un occhio
let occhio = new Zdog.Ellipse({
  addTo: occhi,
  width: 8,
  height: 26,
  stroke: 5,
  color: COLORS.fg,
  fill: true,
});

// : - Duplichiamo l'occhio
occhi.copyGraph({
  translate: { y: -18, x: 16, z: 40 },
});

// :) - Creiamo la bocca
let bocca = new Zdog.Shape({
  addTo: smiley,
  path: [
    { x: -35, y: 20 },
    {
      bezier: [
        { x: -18, y: 48 },
        { x: 18, y: 48 },
        { x: 35, y: 20 },
      ],
    },
  ],
  closed: false,
  stroke: 7,
  color: COLORS.fg,
  translate: { y: -2, z: 40 },
});

// Aggiungiamo la famosa rughetta
let ruga = new Zdog.Shape({
  addTo: bocca,
  path: [
    { x: 0, y: 0 },
    {
      arc: [
        { x: 6, y: -5 },
        { x: 12, y: 0 },
      ],
    },
  ],
  translate: { x: -40.5, y: 23 },
  rotate: { z: -Zdog.TAU / 13 },
  stroke: 6,
  closed: false,
  color: COLORS.fg,
});

// Duplichiamo la ruga anche di là
ruga.copyGraph({
  translate: { x: 29, y: 18 },
  rotate: { z: Zdog.TAU / 12 },
});

let faccia = new Zdog.Shape({
  addTo: smiley,
  stroke: 110,
  color: COLORS.bg,
});

// ☻: voglio guardare il cursore del mouse in ogni momento!

const body = document.getElementsByTagName("body")[0];
const elem = document.documentElement;

function follow(cursor) {
  let windowWidth = window.innerWidth || elem.clientWidth || body.clientWidth;
  let windowHeight =
    window.innerHeight || elem.clientHeight || body.clientHeight;

  let limit = 0.35;
  let x = Math.cos((Math.PI * cursor.pageY) / windowHeight) * limit;
  let y = Math.cos((Math.PI * cursor.pageX) / windowWidth) * limit;

  smiley.rotate.x = x;
  smiley.rotate.y = y;
  smiley.updateRenderGraph();
  //   anime({
  //     targets: smiley.rotate,
  //     x: x,
  //     y: y,
  //     duration: 500,
  //     // easing: 'spring(mass, stiffness, damping, velocity)'
  //     easing: "spring(1, 50, 10, 50)",
  //     update: function () {
  //       smiley.updateRenderGraph();
  //     },
  //   });
}

addEventListener("mousemove", follow, false);
addEventListener("touchstart", follow, false);
addEventListener("touchmove", follow, false);

document.addEventListener("DOMContentLoaded", function (event) {
  element.classList.add("animate__jackInTheBox");

  element.addEventListener("click", (event) => {
    element.classList.add("animate__jello");
    sound.play();
  });

  element.addEventListener("animationend", () => {
    element.classList.remove("animate__jello", "animate__jackInTheBox");
  });
});
