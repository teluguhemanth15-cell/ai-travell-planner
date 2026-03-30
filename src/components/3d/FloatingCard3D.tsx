import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const GlassCard = ({ position, rotation, color, label }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <RoundedBox ref={ref} args={[1.6, 1, 0.05]} radius={0.1} smoothness={4} rotation={rotation}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.3}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            metalness={0.1}
            roughness={0.2}
            color={color}
            transparent
            opacity={0.7}
          />
        </RoundedBox>
        <Text
          position={[position[0] > 0 ? -0.1 : 0.1, 0, 0.05]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const FloatingCard3D = () => {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]} style={{ background: "transparent" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1} />
        <pointLight position={[-2, -2, 3]} intensity={0.5} color="#ff8c00" />

        <GlassCard position={[-1.2, 0.3, 0]} rotation={[0, 0.3, 0.05]} color="#ff8c00" label="AI Itinerary" />
        <GlassCard position={[1.2, -0.2, -0.5]} rotation={[0, -0.2, -0.05]} color="#ff6b00" label="Budget Planner" />
        <GlassCard position={[0, 0.8, -1]} rotation={[0.1, 0, 0.1]} color="#ffaa33" label="Food & Stay" />
      </Canvas>
    </div>
  );
};

export default FloatingCard3D;
