import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

export function Character({ color = "#7a1120", reducedMotion = false }: { color?: string; reducedMotion?: boolean }) {
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime * 6;
    if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t) * 0.5;
    if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
  });

  return (
    <group>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#f4e9da" />
      </mesh>
      <mesh position={[0, 1.68, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.17, 0.12, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.5, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <group ref={leftLeg} position={[-0.08, 0.85, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.045, 0.36, 4, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.08, 0.85, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <capsuleGeometry args={[0.045, 0.36, 4, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    </group>
  );
}
