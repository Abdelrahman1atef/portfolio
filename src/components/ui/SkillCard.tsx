"use client";

import { motion } from "framer-motion";
import { FiCode, FiSmartphone, FiDatabase, FiLayout, FiTool, FiBox, FiCloud, FiServer } from "react-icons/fi";

interface Skill {
  name: string;
  level: number;
}

interface SkillCardProps {
  category: string;
  skills: Skill[];
  index: number;
}

export function SkillCard({ category, skills, index }: SkillCardProps) {
  // Map categories to icons
  const getIcon = () => {
    switch (category) {
      case "Mobile Development": return <FiSmartphone className="h-6 w-6" />;
      case "Programming": return <FiCode className="h-6 w-6" />;
      case "Architecture": return <FiLayout className="h-6 w-6" />;
      case "State Management": return <FiBox className="h-6 w-6" />;
      case "Backend & APIs": return <FiServer className="h-6 w-6" />;
      case "Firebase": return <FiCloud className="h-6 w-6" />;
      case "Tools": return <FiTool className="h-6 w-6" />;
      case "Packages": return <FiDatabase className="h-6 w-6" />;
      default: return <FiCode className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-violet-200 dark:bg-slate-950 dark:ring-slate-800 dark:hover:ring-violet-900/50"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {category}
        </h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1 flex justify-between text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
              <span className="text-slate-500 dark:text-slate-400">{skill.level}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
