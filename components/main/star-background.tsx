"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import type { Points as PointsType } from "three";
import { useCosmicSettings } from "@/contexts/cosmic-context";

export const StarBackground = (props: PointsProps) => {
  const settings = useCosmicSettings();
  const ref = useRef<PointsType | null>(null);
  
  // Use useMemo to recreate the sphere when starCount or starSpread changes
  // This forces THREE.js to create a new buffer instead of resizing
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(settings.starCount), { radius: settings.starSpread });
  }, [settings.starCount, settings.starSpread]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= (delta / 10) * settings.animationSpeed;
      ref.current.rotation.y -= (delta / 15) * settings.animationSpeed;
    }
  });

  const tiltRadians = (settings.initialTilt * Math.PI) / 180;

  return (
    <group rotation={[0, 0, tiltRadians]}>
      <Points
        key={`${settings.starCount}-${settings.starSpread}`} // Force remount when these change
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={settings.starSize}
          sizeAttenuation
          depthWrite={false}
          opacity={settings.starBrightness}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);