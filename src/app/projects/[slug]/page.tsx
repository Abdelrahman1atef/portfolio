import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, getProjectsData } from "@/lib/fetchData";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjectsData();
  return projects.map((p: any) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/#projects" 
            className="mb-8 inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
          
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-12">
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white leading-tight">
                {project.title}
              </h1>
              <p className="mb-8 text-xl text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink className="mr-2" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <FiGithub className="mr-2" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </header>
            
            {/* Main Image */}
            <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-200 ring-1 ring-slate-200 shadow-lg dark:bg-slate-800 dark:ring-slate-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-12">
              {project.problem && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-800">The Problem</h2>
                  <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{project.problem}</p>
                </section>
              )}
              
              {project.solution && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-800">The Solution</h2>
                  <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{project.solution}</p>
                </section>
              )}
              
              {project.features && project.features.length > 0 && (
                <section className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
                  <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                    {project.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="mr-3 mt-1 shrink-0 text-violet-600 dark:text-violet-400" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {project.architecture && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-800">Architecture & Technical Details</h2>
                  <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{project.architecture}</p>
                </section>
              )}
              
              {project.challenges && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 pb-2 dark:border-slate-800">Challenges & Learnings</h2>
                  <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{project.challenges}</p>
                </section>
              )}
            </div>
            
            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-violet-600 p-8 text-center text-white dark:bg-violet-900/50 dark:ring-1 dark:ring-violet-800">
              <h2 className="mb-4 text-2xl font-bold">Want to build something similar?</h2>
              <p className="mb-6 text-violet-100">Let's discuss how we can bring your idea to life.</p>
              <Button asChild variant="secondary" size="lg">
                <a href="mailto:Abdelrahmanatef3221@gmail.com">Contact Me Today</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
