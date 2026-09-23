import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const IDLE_POSITION = new THREE.Vector3(0, 3.2, 8.5);
const IDLE_LOOKAT = new THREE.Vector3(0, 3.2, -4);

export function CameraRig({
  focusTarget,
  reducedMotion = false,
}: {
  focusTarget: THREE.Vector3 | null;
  reducedMotion?: boolean;
}) {
  const lookAtVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const { camera, pointer } = state;

    if (focusTarget) {
      const target = new THREE.Vector3(focusTarget.x, focusTarget.y, focusTarget.z + 2.4);
      camera.position.lerp(target, 0.05);
      lookAtVec.lerp(focusTarget, 0.08);
      camera.lookAt(lookAtVec);
      return;
    }

    const parallaxX = reducedMotion ? 0 : pointer.x * 0.7;
    const parallaxY = reducedMotion ? 0 : pointer.y * 0.35;
    const target = new THREE.Vector3(IDLE_POSITION.x + parallaxX, IDLE_POSITION.y + parallaxY, IDLE_POSITION.z);
    camera.position.lerp(target, 0.035);
    lookAtVec.lerp(IDLE_LOOKAT, 0.05);
    camera.lookAt(lookAtVec);
  });

  return null;
}
