import fs from "fs";
import path from "path";

interface BlogPost {
  number: string;
  slug: string;
  title: string;
  created_date: string;
  h1_title: string;
  image_url: string;
  image_alt: string;
}

interface JobPost {
  id: string;
  title: string;
  description: string;
  created_at: string;
  budget: number;
  job_type: string;
}

export async function generateSitemap(
  blogPosts: BlogPost[],
  jobs: JobPost[]
): Promise<string> {
  // Base URLs that are always in the sitemap
  const baseUrls = [
    { url: "https://flichire.com", changefreq: "daily", priority: "1.0" },
    {
      url: "https://flichire.com/privacy",
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "https://flichire.com/terms",
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "https://flichire.com/contact",
      changefreq: "monthly",
      priority: "0.5",
    },
    { url: "https://flichire.com/blog", changefreq: "daily", priority: "0.9" },
  ];

  // Create the XML string
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add base URLs
  baseUrls.forEach(({ url, changefreq, priority }) => {
    sitemapContent += "  <url>\n";
    sitemapContent += `    <loc>${url}</loc>\n`;
    sitemapContent += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemapContent += `    <priority>${priority}</priority>\n`;
    sitemapContent += "  </url>\n";
  });

  // Add blog posts
  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach((post) => {
      sitemapContent += "  <url>\n";
      sitemapContent += `    <loc>https://flichire.com/blog/${post.slug}</loc>\n`;
      sitemapContent += "    <changefreq>weekly</changefreq>\n";
      sitemapContent += "    <priority>0.9</priority>\n";
      sitemapContent += "  </url>\n";
    });
  }

  // Add jobs
  if (jobs && jobs.length > 0) {
    jobs.forEach((job) => {
      sitemapContent += "  <url>\n";
      sitemapContent += `    <loc>https://flichire.com/jobs/${job.id}</loc>\n`;
      sitemapContent += "    <changefreq>daily</changefreq>\n";
      sitemapContent += "    <priority>0.9</priority>\n";
      sitemapContent += "  </url>\n";
    });
  }

  sitemapContent += "</urlset>\n";

  return sitemapContent;
}

export async function writeSitemapToFile(
  sitemapContent: string
): Promise<void> {
  const filePath = path.join(process.cwd(), "public", "sitemap.xml");

  try {
    fs.writeFileSync(filePath, sitemapContent);
    console.log("Sitemap successfully written to", filePath);
  } catch (error) {
    console.error("Error writing sitemap file:", error);
    throw error;
  }
}
