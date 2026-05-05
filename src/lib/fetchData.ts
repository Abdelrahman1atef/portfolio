const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') return '/api';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
  return "http://127.0.0.1:3000/api";
};

const API_URL = getBaseUrl();

export async function getAboutData() {
  try {
    const res = await fetch(`${API_URL}/about`, { next: { revalidate: 3600  } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export async function getProjectsData() {
  try {
    const res = await fetch(`${API_URL}/projects`, { next: { revalidate: 3600  } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/projects/slug/${slug}`, { next: { revalidate: 3600  } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

export async function getSkillsData() {
  try {
    const res = await fetch(`${API_URL}/skills`, { next: { revalidate: 3600  } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    const res = await fetch(`${API_URL}/blog`, { next: { revalidate: 3600  } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blog/slug/${slug}`, { next: { revalidate: 3600  } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

export async function getTestimonialsData() {
  try {
    const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 3600  } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    return [];
  }
}

export async function getSettingsData() {
  try {
    const res = await fetch(`${API_URL}/settings`, { next: { revalidate: 3600  } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching settings data:", error);
    return null;
  }
}
