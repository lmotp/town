<template>
  <canvas ref="experience" />
</template>

<script setup>
import * as THREE from "three";

import img from "/images/t0.jpg";

let renderer;
const experience = ref(null);

const clock = new THREE.Clock();
const mouse = new THREE.Vector2();
const mouseTarget = new THREE.Vector2();
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(img);

const geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 2);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 3000);
camera.position.set(20, 0, 900);
scene.add(camera);

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  renderer.render(scene, camera);
}

function setRender() {
  if (experience.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: experience.value,
    });

    updateRenderer();
    renderer.domElement.addEventListener("mousemove", (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      const { clientX, clientY } = event;
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;
      const position = [x, y];

      const uv = [position[0] / bounds.width, position[1] / bounds.height];

      mouse.x = uv[0];
      mouse.y = uv[1];

      // mouseTarget.lerp(mouse, 1);
    });
  }
}

function loop() {
  const elapsedTime = clock.getElapsedTime();
  const oscillator = Math.sin(elapsedTime * 0.1) * 0.5 + 0.5;

  mouseTarget.lerp(mouse, 0.1);

  camera.position.x = -mouseTarget.x * 125;
  camera.position.y = -mouseTarget.y * 125;

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  loop();
});
</script>

<style lang="scss" scoped></style>
