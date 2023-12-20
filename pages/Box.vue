<template>
  <canvas ref="experience" />
</template>

<script setup>
import * as THREE from "three";
import * as dat from "lil-gui";

import planeTexture from "/images/plane.png";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer;
let orbitControls;

const DIRECTIONS = ["w", "a", "s", "d"];
const WALK_VELOCITY = 2;
const keysPressed = {};

const experience = ref(null);

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const rotateQuarternion = new THREE.Quaternion();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const walkDirection = new THREE.Vector3();
const rotateAngle = new THREE.Vector3(0, 1, 0);
const cameraTarget = new THREE.Vector3();

// 바닥 부분 추가.
const textureLoader = new THREE.TextureLoader();
const planeTextureLoad = textureLoader.load(planeTexture);

const WIDTH = 80;
const HEIGHT = 80;

const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 512, 512);
const material = new THREE.MeshBasicMaterial({
  map: planeTextureLoad,
});
wrapAndRepeatTexture(material.map);

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI * -0.5;

scene.add(plane);

const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 2;
scene.add(box);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 5;
camera.position.y = 8;
camera.position.z = 20;
scene.add(camera);

function wrapAndRepeatTexture(map) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.x = 10;
  map.repeat.y = 10;
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
    orbitControls.minDistance = 5;
    orbitControls.maxDistance = 15;
    orbitControls.enablePan = false;
    orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;

    document.addEventListener("keydown", (event) => {
      keysPressed[event.key.toLowerCase()] = true;
    });
    document.addEventListener("keyup", (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    });

    updateRenderer();
  }
}

function updateCameraTarget(moveX, moveZ) {
  // move camera
  camera.position.x += moveX;
  camera.position.z += moveZ;

  // update camera target
  cameraTarget.x = box.position.x;
  cameraTarget.y = box.position.y + 1;
  cameraTarget.z = box.position.z;
  orbitControls.target = cameraTarget;
}

function directionOffsetFun(keysPressed) {
  var directionOffset = 0; // w

  if (keysPressed["w"]) {
    if (keysPressed["a"]) {
      directionOffset = Math.PI / 4; // w+a
    } else if (keysPressed["d"]) {
      directionOffset = -Math.PI / 4; // w+d
    }
  } else if (keysPressed["s"]) {
    if (keysPressed["a"]) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (keysPressed["d"]) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (keysPressed["a"]) {
    directionOffset = Math.PI / 2; // a
  } else if (keysPressed["d"]) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
}

function animationUpdate() {
  const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);

  let play = "";
  if (directionPressed) {
    play = "Walk";
  } else {
    play = "Idle";
  }

  if (play == "Walk") {
    // calculate towards camera direction
    let angleYCameraDirection = Math.atan2(camera.position.x - box.position.x, camera.position.z - box.position.z);
    // diagonal movement angle offset
    let directionOffset = directionOffsetFun(keysPressed);

    // rotate model
    rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset);
    box.quaternion.rotateTowards(rotateQuarternion, 0.2);

    // calculate direction
    camera.getWorldDirection(walkDirection);
    walkDirection.y = 0;
    walkDirection.normalize();
    walkDirection.applyAxisAngle(rotateAngle, directionOffset);

    // run/walk velocity
    const velocity = WALK_VELOCITY;
    let delta = clock.getDelta();

    // move model & camera
    const moveX = walkDirection.x * velocity;
    const moveZ = walkDirection.z * velocity;
    box.position.x += moveX;
    box.position.z += moveZ;

    console.log(box.position);
    updateCameraTarget(moveX, moveZ);
  }
}

function loop() {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  animationUpdate();
  orbitControls.update();

  requestAnimationFrame(loop);
}

onMounted(() => {
  setRender();
  loop();
});
</script>

<style lang="scss" scoped></style>
