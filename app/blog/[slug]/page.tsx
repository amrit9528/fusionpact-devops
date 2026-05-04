/* eslint-disable */
"use client";
import { notFound } from "next/navigation";
import AnimatedNav from "@/app/components/navigation/AnimatedNav";
import { fetchBlogDetail } from "@/app/utils/api";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Move interfaces to types/index.ts for better organization
interface Section {
  h2: string;
  content: string;
  subsections: {
    h3: string;
    content: string;
  }[];
}

interface FAQ {
  question: string;
  answer: string;
}

// Add interface for Backlink
interface Backlink {
  created_date: string;
  h1_title: string;
  image_alt: string;
  image_url: string;
  number: number;
  slug: string;
  title: string;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>("");

  const [blogData, setBlogData] = useState<any>(null);
  const [backlinksData, setBacklinksData] = useState<Backlink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Add this mapping function for redirects
  function getTextSlugFromNumber(numberSlug: string): string | null {
    const slugMap: { [key: string]: string } = {
      "1": "maximizing-impact-with-motion-graphics-flichire",
      "2": "maximize-creative-opportunities-hire-visual-professionals-flichire",
      "3": "elevate-brand-hire-skilled-motion-graphics-artists-flichire",
      "4": "master-creative-collaboration-hire-visual-storytellers-flichire",
      "5": "unlock-creative-potential-hire-talented-motion-designers-flichire",
      "6": "future-of-hiring-motion-graphic-designers-flichire",
      "7": "master-remote-collaboration-top-video-editors-flichire",
      "8": "maximizing-impact-motion-graphics-flichire",
      "9": "streamline-hiring-motion-graphics-designers-flichire",
      "10": "remote-collaboration-video-editing-hire-flichire",
      "11": "guide-to-color-grading-hire-creative-visual-professionals-flichire",
      "12": "ultimate-guide-to-hiring-3d-visual-artists-flichire",
      "13": "art-of-visual-storytelling-hire-flic-hire",
      "14": "harness-power-motion-graphics-brand-flichire",
      "15": "future-of-visual-storytelling-hire-expert-video-creators-flichire",
      "16": "streamlined-hiring-motion-graphics-specialists-flichire",
      "17": "maximize-impact-motion-graphics-hiring-strategies-flichire",
      "18": "master-motion-design-hiring-tips-visual-storytellers-flichire",
      "19": "hire-top-motion-graphics-artists-flichire",
      "20": "unlock-storytelling-motion-design-hire-flichire",
      "21": "effective-hiring-motion-graphics-designer-flichire",
      "22": "transform-brand-hire-expert-3d-modellers-flichire",
      "23": "unlock-power-of-motion-graphics-hiring-flichire",
      "24": "guide-to-hiring-top-motion-graphics-talent-flichire",
      "25": "unlock-best-video-editing-talent-hire-perfect-match-flichire",
      "26": "ultimate-creative-marketplace-hire-expert-video-editors-flichire",
      "27": "transform-projects-hire-expert-video-editors-flichire",
      "28": "maximize-content-impact-hire-top-video-editors-flichire",
      "29": "guide-to-excellence-in-video-editing-flichire",
      "30": "unlock-power-video-editing-talent",
      "31": "unlock-video-editing-potential-flichire",
      "32": "elevate-video-production-discover-top-editing-talent-flichire",
      "33": "hire-top-video-editors-flic-hire-creative-talent",
      "34": "ultimate-video-editor-hiring-platform-flic-hire",
      "35": "unlock-creative-vision-hire-expert-video-editors-flic-hire",
      "36": "top-video-editor-hiring-platform-for-business-flic-hire",
      "37": "best-video-editor-hiring-platform-2025-flichire-vs-upwork-fiverr",
      "41": "ultimate-video-editor-hiring-platform-flichire",
      "42": "unlock-creative-video-editor-hiring-flic-hire",
      "43": "best-video-editor-hiring-platforms-flic-hire-vs-competitors",
      "44": "discover-best-video-editor-hiring-platforms-flic-hire",
      "46": "premier-video-editor-hiring-platform-flic-hire",
      "47": "leading-video-editor-hiring-platforms-comparison-flic-hire",
      "48": "top-video-editor-hiring-platforms-2025-flic-hire-standout",
      "50": "discover-best-video-editor-hiring-platforms-flic-hire-leads",
      "51": "flic-hire-vs-competitors-best-video-editor-hiring-platforms",
      "52": "best-video-editor-hiring-platform-flic-hire",
      "53": "best-video-editor-hiring-platforms-comparison-flic-hire-standout",
      "54": "top-video-editor-hiring-platforms-comparison-flic-hire",
      "55": "discover-best-video-editor-hiring-platforms-flic-hire-unpacked",
      "56": "leading-video-editor-hiring-platforms-flic-hire-leads",
      "57": "flic-hire-vs-competition-best-video-editor-hiring-platforms",
      "58": "top-video-editor-hiring-platforms-leading-flic-hire",
      "60": "top-video-editor-hiring-platforms-2025-flic-hire",
      "61": "unlock-video-editor-hiring-opportunities-flic-hire",
      "62": "top-video-editor-hiring-platforms-flic-hire-standout",
      "63": "ultimate-guide-to-video-editor-hiring-and-job-opportunities-flic-hire",
      "64": "ultimate-guide-to-video-editor-hiring-flic-hire-best-choice",
      "65": "top-video-editor-hiring-platforms-excellence-flichire",
      "66": "best-platforms-to-hire-video-editors-flichire-standout",
      "67": "ultimate-guide-to-hiring-video-editors-flichire",
      "68": "best-video-editor-hiring-platform-flic-hire-vs-competitors",
      "69": "best-platform-hire-video-editor-flic-hire-in-2025",
      "70": "best-platforms-hire-video-editors-get-hired-in-2025",
      "71": "best-platforms-hire-video-editors-get-hired-in-2025",
      "72": "swipe-based-video-editor-hiring-platform-for-video-editors",
      "73": "swipe-based-video-editor-hiring-platform-for-video-editors-2025",
    };
    return slugMap[numberSlug] || null;
  }

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);

      // Check if this is a numbered slug and needs redirection
      if (!isNaN(Number(resolvedParams.slug))) {
        const textSlug = getTextSlugFromNumber(resolvedParams.slug);
        if (textSlug) {
          // Add a check to prevent redirect loops
          if (window.location.pathname !== `/blog/${textSlug}`) {
            // This will perform the 301 redirect on the client side
            window.location.replace(`/blog/${textSlug}`);
          }
        }
      }
    }

    resolveParams();
  }, [params]);

  useEffect(() => {
    async function loadBlogData() {
      try {
        setLoading(true);
        const response = await fetchBlogDetail(slug);
        setBlogData(response.data);
        setBacklinksData(response.backlinks || []);
        // console.log("Fetched Backlinks (Prod Check):", response.backlinks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError(true);
        setLoading(false);
      }
    }

    if (slug) {
      loadBlogData();
    }
  }, [slug]);

  // console.log("Current backlinksData State (Prod Check):", backlinksData);

  const toggleFaq = (section: string, index: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`],
    }));
  };

  const nextTestimonial = () => {
    if (blogData?.user_engagement?.testimonials) {
      setTestimonialIndex((prevIndex) =>
        prevIndex === blogData.user_engagement.testimonials.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };

  const prevTestimonial = () => {
    if (blogData?.user_engagement?.testimonials) {
      setTestimonialIndex((prevIndex) =>
        prevIndex === 0
          ? blogData.user_engagement.testimonials.length - 1
          : prevIndex - 1
      );
    }
  };

  // Loading state
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

  // Error state
  if (error || !blogData) {
    return notFound();
  }

  const { content } = blogData;

  return (
    <>
      <div className="min-h-screen bg-black">
        <AnimatedNav bgColor="bg-black/70" variant="blog" />
        <main className="pt-32 pb-16 px-4 md:px-6">
          <article className="max-w-4xl mx-auto text-white">
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8"
            >
              <LazyLoadImage
                src={content.featured_image.url || ""}
                alt={content.featured_image.alt}
                className="object-cover"
                effect="blur"
              />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.h1_title}
            </h1>

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-zinc-300">
                {content.introduction.text}
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {content.introduction.target_keywords.map(
                  (keyword: string, index: number) => (
                    <span
                      key={index}
                      className="text-sm bg-white/10 px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {content.main_sections.map((section: Section, index: number) => (
                <section key={index}>
                  <h2 className="text-2xl font-bold mb-4">{section.h2}</h2>
                  {/* Use a wrapper div for prose styling */}
                  <div className="prose prose-invert text-zinc-300 mb-6 max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                  <div className="space-y-6 pl-4">
                    {section.subsections.map((sub, idx) => (
                      <div key={idx}>
                        <h2 className="text-xl font-semibold mb-2">{sub.h3}</h2>
                        {/* Use a wrapper div for prose styling */}
                        <div className="prose prose-invert text-zinc-400 max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {sub.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Customer Reviews */}
            <div className="mt-16 flex md:flex-row flex-col md:justify-between gap-10 md:gap-16">
              <div className="md:w-1/3 w-full">
                <h2 className="text-5xl font-normal">From Our</h2>
                <h2 className="text-5xl font-bold">Customers.</h2>
                <p className="text-base mt-5">
                  Here's what other subscribers had to say about Production
                  Online.
                </p>
                {/* testimonial buttons */}
                <div className="flex gap-6 mt-5">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={prevTestimonial}
                    className="w-14 h-14 border border-white/80 rounded-full flex justify-center items-center hover:bg-white/10 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <Icon
                      icon="fluent:ios-arrow-24-filled"
                      className="text-2xl"
                    />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={nextTestimonial}
                    className="w-14 h-14 border border-white/80 rounded-full flex justify-center items-center hover:bg-white/10 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <Icon
                      icon="fluent:ios-arrow-24-filled"
                      className="text-2xl rotate-180"
                    />
                  </motion.button>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-lg"
                >
                  <p className="text-white/90 italic mb-3">
                    "
                    {
                      blogData.user_engagement.testimonials[testimonialIndex]
                        .text
                    }
                    "
                  </p>
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-white">
                        {
                          blogData.user_engagement.testimonials[
                            testimonialIndex
                          ].author
                        }
                      </div>
                      <div className="text-xs text-white/70">
                        {
                          blogData.user_engagement.testimonials[
                            testimonialIndex
                          ].role
                        }
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-8">FAQ</h2>

              {/* Employer FAQs */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">For Employers</h2>
                <div className="border-t border-white/20">
                  {content.faq_section.for_employers.map(
                    (faq: FAQ, index: number) => (
                      <div key={index} className="border-b border-white/20 p-4">
                        <h2
                          className="text-lg font-medium mb-2 justify-between flex items-center cursor-pointer"
                          onClick={() => toggleFaq("employer", index)}
                        >
                          {faq.question}
                          <motion.div
                            initial={false}
                            animate={{
                              rotate: expandedFaqs[`employer-${index}`]
                                ? 180
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon
                              icon={
                                expandedFaqs[`employer-${index}`]
                                  ? "mdi:minus"
                                  : "si:add-duotone"
                              }
                              className="w-6 h-6"
                            />
                          </motion.div>
                        </h2>
                        <AnimatePresence>
                          {expandedFaqs[`employer-${index}`] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden" }}
                            >
                              <p className="text-zinc-400">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Professional FAQs */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  For Professionals
                </h2>
                <div className="border-t border-white/20">
                  {content.faq_section.for_professionals.map(
                    (faq: FAQ, index: number) => (
                      <div key={index} className="border-b border-white/20 p-4">
                        <h2
                          className="text-lg font-medium mb-2 justify-between flex items-center cursor-pointer"
                          onClick={() => toggleFaq("professional", index)}
                        >
                          {faq.question}
                          <motion.div
                            initial={false}
                            animate={{
                              rotate: expandedFaqs[`professional-${index}`]
                                ? 180
                                : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon
                              icon={
                                expandedFaqs[`professional-${index}`]
                                  ? "mdi:minus"
                                  : "si:add-duotone"
                              }
                              className="w-6 h-6"
                            />
                          </motion.div>
                        </h2>
                        <AnimatePresence>
                          {expandedFaqs[`professional-${index}`] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden" }}
                            >
                              <p className="text-zinc-400">{faq.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {backlinksData && backlinksData.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8">More Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {backlinksData.map((link: Backlink, index: number) => (
                    <a
                      key={index}
                      href={`/blog/${link.slug}`}
                      className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:bg-white/15 transition-colors"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <LazyLoadImage
                          src={link.image_url}
                          alt={link.image_alt}
                          className="object-cover w-full h-full"
                          effect="blur"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-white/90 mb-2 line-clamp-2">
                          {link.h1_title}
                        </h3>
                        <div className="text-xs text-white/60">
                          {new Date(link.created_date).toLocaleDateString()}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>
      </div>

      {/* Schema.org structured data for better SEO */}
      {blogData && (
        <Script id="blog-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blogData.content.h1_title,
            image: blogData.content.featured_image.url,
            datePublished: blogData.metadata.content_updates?.created_date,
            dateModified: blogData.metadata.content_updates?.last_modified,
            author: {
              "@type": "Organization",
              name: "Flichire",
            },
          })}
        </Script>
      )}
    </>
  );
}
