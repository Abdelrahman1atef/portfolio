import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiSmartphone } from "react-icons/fi";

interface FooterProps {
  settings?: {
    socialLinks?: {
      github?: string;
      linkedin?: string;
      whatsapp?: string;
    };
    email?: string;
  };
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const githubUrl = settings?.socialLinks?.github || "https://github.com/Abdelrahman1atef";
  const linkedinUrl = settings?.socialLinks?.linkedin || "https://www.linkedin.com/in/abdelrahman-atef-b1a59b24a";
  const email = settings?.email || "Abdelrahmanatef3221@gmail.com";

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link href="/" className="text-xl font-bold tracking-tight text-violet-600 dark:text-violet-400">
              Atef<span className="text-slate-900 dark:text-white">.dev</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Flutter Developer based in Egypt.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.masader.Abhr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-violet-900/30 dark:hover:text-violet-400"
              aria-label="Google Play"
            >
              <FiSmartphone size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} Abdelrahman Atef. All rights reserved.
          </p>
          <a
            href="#"
            className="text-sm font-medium text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
