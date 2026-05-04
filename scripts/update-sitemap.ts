import axios from "axios";
import {
  generateSitemap,
  writeSitemapToFile,
} from "../app/utils/sitemap-generator";

async function updateSitemap() {
  try {
    console.log("Fetching blog data...");
    const response = await axios.get("https://seo.flichire.com/api/seo/list");
    const blogData = response.data;

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

    console.log(`Found ${blogData.data.length} blog posts`);

    // Generate sitemap content
    const sitemapContent = await generateSitemap(blogData.data, jobsData.jobs);

    // Write to file
    await writeSitemapToFile(sitemapContent);

    console.log("Sitemap updated successfully!");
  } catch (error) {
    console.error("Failed to update sitemap:", error);
  }
}

// Execute the function
updateSitemap();
