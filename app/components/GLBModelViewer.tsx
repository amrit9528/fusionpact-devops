"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
}

// Loading component that shows outside Canvas
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading 3D Model...</p>
      </div>
    </div>
  );
}

// 3D fallback component using THREE objects
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="hotpink" wireframe />
    </mesh>
  );
}

function Model({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  autoRotate = false,
}: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath, true);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    if (names.length > 0) {
      const firstAnimation = names[0];
      actions[firstAnimation]?.reset().fadeIn(0.5).play();
    }

    if (names.length > 0) {
      console.log("Available animations:", names);
    } else {
      console.log("No animations found in model");
    }

    return () => {
      Object.values(actions).forEach((action) => action?.fadeOut(0.5));
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={scale} position={position} />
  );
}

interface GLBModelViewerProps {
  modelPath: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  autoRotate?: boolean;
}

const GLBModelViewer: React.FC<GLBModelViewerProps> = ({
  modelPath,
  width = 800,
  height = 500,
  backgroundColor = "#f0f0f0",
  autoRotate = false,
}) => {
  const [loading, setLoading] = useState(true);
  useGLTF.preload(modelPath, true);

  return (
    <div
      style={{ width, height, background: backgroundColor }}
      className="relative rounded-lg shadow-xl overflow-hidden"
    >
      {loading && <LoadingSpinner />}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]} // Optimizes for performance and quality
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <Model
            modelPath={modelPath}
            scale={1.5}
            position={[0, -1, 0]}
            autoRotate={autoRotate}
          />
          <Environment preset="city" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -1.5, 0]}
            opacity={0.5}
            width={10}
            height={10}
            blur={1}
            far={1.5}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-1">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default GLBModelViewer;
