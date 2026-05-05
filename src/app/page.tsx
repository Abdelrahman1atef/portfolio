import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { 
  getAboutData, 
  getProjectsData, 
  getSkillsData, 
  getTestimonialsData, 
  getBlogPosts,
  getSettingsData 
} from "@/lib/fetchData";

export default async function Home() {
  // Fetch all data in parallel on the server
  const [
    aboutData,
    projectsData,
    skillsData,
    testimonialsData,
    blogData,
    settingsData
  ] = await Promise.all([
    getAboutData(),
    getProjectsData(),
    getSkillsData(),
    getTestimonialsData(),
    getBlogPosts(),
    getSettingsData()
  ]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <HeroSection data={aboutData} />
        <AboutSection data={aboutData} />
        <SkillsSection data={skillsData} />
        <ProjectsSection data={projectsData} />
        <TestimonialsSection data={testimonialsData} />
        <BlogSection data={blogData} />
        <ContactSection settings={settingsData} />
      </main>
      <Footer settings={settingsData} />
    </>
  );
}
