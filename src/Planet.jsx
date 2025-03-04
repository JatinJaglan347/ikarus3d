// Planet.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Planet({ size, speed, orbitDistance, modelPath }) {
  const groupRef = useRef();
  const gltf = useGLTF(modelPath);

  // Calculate the orbit position using elapsed time.
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const angle = t * speed;
    if (groupRef.current) {
      groupRef.current.position.x = orbitDistance * Math.cos(angle);
      groupRef.current.position.z = orbitDistance * Math.sin(angle);
    }
  });

  return (
    // Wrap the planet model so we can update its position and scale it.
    <group ref={groupRef} scale={[size, size, size]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default Planet;
