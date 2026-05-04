import { Metadata } from "next";
import { fetchJob } from "@/app/utils/api";

type GenerateMetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const data = await fetchJob(id);

    if (!data || data.status !== "success") {
      return {
        title: "Job Not Found | Flic",
        description:
          "The job you're looking for does not exist or has been removed.",
      };
    }

    const job = data.job;
    
    // Format skills with spaces instead of underscores
    const skillsText = job.required_skills 
      ? job.required_skills
          .map((skill: string) => skill.replace(/_/g, ' '))
          .join(", ")
      : "";
    
    // Create a better formatted description with proper spacing and order
    const enhancedDescription = 
      `Description: ${job.description}\n` +
      `Type: ${job.project_type} | ${job.job_type}\n` +
      `💰 Rate: $${job.budget}/hr\n` +
      `🔧 Skills: ${skillsText}\n` +
      `📊 Level: ${job.experience_level}`;

    return {
      title: `${job.title} | $${job.budget}/hr | Flic Jobs`,
      description: enhancedDescription,
      openGraph: {
        title: `${job.title} | $${job.budget}/hr | Flic Jobs`,
        description: enhancedDescription,
        images: [
          {
            url: job.hirer.profile_url,
            width: 200,
            height: 200,
            alt: job.title,
          },
        ],
        url: `https://flichire.com/jobs/${id}`,
        type: "profile",
        siteName: "Flichire",
      },
      twitter: {
        card: "summary",
        site: "@flichire",
        title: `${job.title} | $${job.budget}/hr | Flic Jobs`,
        description: enhancedDescription,
        images: [job.hirer.profile_url],
      },
      alternates: {
        canonical: `https://flichire.com/jobs/${id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Job | Flic",
      description: "View video editing job details on Flic",
    };
  }
}

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return children;
}
