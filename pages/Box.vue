<template>
  <canvas ref="experience" />
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import planeTexture from "/images/plane.png";

let renderer;

const experience = ref(null);
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const planeTextureLoad = textureLoader.load(planeTexture);

const WIDTH = 10;
const HEIGHT = 10;

const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 512, 512);
const material = new THREE.MeshBasicMaterial({
  map: planeTextureLoad,
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI * -0.5;

scene.add(plane);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0000ff, 1);
  renderer.render(scene, camera);
}

function setRender() {
  if (experience.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: experience.value,
    });

    const orbitControls = new OrbitControls(camera, experience.value);
    orbitControls.enableDamping = true;
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 15;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    orbitControls.update();

    updateRenderer();
  }
}

function loop() {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  loop();
});
</script>

<style lang="scss" scoped></style>
