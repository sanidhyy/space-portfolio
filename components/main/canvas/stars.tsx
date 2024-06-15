import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, Suspense, useState } from "react";
import type { Points as PointsType } from "three";

// Stars
const Stars = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  // For each star
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.2 }),
  );

  // Rotate multiple stars
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points */}
      <Points
        ref={ref}
        positions={new Float32Array(sphere)}
        stride={3}
        frustumCulled
        {...props}
      >
        {/* Each point material */}
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttentuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Stars Canvas
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Show stars if not fallback */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        {/* preload all */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
