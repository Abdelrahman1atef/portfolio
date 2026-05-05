"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { FiDownload, FiArrowRight } from "react-icons/fi";

interface HeroSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const title = data?.title || "Flutter Developer building scalable, high-quality mobile apps";
  const subtitle = data?.subtitle || "Focused on clean architecture, performance, and user experience. Turning ideas into real applications quickly and efficiently.";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <ParticlesBackground />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-600 dark:border-violet-900/50 dark:bg-violet-900/20 dark:text-violet-300"
          >
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2 animate-pulse"></span>
            Available for new opportunities
          </motion.div>
          
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white leading-[1.1]">
            {title}
          </h1>
          
          <p className="mb-10 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto dark:text-slate-400">
            {subtitle}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild className="w-full sm:w-auto group">
              <a href="#projects">
                View Projects
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download>
                <FiDownload className="mr-2" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </section>
  );
}
