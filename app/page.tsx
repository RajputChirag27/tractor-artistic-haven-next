'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Tractor3D } from './components/Tractor3D';

export default function Home() {
  const [selectedTractor, setSelectedTractor] = useState('legacy');

  return (
    <div className="min-h-screen bg-[#0a1428] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass py-4">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🚜</span>
            <h1 className="text-3xl font-bold tracking-tighter">TRACTOR HAVEN</h1>
          </div>
          <div className="flex gap-8 text-lg">
            <a href="#fleet" className="hover:text-blue-400 transition-colors">Fleet</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">3D Experience</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_0.8px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-blue-300 bg-clip-text text-transparent">
              POWER MEETS ART
            </h1>
            <p className="text-3xl text-blue-300 mb-10">Immersive 3D Tractor Universe</p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-4xl">↓</div>
      </section>

      {/* 3D Interactive Section */}
      <section id="experience" className="h-[100vh] relative bg-black">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 8, 18], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
            <Tractor3D type={selectedTractor} />
            <Environment preset="night" />
            <Stars radius={300} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
            <OrbitControls enablePan={false} enableZoom={true} minDistance={8} maxDistance={35} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4">
          {['legacy', 'modern', 'future'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTractor(type)}
              className={`px-8 py-4 rounded-2xl font-medium transition-all ${selectedTractor === type ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/50' : 'glass hover:bg-white/10'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Series
            </motion.button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="fleet" className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-6xl font-bold text-center mb-16">The Legendary Fleet</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {name: 'John Deere Legacy', desc: 'Classic power since 1837', emoji: '🌾'},
            {name: 'Autonomous Beast', desc: 'AI-Driven Future Tractor', emoji: '🤖'},
            {name: 'Mountain Crusher', desc: 'Heavy Duty Off-Road King', emoji: '⛰️'}
          ].map((tractor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-8 hover:scale-105 transition-transform group"
            >
              <div className="text-8xl mb-6 group-hover:rotate-12 transition-transform">{tractor.emoji}</div>
              <h3 className="text-3xl font-semibold mb-3">{tractor.name}</h3>
              <p className="text-blue-300 text-lg">{tractor.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center border-t border-white/10">
        <p>© 2026 Tractor Haven • Built with Next.js + Three.js by Grok</p>
      </footer>
    </div>
  );
}
