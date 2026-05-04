"use client";

import { useState } from "react";
import AnimatedNav from "../components/navigation/AnimatedNav";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!", {
        id: loadingToast,
        duration: 5000,
      });

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });

      // Clear the status after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast,
        duration: 5000,
      });
      setSubmitStatus({
        type: "error",
        message: "There was an error sending your message. Please try again.",
      });

      // Clear error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-black">
      {/* Navigation */}
      <AnimatedNav bgColor="bg-black/70" variant="default" />

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto bg-white/5 rounded-2xl p-6 md:p-10 space-y-8 shadow-2xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Section */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="text-4xl font-bold text-white sm:text-5xl"
              >
                Get in Touch
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="mt-6 text-lg text-zinc-300"
              >
                We&apos;re excited to hear from our Flic community! Whether you
                have feedback, a collaboration idea, or just want to say hello,
                we&apos;re all ears.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="mt-12"
              >
                <h2 className="text-xl font-semibold text-white">Email</h2>
                <a
                  href="mailto:contact@flichire.com"
                  className="mt-2 flex items-center text-zinc-300 hover:text-purple-400"
                >
                  contact@flichire.com
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="mt-12"
              >
                <h2 className="text-xl font-semibold text-white">
                  Connect With Us
                </h2>
                <div className="mt-4 flex flex-wrap gap-6">
                  {/* Social Icons */}
                  <SocialLink
                    href="https://x.com/Flic_Official_"
                    icon={<TwitterIcon />}
                    label="Twitter"
                  />
                  <SocialLink
                    href="https://www.instagram.com/flic_app"
                    icon={<InstagramIcon />}
                    label="Instagram"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/company/flicofficial"
                    icon={<LinkedInIcon />}
                    label="LinkedIn"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Section - Contact Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:p-8 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-purple-500">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-white/10 px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-800 bg-white/10 px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl border border-zinc-800 bg-white/10 px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-purple-700 py-3 text-lg font-medium text-white transition-all hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Send Message
                </button>
                {submitStatus.message && (
                  <div
                    className={`rounded-lg border p-4 text-center ${
                      submitStatus.type === "success"
                        ? "border-green-800 bg-green-900/20 text-green-400"
                        : "border-red-800 bg-red-900/20 text-red-400"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Social Link Component
const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-zinc-300 transition-colors hover:text-purple-400"
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

// Icon Components
const TwitterIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);
