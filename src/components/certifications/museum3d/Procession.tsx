import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox } from "@react-three/drei";
import type * as THREE from "three";
import { Character } from "./Character";

export function Procession({ image, reducedMotion = false }: { image: string; reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(image);

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const t = state.clock.elapsedTime * 0.18;
    const x = Math.sin(t) * 8;
    group.current.position.x = x;
    group.current.rotation.y = Math.cos(t) >= 0 ? Math.PI / 2 : -Math.PI / 2;
  });

  return (
    <group ref={group} position={[0, 0, 1.4]}>
      <group position={[-0.32, 0, 0]}>
        <Character color="#7a1120" reducedMotion={reducedMotion} />
      </group>
      <group position={[0.32, 0, 0]}>
        <Character color="#7a1120" reducedMotion={reducedMotion} />
      </group>
      <RoundedBox args={[0.62, 0.42, 0.04]} radius={0.02} smoothness={2} position={[0, 1.15, 0]} castShadow>
        <meshStandardMaterial color="#c9a24d" roughness={0.4} metalness={0.5} />
      </RoundedBox>
      <mesh position={[0, 1.15, 0.025]}>
        <planeGeometry args={[0.52, 0.32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
