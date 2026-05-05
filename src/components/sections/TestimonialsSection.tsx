"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

interface TestimonialsSectionProps {
  data?: any[];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="What People Say" 
          subtitle="Feedback from clients and colleagues I've worked with." 
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(data || []).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial._id || testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
