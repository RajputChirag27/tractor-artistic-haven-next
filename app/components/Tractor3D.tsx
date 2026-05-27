'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface TractorProps {
  type: string;
}

export function Tractor3D({ type }: TractorProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const wheel1Ref = useRef<Mesh>(null!);
  const wheel2Ref = useRef<Mesh>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (wheel1Ref.current) wheel1Ref.current.rotation.x = state.clock.elapsedTime * 2;
    if (wheel2Ref.current) wheel2Ref.current.rotation.x = state.clock.elapsedTime * 2;
  });

  const color = type === 'legacy' ? '#15803d' : type === 'modern' ? '#1e40af' : '#7c3aed';

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[8, 4, 12]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 7, -2]}>
        <boxGeometry args={[5, 4, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <group>
        {/* Front Wheels */}
        <mesh ref={wheel1Ref} position={[-4, 2, 5]}>
          <cylinderGeometry args={[2, 2, 1.5, 24]} />
          <meshStandardMaterial color="#111827" metalness={0.6} />
        </mesh>
        <mesh ref={wheel2Ref} position={[4, 2, 5]}>
          <cylinderGeometry args={[2, 2, 1.5, 24]} />
          <meshStandardMaterial color="#111827" metalness={0.6} />
        </mesh>

        {/* Rear Wheels */}
        <mesh position={[-4, 2, -5]}>
          <cylinderGeometry args={[2.8, 2.8, 2, 24]} />
          <meshStandardMaterial color="#111827" metalness={0.6} />
        </mesh>
        <mesh position={[4, 2, -5]}>
          <cylinderGeometry args={[2.8, 2.8, 2, 24]} />
          <meshStandardMaterial color="#111827" metalness={0.6} />
        </mesh>
      </group>

      {/* Exhaust */}
      <mesh position={[3, 8, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 6]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* Lights */}
      <pointLight position={[0, 6, 8]} color="#fef08c" intensity={3} />
    </group>
  );
}
