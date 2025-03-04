// SolarSystem.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls } from '@react-three/drei';
import { DoubleSide } from 'three';
import Planet from './Planet';

function RotatingSun({ sunGLTF, scale }) {
  const sunRef = useRef();
  // Rotate the Sun on its Y-axis
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <group ref={sunRef}>
      <primitive object={sunGLTF.scene} scale={scale} />
    </group>
  );
}

function SolarSystem({ config }) {
  // Load the Sun model from the public folder.
  const sunGLTF = useGLTF('/sun.glb');

  return (
    <Canvas camera={{ position: [0, 20, 70], fov: 60 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      <OrbitControls />

      {/* Render the rotating Sun at the center */}
      <Center>
        <RotatingSun sunGLTF={sunGLTF} scale={[3, 3, 3]} />
      </Center>

      {/* Render orbit rings */}
      {config.map((planet, index) => (
        <mesh
          key={`orbit-${index}`}
          rotation={[-Math.PI / 2, 0, 0]} // Lays flat in XZ-plane
        >
          <ringGeometry args={[planet.orbitDistance - 0.5, planet.orbitDistance + 0.5, 128]} />
          <meshBasicMaterial
            color="white"
            side={DoubleSide}
            opacity={0.8}
            transparent
          />
        </mesh>
      ))}

      {/* Render each planet */}
      {config.map((planet, index) => (
        <Planet 
          key={index}
          size={planet.size}
          speed={planet.speed}
          orbitDistance={planet.orbitDistance}
          modelPath={planet.modelPath}
        />
      ))}
    </Canvas>
  );
}

export default SolarSystem;
