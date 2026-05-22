"use client";
// app/privacy-policy/page.tsx
import React from "react";
import { useRouter } from "next/navigation";

const DottedList = ({ items }) => (
  <ul className="mt-2 space-y-2">
    {items.map((item, index) => (
      <li
        key={index}
        className="flex gap-3 text-sm leading-relaxed text-gray-700"
      >
        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        <span>{item.trim().replace(/^\t/, "")}</span>
      </li>
    ))}
  </ul>
);

const Section = ({ title, children }) => (
  <div className="space-y-2">
    <h2 className="font-semibold text-gray-900 text-sm leading-relaxed">
      {title}
    </h2>
    {children}
  </div>
);

export default function PrivacyPolicyPage() {
  const router = useRouter();

  const handleBack = () => {
    if (sessionStorage.getItem("signupReturnStep")) {
      router.push("/sign_up");
    } else {
      router.back();
    }
  };

  const personalInfo = [
    "Account Information: When you register, we collect information such as your name, email address, phone number, and delivery address.",
    "Payment Information: We collect your payment method details (e.g., credit card number). This information is processed and stored by our third-party payment processor; we do not store your full payment card details.",
    "Order Information: We collect the details of your grocery lists, orders, and substitution preferences.",
    "Communications: If you contact us, we may keep a record of that correspondence.",
  ];

  const automaticInfo = [
    "Device Information: We may collect information about your mobile device, including device model, operating system, and IP address.",
    "Location Data: To facilitate delivery, we collect your precise location data when the App is in use. You can disable this in your device settings, but it may limit the functionality of the Service.",
    "Usage Data: We collect information about how you interact with the App, such as features you use, items you view, and the dates and times of your sessions.",
    "Cookies & Trackers: We may use cookies or similar technologies to help us understand user activity and improve the Service.",
  ];

  const useInfo = [
    "To Provide and Manage the Service: To create your account, process your subscription payments, and fulfill your grocery orders.",
    "To Facilitate Delivery: To connect you with Shoppers and provide them with the necessary information (your name, address, order details) to complete your delivery.",
    "To Communicate with You: To send you service-related notifications, such as order confirmations, delivery updates, and updates to our Terms or this Policy.",
    "For Marketing: To send you promotional offers or newsletters (you may opt out of these communications at any time).",
    "To Improve Our Service: To analyze usage trends, perform data analytics, and improve the App's functionality and user experience.",
    "For Safety and Security: To prevent fraud, enforce our Terms, and protect the safety of our users, Shoppers, and the public.",
  ];

  const shareInfo = [
    "With Personal Shoppers: We share the information necessary for a Shopper to fulfill your order, which includes your name, delivery address, phone number, and your grocery list. We do not share your payment information with Shoppers.",
    "With Third-Party Service Providers: We use vendors to perform certain functions on our behalf, such as payment processing, cloud hosting, data analytics, and marketing. These vendors only have access to the information necessary to perform their tasks.",
    "For Legal Reasons: We may disclose your information if required to do so by law or in response to a valid request from a law enforcement or government agency (e.g., a subpoena or court order).",
    "Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.",
    "With Your Consent: We may share your information for other purposes if we have your explicit consent.",
  ];

  const choices = [
    "Account Information: You can review and update your account information at any time by accessing your profile in the App.",
    'Marketing Communications: You can opt out of receiving promotional emails by following the "unsubscribe" link in any marketing email.',
    "Location Data: You can control or disable the collection of location data through your device's settings.",
    "Access and Deletion: Depending on your jurisdiction, you may have the right to request access to, correction of, or deletion of your personal information. Please contact us at the address below to make such a request.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900">
            Privacy Policy
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Intro */}
        <p className="text-sm leading-relaxed text-gray-700 mb-6">
          Bringo Direct ("we," "us," or "our") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you use our mobile application
          (the "App") and all related services (collectively, the "Service").
          Please read this policy carefully. By using the Service, you consent
          to the data practices described in this policy.
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <Section title="1. Information We Collect">
            <p className="text-sm leading-relaxed text-gray-700">
              We may collect several types of information from and about users
              of our Service.
            </p>

            <div className="mt-3 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  A. Personal Information You Provide:
                </p>
                <DottedList items={personalInfo} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  B. Information Collected Automatically:
                </p>
                <DottedList items={automaticInfo} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  C. Information from Shoppers:
                </p>
                <p className="text-sm leading-relaxed text-gray-700 mt-1">
                  We also collect information from our independent Shoppers,
                  such as their name, contact information, location data (when
                  using the Shopper app), and background check information
                  (processed by a third-party vendor).
                </p>
              </div>
            </div>
          </Section>

          {/* Section 2 */}
          <Section title="2. How We Use Your Information">
            <p className="text-sm leading-relaxed text-gray-700">
              We use the information we collect for various purposes, including:
            </p>
            <DottedList items={useInfo} />
          </Section>

          {/* Section 3 */}
          <Section title="3. How We Share Your Information">
            <p className="text-sm leading-relaxed text-gray-700">
              We do not sell your personal information. We may share your
              information in the following circumstances:
            </p>
            <DottedList items={shareInfo} />
          </Section>

          {/* Section 4 */}
          <Section title="4. Data Security">
            <p className="text-sm leading-relaxed text-gray-700">
              We implement reasonable administrative, technical, and physical
              security measures to protect your information from unauthorized
              access, use, or disclosure. However, no electronic transmission or
              storage is 100% secure, and we cannot guarantee its absolute
              security.
            </p>
          </Section>

          {/* Section 5 */}
          <Section title="5. Data Retention">
            <p className="text-sm leading-relaxed text-gray-700">
              We will retain your personal information for as long as your
              account is active or as needed to provide you with the Service,
              comply with our legal obligations, resolve disputes, and enforce
              our agreements.
            </p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Your Choices and Rights">
            <DottedList items={choices} />
          </Section>

          {/* Section 7 */}
          <Section title="7. Children's Privacy">
            <p className="text-sm leading-relaxed text-gray-700">
              The Service is not intended for or directed at children under the
              age of 18. We do not knowingly collect personal information from
              children under 18. If we learn we have collected such information,
              we will take steps to delete it.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Changes to This Privacy Policy">
            <p className="text-sm leading-relaxed text-gray-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy in
              the App or by sending you an email. Your continued use of the
              Service after such notice constitutes your acceptance of the
              updated policy.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Contact Us">
            <p className="text-sm leading-relaxed text-gray-700">
              If you have any questions about this Privacy Policy, please
              contact us at:{" "}
              <a
                href="mailto:legal@bringofresh.net"
                className="text-emerald-600 hover:underline font-medium"
              >
                legal@bringofresh.net
              </a>
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}
