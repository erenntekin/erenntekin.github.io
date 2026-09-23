"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Room } from "./Room";
import { Artwork } from "./Artwork";
import { Procession } from "./Procession";
import { CameraRig } from "./CameraRig";
import { useReducedMotion } from "./useReducedMotion";

function SpotlightRig() {
  const target = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.position.set(0, 3.35, -6.25);
    return obj;
  }, []);

  return (
    <>
      <primitive object={target} />
      <spotLight
        position={[0, 8.2, -2.8]}
        angle={0.5}
        penumbra={0.65}
        intensity={90}
        distance={18}
        color="#f0d999"
        castShadow
        shadow-mapSize={[1024, 1024]}
        target={target}
      />
    </>
  );
}

export function MuseumScene3D({
  mainImage,
  processionImage,
  onSelectMain,
}: {
  mainImage: string;
  processionImage: string;
  onSelectMain: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const [focus, setFocus] = useState<THREE.Vector3 | null>(null);

  function handleSelect() {
    setFocus(new THREE.Vector3(0, 3.35, -6.25));
    onSelectMain();
    window.setTimeout(() => setFocus(null), 1600);
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows={{ type: THREE.VSMShadowMap }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 3.2, 8.5], fov: 55 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.95 }}
      >
        <color attach="background" args={["#0d0a07"]} />
        <fog attach="fog" args={["#0d0a07", 14, 40]} />
        <ambientLight intensity={1.1} color="#e8c983" />
        <hemisphereLight args={["#8a7a5a", "#0d0a07", 1.1]} />
        <SpotlightRig />
        <directionalLight position={[6, 6, 4]} intensity={0.5} color="#f0d999" />
        <pointLight position={[0, 2.2, 4]} intensity={12} distance={12} color="#f0d999" />

        <Suspense fallback={null}>
          <Room />
          <Artwork image={mainImage} onSelect={handleSelect} />
          <Procession image={processionImage} reducedMotion={reducedMotion} />
        </Suspense>

        <CameraRig focusTarget={focus} reducedMotion={reducedMotion} />

        <EffectComposer>
          <Bloom mipmapBlur intensity={0.35} luminanceThreshold={0.8} luminanceSmoothing={0.15} />
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
