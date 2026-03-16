import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Terminal from './components/Terminal';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-background min-h-screen text-foreground relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Terminal />
      <Contact />
    </div>
  );
}

export default App;
