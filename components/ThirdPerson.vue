<template>
  <canvas ref="experience" />
</template>

<script setup>
import * as THREE from "three";
import * as dat from "lil-gui";

import { wrapAndRepeatTexture } from "@/composables/createPlane.js";

import img from "/images/paper_A.jpg";

let renderer;
const experience = ref(null);

// Debug
const gui = new dat.GUI();
const settings = {
  x: 0,
  y: 0,
  z: 0,
  cameraZ: 20,
};
gui.add(settings, "x").min(-1).max(1).step(0.01);
gui.add(settings, "y").min(-1).max(1).step(0.01);
gui.add(settings, "z").min(-1).max(1).step(0.01);
gui.add(settings, "cameraZ").min(0).max(50).step(0.5);

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(img);

const WIDTH = 120;
const HEIGHT = 120;
const REPEAT_COUNT = 10;

const createPlane = () => {
  const _geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 512, 512);
  const _material = new THREE.MeshBasicMaterial({ map: texture });
  const _plane = new THREE.Mesh(_geometry, _material);

  _plane.rotation.set(-0.7, 0, 0.4);

  wrapAndRepeatTexture(_material.map, REPEAT_COUNT);

  return _plane;
};
const plane = createPlane();
scene.add(plane);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);
camera.position.set(0, 0, 25);
scene.add(camera);

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0068ff, 1);
  renderer.render(scene, camera);
}

function setRender() {
  if (experience.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: experience.value,
    });

    updateRenderer();
  }
}

function loop() {
  const elapsedTime = clock.getElapsedTime();

  // plane.rotation.x = settings.x;
  // plane.rotation.y = settings.y;
  // plane.rotation.z = settings.z;
  // camera.position.x = settings.cameraZ;

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  loop();
});
</script>

<style lang="scss" scoped></style>
