import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSphere = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 5; // radius
        p[i*3] = r * Math.sin(phi) * Math.cos(theta);
        p[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        p[i*3+2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00d2ff" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const NetworkLines = () => {
  const ref = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(4.9, 16, 16);
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#0055ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ParticleSphere />
          <NetworkLines />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-screen" />
        <h2 className="text-primary tracking-[0.2em] font-mono text-xs md:text-sm uppercase mb-6">
          Welcome To My Digital Space
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00d2ff] via-[#4a90e2] to-[#a855f7]">
          Ahamed Athil Khan
        </h1>
        <h3 className="text-xl md:text-2xl text-foreground/80 font-light mb-4">
          Machine Learning Engineer & Full-Stack Developer
        </h3>
        <p className="text-foreground/50 italic mb-10 max-w-xl text-lg">
          "Building intelligent systems and scalable applications"
        </p>
        
        <a 
          href="#projects" 
          className="px-8 py-3 rounded-xl border border-primary/40 bg-primary/10 text-primary font-medium hover:bg-primary/20 hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          Explore My Work
        </a>
      </div>
    </section>
  );
};

export default Hero;
