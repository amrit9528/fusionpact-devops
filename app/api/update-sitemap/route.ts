import { NextResponse } from "next/server";
import axios from "axios";
import {
  generateSitemap,
  writeSitemapToFile,
} from "@/app/utils/sitemap-generator";

export async function GET() {
  try {
    // Fetch blog posts from the API
    const response = await axios.get("https://seo.flichire.com/api/seo/list");
    const blogData = response.data;

    // Fetch jobs data from the API
    const jobsResponse = await axios.get(
      "https://api.socialverseapp.com/job/get_all?page=1&page_size=10&app_name=flic"
    );
    const jobsData = jobsResponse.data;

    if (!blogData.success || !blogData.data) {
      throw new Error("Failed to fetch blog data or invalid response format");
    }

    if (jobsData.status !== "success" || !jobsData.jobs) {
      throw new Error("Failed to fetch jobs data or invalid response format");
    }

    // Generate sitemap content with both blog posts and jobs
    const sitemapContent = await generateSitemap(blogData.data, jobsData.jobs);

    // Write to file
    await writeSitemapToFile(sitemapContent);

    return NextResponse.json(
      {
        success: true,
        message: "Sitemap updated successfully",
        blogCount: blogData.data.length,
        jobsCount: jobsData.jobs.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sitemap generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update sitemap",
        error: error,
      },
      { status: 500 }
    );
  }
}
