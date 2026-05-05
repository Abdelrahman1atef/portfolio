"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  data?: any[];
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my best work, demonstrating my approach to architecture, problem-solving, and UI design." 
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(data || []).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
