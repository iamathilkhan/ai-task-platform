import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Terminal = () => {
  return (
    <section id="terminal" className="py-24 bg-background relative z-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-primary mb-12 tracking-tight">Terminal</h2>
      
      <motion.div 
        className="w-full max-w-3xl bg-[#090e17] border border-primary/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,210,255,0.05)] text-left"
      >
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0f172a] border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-4 font-mono text-[10px] text-foreground/50">athil@portfolio:~</span>
        </div>
        
        <div className="p-6 font-mono text-sm leading-relaxed">
          <div className="flex gap-2">
            <span className="text-primary font-bold">{'>'}</span>
            <span className="text-foreground/80">help</span>
          </div>
          <div className="text-foreground/60 mb-4 pl-4">
            Available commands: whoami, skills, projects, download-cv, help, clear
          </div>
          <div className="flex gap-2">
            <span className="text-primary font-bold">{'>'}</span>
            <span className="text-foreground/80">Type a command...</span>
            <span className="w-2 h-4 bg-primary animate-pulse inline-block mt-0.5" />
          </div>
        </div>
      </motion.div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 flex items-center gap-3 px-8 py-3 rounded-xl border border-[#0055ff]/40 bg-[#0055ff]/10 text-[#0055ff] hover:bg-[#0055ff]/20 font-medium transition-colors"
      >
        <Download size={18} />
        Download Resume
      </motion.button>
    </section>
  );
};

export default Terminal;
