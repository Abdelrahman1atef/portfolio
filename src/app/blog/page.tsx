import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/ui/BlogCard";
import { getBlogPosts } from "@/lib/fetchData";

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Blog" 
            subtitle="Articles, tutorials, and insights about Flutter and mobile development." 
          />
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any, index: number) => (
              <BlogCard key={post._id} post={post} index={index} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">No articles published yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
