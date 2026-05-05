"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

interface SkillsSectionProps {
  data?: any[];
}

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="My Skills" 
          subtitle="The tools and technologies I use to build scalable mobile applications." 
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(data || []).map((categoryData, index) => (
            <SkillCard
              key={categoryData.category}
              category={categoryData.category}
              skills={categoryData.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
