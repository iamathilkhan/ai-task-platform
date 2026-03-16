import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  "Python", "TensorFlow", "PyTorch", "React", "Node.js", 
  "Docker", "PostgreSQL", "Machine Learning", "Deep Learning", "Full Stack Dev"
];

// Give them sequential colors or random ones like in the screenshot
const colors = [
  "border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/10", // Blue
  "border-[#0ea5e9] text-[#0ea5e9] bg-[#0ea5e9]/10", // Light Blue
  "border-[#8b5cf6] text-[#8b5cf6] bg-[#8b5cf6]/10", // Purple
  "border-[#2563eb] text-[#2563eb] bg-[#2563eb]/10", // Royal Blue
  "border-[#14b8a6] text-[#14b8a6] bg-[#14b8a6]/10", // Teal
  "border-[#c026d3] text-[#c026d3] bg-[#c026d3]/10", // Fuchsia
  "border-[#2563eb] text-[#2563eb] bg-[#2563eb]/10", // Blue
  "border-[#0d9488] text-[#0d9488] bg-[#0d9488]/10", // Dark Teal
  "border-[#6b21a8] text-[#6b21a8] bg-[#6b21a8]/10", // Deep Purple
  "border-[#0284c7] text-[#0284c7] bg-[#0284c7]/10"  // Sky
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background relative z-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-primary mb-12 tracking-tight">Skills</h2>
      <div className="max-w-4xl flex flex-wrap justify-center gap-4 px-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`px-6 py-2 rounded-full border ${colors[index % colors.length]} font-mono text-sm tracking-wide cursor-default`}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
