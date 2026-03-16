import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-16 tracking-tight">About</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)]"
          >
            <h3 className="text-xl font-bold text-[#00d2ff] mb-4">About Me</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              I'm a passionate Machine Learning Engineer and Full-Stack Developer with expertise in
              building intelligent systems that solve real-world problems. I thrive at the intersection
              of AI research and software engineering.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)]"
          >
            <h3 className="text-xl font-bold text-[#00d2ff] mb-4">Education</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              Pursuing excellence in Computer Science with a focus on Machine Learning, Deep
              Learning, and modern web technologies. Continuously learning and applying cutting-edge
              techniques.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-[#0f172a]/80 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.05)]"
          >
            <h3 className="text-xl font-bold text-[#00d2ff] mb-4">Mission</h3>
            <p className="text-foreground/70 leading-relaxed text-sm">
              To bridge the gap between AI innovation and practical applications, creating tools
              and platforms that make intelligent technology accessible and impactful for everyone.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
