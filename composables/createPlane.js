import * as THREE from "three";

export default function createPlane(src) {
  const WIDTH = 80;
  const HEIGHT = 80;
  const REPEAT_COUNT = 10;

  const planeTextureLoad = src;

  const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 512, 512);
  const material = new THREE.MeshBasicMaterial({
    map: planeTextureLoad,
  });

  wrapAndRepeatTexture(material.map, REPEAT_COUNT);

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI * -0.5;

  return plane;
}

// plane 반복해서 넓여주는
function wrapAndRepeatTexture(map, count) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.x = count;
  map.repeat.y = count;
}
