<template>
  <canvas ref="experience" />
</template>

<script setup>
import * as THREE from "three";
import * as dat from "lil-gui";

import planeTexture from "/images/plane.png";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import CharacterControls from "@/composables/characterControls.js";
import { createPlane } from "@/composables/createPlane.js";

let renderer;
let orbitControls;

const keysPressed = {};
const clock = new THREE.Clock();
const experience = ref(null);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

// 바닥 부분 추가.
const plane = createPlane(textureLoader.load(planeTexture));
scene.add(plane);

let characterControls;

new GLTFLoader().load("/models/orc.gltf", function (gltf) {
  const model = gltf.scene;
  model.traverse(function (object) {
    if (object.isMesh) object.castShadow = true;
  });
  scene.add(model);

  const gltfAnimations = gltf.animations;
  const mixer = new THREE.AnimationMixer(model);
  const animationsMap = new Map();
  gltfAnimations.forEach((a) => {
    animationsMap.set(a.name, mixer.clipAction(a));
  });

  characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, "Idle");
});

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 5;
camera.position.y = 8;
camera.position.z = 20;
scene.add(camera);

function light() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-60, 100, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 50;
  dirLight.shadow.camera.bottom = -50;
  dirLight.shadow.camera.left = -50;
  dirLight.shadow.camera.right = 50;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 200;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;
  scene.add(dirLight);
}

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0000ff, 1);
  renderer.render(scene, camera);
  renderer.shadowMap.enabled = true;
}

function setRender() {
  if (experience.value) {
    renderer = new THREE.WebGLRenderer({
      canvas: experience.value,
      antialias: true,
    });

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 20;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;

    window.addEventListener("keydown", (event) => {
      if (event.shiftKey && characterControls) {
        characterControls.switchRunToggle();
      } else {
        keysPressed[event.key.toLowerCase()] = true;
      }
    });
    window.addEventListener("keyup", (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    });

    updateRenderer();
  }
}

function loop() {
  const delta = clock.getDelta();

  if (characterControls) {
    characterControls.update(delta, keysPressed);
  }
  orbitControls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  light();
  loop();
});
</script>

<style lang="scss" scoped></style>
