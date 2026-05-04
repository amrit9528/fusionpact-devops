"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({
  children,
  className = "space-y-4",
  delay = 0,
}: AnimatedSectionProps) => (
  <motion.section
    initial="initial"
    animate="animate"
    variants={{
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    }}
    transition={{ duration: 0.3, ease: "easeInOut", delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function PrivacyContent() {
  return (
    <main className="pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto bg-white/5 rounded-2xl p-6 md:p-10 space-y-8 shadow-2xl">
        <motion.h1
          {...fadeIn}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Privacy Policy
        </motion.h1>

        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <AnimatedSection delay={0.1}>
            <p>Effective Date: 1 January 2025</p>
            <p>
              Flic, operated by Persist Ventures, provides the Flic app and
              website. This Privacy Policy outlines our policies regarding the
              collection, use, and disclosure of personal information when you
              use our Service and the choices you have associated with that
              information.
            </p>
            <p>
              By using the Service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </AnimatedSection>

          {/* Information Collection */}
          <AnimatedSection delay={0.2} className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-white mb-3">
                  1. Personal Information
                </h3>
                <p className="mb-2">
                  When you register or interact with our Service, we may
                  collect:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name</li>
                  <li>Email Address</li>
                  <li>Profile Picture (if uploaded)</li>
                  <li>
                    User-Generated Content: Uploaded videos, titles, tags, and
                    other information you add to your profile
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-3">
                  2. Usage Data
                </h3>
                <p className="mb-2">
                  We may collect information automatically when you access the
                  Service, including:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>IP Address</li>
                  <li>Browser Type and Version</li>
                  <li>
                    Device Information (e.g., device type, operating system,
                    unique device IDs)
                  </li>
                  <li>
                    App Usage Data (e.g., features used, crash reports, log
                    files, browsing and swiping history)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-3">
                  3. Cookies
                </h3>
                <p>
                  We use cookies and similar tracking technologies to monitor
                  activity on the Service and store certain information. You can
                  instruct your browser to refuse cookies or indicate when a
                  cookie is being sent.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* How We Use Information */}
          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide, personalize, and maintain the Service</li>
              <li>To analyze usage patterns and improve the Service</li>
              <li>
                To send service-related notifications, updates, and promotional
                content
              </li>
              <li>
                To detect and prevent fraud, unauthorized activities, or
                breaches of our Terms of Service
              </li>
              <li>
                To enhance user experience through tailored content
                recommendations
              </li>
            </ul>
          </AnimatedSection>

          {/* Data Sharing */}
          <AnimatedSection delay={0.4}>
            <h2 className="text-2xl font-semibold text-white">
              Sharing and Disclosure of Information
            </h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Service Providers:</span> We may
                employ third-party companies and individuals to facilitate our
                Service who may access personal data on our behalf
              </li>
              <li>
                <span className="font-medium">Legal Requirements:</span> We may
                disclose your information if required to do so by law or to
                protect rights, property, or safety
              </li>
              <li>
                <span className="font-medium">Business Transfers:</span> In the
                event of a merger, acquisition, or asset sale, your personal
                data may be transferred
              </li>
            </ul>
          </AnimatedSection>

          {/* Security */}
          <AnimatedSection delay={0.5}>
            <h2 className="text-2xl font-semibold text-white">
              Security of Your Data
            </h2>
            <p>
              We prioritize the security of your personal data and use
              industry-standard measures to protect it. However, no method of
              transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </AnimatedSection>

          {/* Rights and Choices */}
          <AnimatedSection delay={0.6}>
            <h2 className="text-2xl font-semibold text-white">
              Your Rights and Choices
            </h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of any inaccuracies</li>
              <li>Deletion of your personal data</li>
              <li>Opt-out from marketing communications</li>
            </ul>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection delay={0.7}>
            <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-primary font-medium">contact@flichire.com</p>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
