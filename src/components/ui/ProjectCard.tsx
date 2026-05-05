"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-xl dark:bg-slate-950 dark:ring-slate-800"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 bg-violet-600/10 mix-blend-overlay z-10 opacity-0 transition-opacity group-hover:opacity-100" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-slate-600 dark:text-slate-400">
          {project.shortDescription}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="primary" className="flex-1 group/btn">
            <Link href={`/projects/${project.slug}`}>
              View Case Study
              <FiArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          
          {project.liveUrl && (
            <Button asChild variant="outline" size="md" className="px-3" aria-label="Live Demo">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <FiExternalLink className="h-5 w-5" />
              </a>
            </Button>
          )}
          
          {project.githubUrl && (
            <Button asChild variant="outline" size="md" className="px-3" aria-label="GitHub Repo">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <FiGithub className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
