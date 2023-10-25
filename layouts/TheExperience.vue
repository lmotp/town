<template>
  <canvas ref="experience"></canvas>
</template>

<script setup>
import * as THREE from "three";
import img from "/images/t0.jpg";

let renderer;
const experience = ref(null);

const mouse = new THREE.Vector2();
const mouseTarget = new THREE.Vector2();
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const texture = new THREE.TextureLoader().load(img);

const geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 1, 3000);
camera.position.set(20, 0, 900);
scene.add(camera);

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

      // 0.5를 빼준 이유는 uv의 좌표를 중앙으로 옮기기 위함.
      mouse.x = uv[0] - 0.5;
      mouse.y = uv[1] - 0.5;
    });
  }
}

function loop() {
  mouseTarget.lerp(mouse, 0.08);

  mesh.rotation.x = -mouseTarget.y * 0.15;
  mesh.rotation.y = -mouseTarget.x * 0.15;

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  loop();
});
</script>

<style lang="scss" scoped></style>
