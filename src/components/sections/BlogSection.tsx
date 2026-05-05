"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";

interface BlogSectionProps {
  data?: any[];
}

export function BlogSection({ data }: BlogSectionProps) {
  return (
    <section id="blog" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Latest Writings" 
          subtitle="Thoughts, tutorials, and insights about mobile development and software engineering." 
        />
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(data || []).map((post, index) => (
            <BlogCard
              key={post._id || post.id}
              post={post}
              index={index}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
