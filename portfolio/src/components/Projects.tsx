import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-16 tracking-tight">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)] flex flex-col h-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">ZeroMind AI</h3>
            <p className="text-primary text-sm font-mono mb-4 tracking-wide">AI Mentor System</p>
            <p className="text-foreground/70 leading-relaxed text-sm">
              An intelligent AI mentoring platform that provides personalized learning paths, real-
              time feedback, and adaptive assessments...
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)] flex flex-col h-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Neptune ML</h3>
            <p className="text-[#00d2ff] text-sm font-mono mb-4 tracking-wide">Ocean ML Prediction</p>
            <p className="text-foreground/70 leading-relaxed text-sm">
              A machine learning system for ocean-based environmental prediction, analyzing satellite
              data and sensor readings to forecast marin...
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)] flex flex-col h-full"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Biometric Auth</h3>
            <p className="text-[#00d2ff] text-sm font-mono mb-4 tracking-wide">Authentication System</p>
            <p className="text-foreground/70 leading-relaxed text-sm">
              A multi-modal biometric authentication system using facial recognition, fingerprint
              analysis, and behavioral biometrics for...
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
