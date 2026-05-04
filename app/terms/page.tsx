import AnimatedNav from "../components/navigation/AnimatedNav";

export default function TermsAndConditions() {
  return (
    <div className="bg-black">
      {/* Navigation */}
      <AnimatedNav bgColor="bg-black/70" variant="default" />

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto rounded-2xl bg-white/5 text-white p-6 md:p-10 shadow-2xl">
          <h1 className="mb-8 text-2xl md:text-3xl font-bold">
            Terms and Conditions
          </h1>

          <div className="mb-8">
            <p className="text-sm opacity-80 md:text-base">
              Effective Date: 1 January 2025
            </p>
          </div>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">1. Acceptance of Terms</h2>
            <p className="text-sm opacity-80 md:text-base">
              By accessing or using Flic (the &ldquo;Service&rdquo;), you agree
              to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;).
              If you disagree with any part of these Terms, you may not access
              the Service.
            </p>
          </section>

          {/* User Accounts */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">2. User Accounts</h2>
            <p className="mb-3 text-sm opacity-80 md:text-base">
              Eligibility: You must be at least 13 years old to use this
              Service.
            </p>
            <p className="mb-3 text-sm opacity-80 md:text-base">
              Account Responsibility: You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
            <p className="text-sm opacity-80 md:text-base">
              Accurate Information: You agree to provide accurate and complete
              information when creating an account.
            </p>
          </section>

          {/* User Content */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">3. User Content</h2>
            <ul className="list-inside list-disc pl-5">
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Ownership: You retain ownership of content you create using our
                Service.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                License to Flic: By using the Service, you grant Flic a
                worldwide, non-exclusive, royalty-free license to use, modify,
                and distribute your content solely for the operation and
                promotion of the Service.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Responsibility: You are responsible for ensuring that your
                content does not violate any third-party rights, including
                intellectual property rights.
              </li>
              <li className="text-sm opacity-80 md:text-base">
                Content Removal: We reserve the right to remove any content that
                violates these Terms or is deemed inappropriate.
              </li>
            </ul>
          </section>

          {/* Data Policy */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">4. Data Policy</h2>
            <ul className="list-inside list-disc pl-5">
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Data Collection: We collect and process data as outlined in our
                Privacy Policy.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Data Deletion: You may request deletion of your account and
                associated data by contacting support.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Processing Time: Data deletion requests are typically processed
                within 30 minutes.
              </li>
              <li className="text-sm opacity-80 md:text-base">
                Retention: Some data may be retained for legal or operational
                purposes.
              </li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">5. Acceptable Use</h2>
            <p className="mb-3 text-sm opacity-80 md:text-base">
              You agree not to:
            </p>
            <ul className="list-inside list-disc pl-5">
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Use the Service for any illegal purposes.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Create or upload content that infringes on intellectual property
                rights.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Attempt to gain unauthorized access to the Service.
              </li>
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Use the Service to distribute malware or harmful code.
              </li>
              <li className="text-sm opacity-80 md:text-base">
                Engage in activities that disrupt the Service or other users
                experiences.
              </li>
            </ul>
          </section>

          {/* Service Modifications */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">
              6. Service Modifications
            </h2>
            <p className="mb-3 text-sm opacity-80 md:text-base">
              We reserve the right to:
            </p>
            <ul className="list-inside list-disc pl-5">
              <li className="mb-2 text-sm opacity-80 md:text-base">
                Modify or discontinue any part of the Service without prior
                notice.
              </li>
              <li className="text-sm opacity-80 md:text-base">
                Update these Terms with notification to users.
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">
              7. Intellectual Property
            </h2>
            <p className="mb-3 text-sm opacity-80 md:text-base">
              Ownership: The Service and its original content, features, and
              functionality are and will remain the exclusive property of Flic
              and its licensors.
            </p>
            <p className="text-sm opacity-80 md:text-base">
              Trademarks: The Flic name, logo, and branding are trademarks of
              Flic. You may not use our trademarks without prior written
              consent.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">
              8. Limitation of Liability
            </h2>
            <p className="text-sm opacity-80 md:text-base">
              Flic shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or
              inability to use the Service.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">9. Governing Law</h2>
            <p className="text-sm opacity-80 md:text-base">
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to its conflict of
              law provisions.
            </p>
          </section>

          {/* Additional Terms for Apple Users */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">
              10. Additional Terms for Apple Users
            </h2>
            <p className="mb-4 text-sm opacity-80 md:text-base">
              If you download our application from the Apple App Store, the
              following additional terms apply:
            </p>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">a. License Scope</h3>
              <p className="text-sm opacity-80 md:text-base">
                The app is licensed, not sold, to you by Apple. Your license is
                non-transferable and allows use on Apple-branded products that
                you own or control, subject to Apple&apos;s Usage Rules. You may
                not distribute, transfer, or sublicense the app.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">
                b. Data Collection and Usage
              </h3>
              <p className="text-sm opacity-80 md:text-base">
                We may collect technical data and related information (including
                technical information about your device, system, application
                software, and peripherals) to facilitate updates, support, and
                other services. This information will be used in a form that
                does not personally identify you.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">c. Termination</h3>
              <p className="text-sm opacity-80 md:text-base">
                This license is effective until terminated by you or the
                Licensor. Your rights will terminate automatically if you fail
                to comply with these Terms.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">d. External Services</h3>
              <p className="text-sm opacity-80 md:text-base">
                The app may provide access to external services. Use of these
                services is at your sole risk. We are not responsible for
                third-party services or content.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">
                e. Warranty Disclaimer
              </h3>
              <p className="text-sm opacity-80 md:text-base">
                The app is provided &ldquo;AS IS&rdquo; and &ldquo;AS
                AVAILABLE&rdquo; without warranty of any kind. We disclaim all
                warranties, whether express, implied, or statutory, including
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">
                f. Limitation of Liability
              </h3>
              <p className="text-sm opacity-80 md:text-base">
                We shall not be liable for personal injury or any incidental,
                special, indirect, or consequential damages. Total liability for
                all damages shall not exceed fifty dollars ($50.00). Some
                jurisdictions may not allow these limitations.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">
                g. Export Restrictions
              </h3>
              <p className="text-sm opacity-80 md:text-base">
                You may not export or re-export the app except as authorized by
                United States law and the jurisdiction where the app was
                obtained.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">h. Commercial Items</h3>
              <p className="text-sm opacity-80 md:text-base">
                The app and documentation are &ldquo;Commercial Items&rdquo; as
                defined at 48 C.F.R. §2.101, licensed to U.S. Government end
                users only as Commercial Items with only those rights granted to
                all other end users.
              </p>
            </div>

            <div className="ml-5 mb-4">
              <h3 className="mb-2 text-lg md:text-xl">i. Governing Law</h3>
              <p className="mb-2 text-sm opacity-80 md:text-base">
                For U.S. users: This agreement is governed by California law,
                with exclusive jurisdiction in Santa Clara County, California.
              </p>
              <p className="mb-2 text-sm opacity-80 md:text-base">
                For EU, Switzerland, Norway, or Iceland citizens: The governing
                law and forum shall be the laws and courts of your usual place
                of residence.
              </p>
              <p className="text-sm opacity-80 md:text-base">
                The UN Convention on the International Sale of Goods is
                specifically excluded.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl md:text-2xl">Contact Us</h2>
            <p className="mb-2 text-sm opacity-80 md:text-base">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-sm opacity-80 md:text-base">
              Email: contact@flichire.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
