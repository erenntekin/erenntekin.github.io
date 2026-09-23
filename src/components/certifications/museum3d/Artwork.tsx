import { useState } from "react";
import { useTexture, RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

const BRASS = "#c9a24d";

export function Artwork({
  image,
  position = [0, 3.35, -6.25] as [number, number, number],
  scale = 1,
  onSelect,
}: {
  image: string;
  position?: [number, number, number];
  scale?: number;
  onSelect: () => void;
}) {
  const texture = useTexture(image);
  const [hovered, setHovered] = useState(false);

  const w = 2.3 * scale;
  const h = 1.65 * scale;

  return (
    <group
      position={position}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh>
        <planeGeometry args={[w + 1.4, h + 1.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <RoundedBox args={[w + 0.24, h + 0.24, 0.12]} radius={0.03} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial
          color={BRASS}
          roughness={0.35}
          metalness={0.6}
          emissive={hovered ? BRASS : "#000000"}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
      </RoundedBox>
      <RoundedBox args={[w + 0.06, h + 0.06, 0.04]} radius={0.015} smoothness={2} position={[0, 0, 0.05]}>
        <meshStandardMaterial color="#efe4c8" roughness={0.5} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[w, h]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
