import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const MARBLE = "#3d362b";
const MARBLE_VEIN = "#2a251c";
const STONE = "#4a4032";
const STONE_LIGHT = "#6b5d47";
const BRONZE = "#8a6a3f";
const BRASS = "#c9a24d";

function useMarbleTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = MARBLE;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = MARBLE_VEIN;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 14; i++) {
      ctx.lineWidth = Math.random() * 1.5 + 0.3;
      ctx.beginPath();
      const startX = Math.random() * size;
      ctx.moveTo(startX, 0);
      let x = startX;
      for (let y = 0; y <= size; y += 32) {
        x += (Math.random() - 0.5) * 40;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    const slab = size / 4;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * slab);
      ctx.lineTo(size, i * slab);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i * slab, 0);
      ctx.lineTo(i * slab, size);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function useStoneTexture(base: string) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 900; i++) {
      const shade = Math.random() * 30 - 15;
      ctx.fillStyle = `rgba(${shade > 0 ? 255 : 0},${shade > 0 ? 255 : 0},${shade > 0 ? 255 : 0},${Math.abs(shade) / 90})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, Math.random() * 3 + 1, Math.random() * 3 + 1);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 2);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [base]);
}

function Column({ x, stoneMap }: { x: number; stoneMap: THREE.Texture }) {
  return (
    <group position={[x, 0, -4]}>
      <RoundedBox args={[1.05, 0.28, 1.05]} radius={0.05} smoothness={2} castShadow receiveShadow position={[0, 0.14, 0]}>
        <meshStandardMaterial color={STONE} roughness={0.75} map={stoneMap} />
      </RoundedBox>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <torusGeometry args={[0.46, 0.05, 10, 24]} />
        <meshStandardMaterial color={STONE_LIGHT} roughness={0.6} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 2.6, 0]}>
        <cylinderGeometry args={[0.36, 0.46, 4.3, 24, 4]} />
        <meshStandardMaterial color="#e7ddc7" roughness={0.55} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 4.78, 0]}>
        <torusGeometry args={[0.4, 0.06, 10, 24]} />
        <meshStandardMaterial color={BRONZE} roughness={0.4} metalness={0.5} />
      </mesh>
      <RoundedBox args={[1.15, 0.34, 1.15]} radius={0.06} smoothness={2} castShadow receiveShadow position={[0, 5.05, 0]}>
        <meshStandardMaterial color={BRONZE} roughness={0.4} metalness={0.55} />
      </RoundedBox>
    </group>
  );
}

function Arch() {
  return (
    <group position={[0, 7.15, -4]}>
      <mesh castShadow>
        <torusGeometry args={[2.95, 0.32, 14, 40, Math.PI]} />
        <meshStandardMaterial color={STONE_LIGHT} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0, 0.02]}>
        <torusGeometry args={[2.95, 0.06, 10, 40, Math.PI]} />
        <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh castShadow position={[0, 0, -0.02]}>
        <torusGeometry args={[2.62, 0.05, 10, 40, Math.PI]} />
        <meshStandardMaterial color={BRASS} roughness={0.35} metalness={0.65} />
      </mesh>
    </group>
  );
}

export function Room() {
  const marble = useMarbleTexture();
  const wallStone = useStoneTexture("#4a4032");
  const sideStone = useStoneTexture("#3a3226");

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2]} receiveShadow>
        <planeGeometry args={[44, 44]} />
        <meshStandardMaterial map={marble} roughness={0.3} metalness={0.08} />
      </mesh>

      <mesh position={[0, 5, -6.4]} receiveShadow>
        <planeGeometry args={[34, 11]} />
        <meshStandardMaterial map={wallStone} color={STONE} roughness={0.85} />
      </mesh>

      <mesh position={[-15, 5, -2]} rotation={[0, Math.PI / 5, 0]} receiveShadow>
        <planeGeometry args={[16, 11]} />
        <meshStandardMaterial map={sideStone} color="#3a3226" roughness={0.9} />
      </mesh>
      <mesh position={[15, 5, -2]} rotation={[0, -Math.PI / 5, 0]} receiveShadow>
        <planeGeometry args={[16, 11]} />
        <meshStandardMaterial map={sideStone} color="#3a3226" roughness={0.9} />
      </mesh>

      <mesh position={[0, 10.2, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 20]} />
        <meshStandardMaterial color="#16130f" roughness={1} />
      </mesh>

      <Column x={-4.4} stoneMap={wallStone} />
      <Column x={4.4} stoneMap={wallStone} />
      <Column x={-9.5} stoneMap={wallStone} />
      <Column x={9.5} stoneMap={wallStone} />

      <Arch />

      <mesh position={[0, 0.02, -4]} receiveShadow>
        <ringGeometry args={[0.05, 1.9, 48]} />
        <meshStandardMaterial color={BRASS} roughness={0.4} metalness={0.5} transparent opacity={0.14} />
      </mesh>
    </group>
  );
}
