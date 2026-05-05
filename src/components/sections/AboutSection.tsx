"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface AboutSectionProps {
  data?: {
    bio?: string;
    profileImage?: string;
    stats?: { value: string; label: string }[];
  };
}

export function AboutSection({ data }: AboutSectionProps) {
  const bio = data?.bio || "I didn't choose Flutter randomly—it came after exploring different technologies and realizing I enjoy building complete products, not just writing code.";
  const profileImage = data?.profileImage || "/images/me.jpg";
  const stats = data?.stats || [
    { value: "1+", label: "Years Experience" },
    { value: "5+", label: "Projects Completed" },
    { value: "100%", label: "Commitment" },
    { value: "∞", label: "Lines of Code" },
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="About Me" 
          subtitle="My journey and philosophy as a developer." 
        />
        
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10 dark:bg-slate-950 dark:ring-slate-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:aspect-square overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
                  <Image
                    src={profileImage}
                    alt="Abdelrahman Atef"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: bio.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-slate-100 pt-8 dark:border-slate-800">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4">
                  <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">{stat.value}</span>
                  <span className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
