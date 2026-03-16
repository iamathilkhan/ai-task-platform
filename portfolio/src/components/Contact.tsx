import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background relative z-10 flex flex-col items-center min-h-[50vh] justify-center">
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,210,255,0.05)_0%,transparent_50%] z-0" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-20 h-20 mb-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10"
      >
        <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
        <Radio className="text-primary w-8 h-8" />
      </motion.div>

      <h2 className="text-4xl font-bold text-primary mb-4 tracking-tight z-10">Get In Touch</h2>
      <p className="text-foreground/50 font-mono text-sm z-10">Transmitting signal... Ready to connect.</p>
    </section>
  );
};

export default Contact;
