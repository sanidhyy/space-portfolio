"use client";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Ensure THREE is properly extended
extend({ OrbitControls });

const EarthLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white">Loading Earth...</p>
      </div>
    </div>
  );
};

const Earth = () => {
  const earthRef = useRef<THREE.Group>(null);
  
  // Use useGLTF with error handling
  const { scene, error } = useGLTF("/planet/scene.gltf") as any;
  
  useEffect(() => {
    if (error) {
      console.error("GLTF loading error:", error);
    }
    if (scene) {
      console.log("GLTF loaded successfully:", scene);
    }
  }, [scene, error]);

  // Add rotation animation
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  if (error) {
    console.log("Error loading GLTF, showing fallback");
    return (
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
    );
  }

  if (!scene) {
    console.log("Scene not ready yet");
    return null;
  }

  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();
  
  return (
    <group ref={earthRef}>
      <primitive 
        object={clonedScene}
        scale={[2.5, 2.5, 2.5]}
        position={[0, 0, 0]}
      />
    </group>
  );
};

export const EarthCanvas = () => {
  console.log("EarthCanvas rendering with version-safe setup...");
  
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        onCreated={({ gl }) => {
          gl.setSize(gl.domElement.parentElement?.clientWidth || 800, gl.domElement.parentElement?.clientHeight || 600);
        }}
      >
        <Suspense fallback={<EarthLoader />}>
          {/* Lighting setup */}
          <ambientLight intensity={0.1} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.5} 
            color="#7c4dff" 
          />
          
          {/* Controls */}
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
          {/* Earth Model */}
          <Earth />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the GLTF
useGLTF.preload("/planet/scene.gltf");