"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800"
    >
      <FiMessageSquare className="absolute top-8 right-8 h-8 w-8 text-violet-100 dark:text-violet-900/30" />
      
      <p className="relative z-10 mb-8 text-lg italic text-slate-700 dark:text-slate-300">
        &quot;{testimonial.quote}&quot;
      </p>
      
      <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          {/* Fallback avatar if image fails to load or isn't generated yet */}
          <div className="flex h-full w-full items-center justify-center bg-violet-100 text-lg font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
            {testimonial.name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
