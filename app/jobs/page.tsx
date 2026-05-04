"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedNav from "../components/navigation/AnimatedNav";
import { fetchAllJobs } from "../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import LoadingAnimation from "../components/LoadingAnimation";
import { motion } from "framer-motion";

// Define types for job data
interface Hirer {
  username: string;
  first_name: string;
  last_name: string;
  name: string;
  profile_url: string;
  user_type: string;
}

interface Job {
  id: number;
  title: string;
  job_type: string;
  project_type: string;
  budget: number;
  description: string;
  required_skills: string[];
  experience_level: string;
  deadline: string;
  hiring_deadline: string;
  auto_close: boolean;
  status: string;
  is_active: boolean;
  created_at: string;
  hirer: Hirer;
  applications_count: number;
  assignment_description: string;
  assignment_explanation_link: string;
}

// Component that uses useSearchParams
function JobsContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const highlightedJobId = searchParams.get("highlight");
  const jobRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await fetchAllJobs();
        if (data.status === 'success' && Array.isArray(data.jobs)) {
          // Filter for only 'open' jobs (and ensure they are active)
          const now = new Date(); // Get current time
          const openJobs = data.jobs.filter((job: Job) => {
            const deadline = new Date(job.hiring_deadline);
            return job.status === 'open' && job.is_active && deadline >= now; // Keep if open, active, and deadline hasn't passed
          });
          setJobs(openJobs);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Effect to scroll to highlighted job
  useEffect(() => {
    if (highlightedJobId && jobRefs.current[Number(highlightedJobId)]) {
      jobRefs.current[Number(highlightedJobId)]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedJobId, jobs]);

  // Open app store or play store based on device
  const openAppStore = () => {
    // Check if it's iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.location.href =
        "https://apps.apple.com/md/app/flic-hire-editors-get-hired/id6740023994";
    } else {
      // Default to Play Store for all other devices
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.subverse.flic&hl=en_IN";
    }
  };

  // Format date to a more readable format
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // Add this function to format created_at time to relative time
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds <= 10 ? "just now" : `${seconds} seconds ago`;
    }
  };

  // Add a function to display deadline as relative time
  const getTimeUntilDeadline = (deadlineString: string) => {
    const now = new Date();
    const deadline = new Date(deadlineString);

    // If deadline is in the past, show "Expired"
    if (deadline.getTime() < now.getTime()) {
      return "Expired";
    }

    const seconds = Math.floor((deadline.getTime() - now.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} ${months === 1 ? "Month" : "Months"}`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "Day" : "Days"}`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "Hour" : "Hours"}`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`;
    } else {
      return `${seconds} ${seconds === 1 ? "Second" : "Seconds"}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <AnimatedNav bgColor="bg-black/70" variant="blog" />
        <div className="pt-32 flex justify-center items-center h-screen">
          <LoadingAnimation width={100} height={100} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <AnimatedNav bgColor="bg-black/70" variant="blog" />
        <div className="pt-32 flex flex-col justify-center items-center h-screen text-white">
          <h2 className="text-2xl font-bold mb-4">Error Loading Jobs</h2>
          <p>Unable to fetch job listings. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatedNav bgColor="bg-black/70" variant="blog" />
      <div className="container mx-auto pt-32 pb-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Jobs
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Find the perfect opportunity for your skills. Browse jobs from top
            clients looking for editors, animators, and motion graphics
            designers.
          </p>
          <div className="mt-8">
            <button
              onClick={openAppStore}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center mx-auto"
            >
              <Icon icon="mdi:cellphone" className="mr-2 text-xl" />
              Apply for Jobs in the App
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              ref={(el) => {
                jobRefs.current[job.id] = el;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`bg-zinc-900 border ${
                Number(highlightedJobId) === job.id
                  ? "border-purple-500 ring-2 ring-purple-500"
                  : "border-white/20"
              } rounded-3xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 mr-3 rounded-full overflow-hidden">
                    <LazyLoadImage
                      src={job.hirer.profile_url}
                      alt={job.hirer.name}
                      className="h-full w-full object-cover"
                      effect="blur"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{job.hirer.name}</h3>
                    <p className="text-zinc-400 text-sm">
                      {job.hirer.user_type === "hirer" ? "Hirer" : "Creator"}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">
                  {job.title}
                  <span className="text-zinc-300 text-sm ml-2">
                    {job.job_type}
                  </span>
                </h2>

                <div className="mb-4">
                  <h4 className="text-zinc-300 text-sm mb-2">Description:</h4>
                  <p className="text-zinc-300 text-sm whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-900/50 text-purple-300 text-sm px-2 py-1 flex items-center rounded">
                    <Icon icon="qlementine-icons:money-16" className="mr-1" />
                    {job.budget}$/hr
                  </span>
                  <span className="bg-blue-900/50 text-blue-300 text-sm px-2 py-1 flex items-center rounded">
                    <Icon icon="formkit:time" className="mr-1" />
                    {getTimeUntilDeadline(job.deadline)}
                  </span>
                  <span className="bg-blue-900/50 text-blue-300 text-sm px-2 py-1 flex items-center rounded">
                    <Icon icon="mynaui:location" className="mr-1" />
                    Remote
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-zinc-300 text-sm mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.required_skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded"
                      >
                        {skill.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Show brief link as text if available */}
                {job.assignment_explanation_link && (
                  <div className="mb-4">
                    <h4 className="text-zinc-300 text-sm mb-2">Brief:</h4>
                    <a
                      href={job.assignment_explanation_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                    >
                      <Icon icon="mdi:file-document-outline" className="mr-2" />
                      View Job Details
                    </a>
                  </div>
                )}

                {/* Keep only the Apply button */}
                <button
                  onClick={openAppStore}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-medium transition-colors mb-4"
                >
                  Apply
                </button>

                <div className="flex items-center mt-4 gap-2">
                  <span className="text-zinc-300 text-sm">
                    {getRelativeTime(job.created_at)}
                  </span>
                  <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <span className="text-zinc-300 text-sm">
                    {job.applications_count} applications
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="text-center py-16">
            <Icon
              icon="mdi:briefcase-off"
              className="text-6xl text-zinc-600 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Jobs Available
            </h3>
            <p className="text-zinc-400">
              Check back soon for new opportunities!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function JobsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <JobsContent />
    </Suspense>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <LoadingAnimation width={100} height={100} />
    </div>
  );
}
