import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#090e17]/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-primary font-bold text-xl tracking-widest font-mono">
          AAK
        </a>
        <div className="hidden md:flex gap-8 text-sm font-mono tracking-wide text-foreground/70">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#terminal" className="hover:text-primary transition-colors">Terminal</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
