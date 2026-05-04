"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { LottieRefCurrentProps } from "lottie-react";
import footerAnimation from "../../../public/FooterAnimation.json";

// Dynamically import Icon component with ssr disabled
const Icon = dynamic(() => import("@iconify/react").then((mod) => mod.Icon), {
  ssr: false,
});

// Rename this to avoid the conflict
const DynamicLottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function Footer() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<{
    message?: string;
    error?: string;
  }>({});

  const handleMouseEnter = () => {
    if (lottieRef.current && !isPlaying) {
      lottieRef.current.goToAndPlay(0);
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current && !isPlaying) {
      lottieRef.current.pause();
    }
  };

  const handleAnimationEnd = () => {
    if (lottieRef.current) {
      setIsPlaying(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus({});

    const toastId = toast.loading("Subscribing...");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubscribeStatus({ error: data.error || "Subscription failed" });
        return;
      }

      setSubscribeStatus({ message: "Successfully subscribed!" });
      setEmail("");
      toast.success("Successfully subscribed!", { id: toastId });

      // Clear subscription status after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ message: "" });
      }, 5000);
    } catch {
      setSubscribeStatus({ error: "Failed to subscribe. Please try again." });
      toast.error("Failed to subscribe. Please try again.", { id: toastId });
      // Clear error status after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({});
      }, 5000);
    }
  };

  return (
    <footer className="w-full bg-black relative overflow-hidden h-fit flex justify-center md:h-[390px]">
      <div className="w-full max-w-8xl mx-auto mt-12 flex flex-col gap-6 md:gap-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row gap-6 justify-between px-6 mb-6 md:mb-0">
          <div className="flex flex-col gap-4">
            <p className="text-white text-lg font-normal font-outfit">
              Sign up for our newsletter to get exclusive updates,
              <br />
              launch details, and early access to our platform.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="flex flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email here"
                  className="text-white text-sm w-full font-outfit font-normal bg-transparent border border-white placeholder:text-white/60 rounded-xl p-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-white text-base font-normal bg-purple-gradient rounded-xl px-4 font-outfit"
                >
                  Subscribe
                </button>
              </div>
              {subscribeStatus.message && (
                <p className="text-green-400 text-sm">
                  {subscribeStatus.message}
                </p>
              )}
              {subscribeStatus.error && (
                <p className="text-red-400 text-sm">{subscribeStatus.error}</p>
              )}
            </form>
          </div>
          <div className="flex flex-col xs:flex-row gap-20 justify-between md:justify-start">
            <div className="flex flex-col">
              <p className="text-white text-lg font-bold font-pt-sans mb-4">
                About
              </p>
              <div className="flex flex-col gap-6">
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-white transition-all duration-300 font-semibold font-pt-sans"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-white transition-all duration-300 font-semibold font-pt-sans"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-all duration-300 font-semibold font-pt-sans"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-white text-lg font-bold font-pt-sans">
                Follow Us
              </p>
              <div className="flex gap-6">
                <Icon
                  icon="prime:twitter"
                  className="text-white text-2xl cursor-pointer"
                  aria-label="Twitter"
                  onClick={() =>
                    window.open("https://x.com/FlicHire", "_blank")
                  }
                />
                <Icon
                  icon="skill-icons:linkedin"
                  className="text-white text-2xl cursor-pointer"
                  aria-label="LinkedIn"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/flicofficial/",
                      "_blank"
                    )
                  }
                />
                <Icon
                  icon="skill-icons:instagram"
                  className="text-white text-2xl cursor-pointer"
                  aria-label="Instagram"
                  onClick={() =>
                    window.open("https://www.instagram.com/flic_app", "_blank")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full hidden md:block max-w-64 h-36 cursor-default"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Play footer animation"
        >
          <DynamicLottie
            lottieRef={lottieRef}
            animationData={footerAnimation}
            loop={false}
            autoplay={false}
            onComplete={handleAnimationEnd}
            className="w-full h-full object-cover opacity-90"
          />
        </button>
      </div>
    </footer>
  );
}
