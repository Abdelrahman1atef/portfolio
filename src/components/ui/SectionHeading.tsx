import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 flex flex-col items-center text-center", className)} {...props}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-1 w-20 rounded bg-violet-600"></div>
    </div>
  );
}
