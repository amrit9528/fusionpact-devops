import axios from "axios";

const API_BASE_URL = "https://api.socialverseapp.com";

export const fetchUserProfile = async (username: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/profile/${username}?app_name=flic`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const fetchUserPosts = async (username: string, page: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${username}/posts?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPost = async (postId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posts/${postId}?app_name=flic`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const fetchSeo = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_METADATA_API_URL}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SEO:", error);
    throw error;
  }
};

export const fetchBlogList = async () => {
  try {
    // console.log("Fetching blog list...");
    const response = await axios.get("https://seo.flichire.com/api/seo/list");
    // console.log("Blog list response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog list:", error);
    throw error;
  }
};

export const fetchBlogDetail = async (slug: string) => {
  try {
    // Ensure slug is a string (in case it's passed as a number)
    const sanitizedSlug = String(slug);
    const response = await axios.get(
      `https://seo.flichire.com/api/seo/get/${sanitizedSlug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    throw error;
  }
};

export const fetchAllJobs = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/job/get_all?page=${page}&page_size=${pageSize}&app_name=flic`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const fetchJob = async (jobId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/job/get/${jobId}?app_name=flic`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};
