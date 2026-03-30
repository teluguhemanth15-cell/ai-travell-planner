import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Trail, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const RotatingGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#ff8c00"
          roughness={0.2}
          metalness={0.8}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial color="#ff6b00" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
};

const OrbitRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <Trail width={0.15} length={8} color={color} attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </Trail>
  );
};

const FloatingPin = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <coneGeometry args={[0.06, 0.2, 8]} />
        <meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

const TravelGlobe = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[550px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5e6" />
        <pointLight position={[-3, -3, 2]} intensity={0.6} color="#ff8c00" />

        <Stars radius={50} depth={30} count={800} factor={3} saturation={0.5} fade speed={1} />

        <RotatingGlobe />

        {/* Orbit trails */}
        <OrbitRing radius={2.8} speed={0.6} color="#ff8c00" />
        <OrbitRing radius={3.2} speed={0.4} color="#ffaa33" />

        {/* Location pins on globe surface */}
        <FloatingPin position={[1.2, 1.2, 0.8]} delay={0} />
        <FloatingPin position={[-0.8, 1.4, 1.0]} delay={1.5} />
        <FloatingPin position={[0.5, -1.0, 1.4]} delay={3} />
        <FloatingPin position={[-1.3, 0.2, 1.2]} delay={0.8} />

        {/* Ring around globe */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.25} />
        </mesh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default TravelGlobe;
