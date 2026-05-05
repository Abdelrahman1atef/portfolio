"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import Link from "next/link";

interface BlogCardProps {
  post: {
    _id?: string;
    id?: string | number;
    title: string;
    preview?: string;
    description?: string;
    publishDate?: string;
    date?: string;
    slug: string;
  };
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const date = post.publishDate || post.date || "";
  const excerpt = post.preview || post.description || "";

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group h-full flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md hover:ring-violet-300 dark:bg-slate-950 dark:ring-slate-800 dark:hover:ring-violet-800"
      >
        <div>
          <div className="mb-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
            <FiCalendar className="mr-2" />
            <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
          </div>
          <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 transition-colors">
            {post.title}
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400 line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        <div className="mt-auto flex items-center font-medium text-violet-600 dark:text-violet-400">
          Read Article
          <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </Link>
  );
}
