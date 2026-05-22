"use client";
// app/terms-and-conditions/page.jsx
import { useRouter } from "next/navigation";

const OrderedList = ({ items }) => (
  <ol className="mt-2 space-y-2 pl-1">
    {items.map((item, index) => (
      <li
        key={index}
        className="flex gap-3 text-sm leading-relaxed text-gray-700"
      >
        <span className="font-bold shrink-0">{index + 1}.</span>
        <span>{item.trim().replace(/^\t/, "")}</span>
      </li>
    ))}
  </ol>
);

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

export default function TermsAndConditionsPage() {
  const router = useRouter();

  const handleBack = () => {
    if (sessionStorage.getItem("signupReturnStep")) {
      router.push("/sign_up");
    } else {
      router.back();
    }
  };

  const BringoDirectService = [
    "Does not own or operate any grocery stores or retailers.",
    "Does not sell or own the grocery items themselves.",
    "Shoppers are independent contractors, not employees or agents of Bringo Direct.",
    "A contract for the purchase of goods is formed between you and the Shopper, or between you and the retailer (facilitated by the Shopper).",
  ];

  const UserAccounts = [
    "Eligibility: To use the Service, you must be at least 18 years of age and capable of entering into a binding contract.",
    'Registration: You must create an account ("Account") to use the Service, providing accurate and complete information, including a valid payment method.',
    "Account Security: You are solely responsible for maintaining the confidentiality of your Account, password, and for all activities that occur under your Account. You must notify us immediately of any unauthorized use of your Account.",
  ];

  const SubscriptionBilling = [
    'Subscription Plans: We offer various subscription plans (e.g., monthly, annually). Your plan details, including the fee ("Subscription Fee") and billing cycle, will be disclosed to you when you sign up.',
    "Recurring Billing: By starting your subscription, you authorize us to charge you a recurring Subscription Fee at the then-current rate to your designated payment method.",
    "Billing Cycle: Your Subscription Fee will be billed at the beginning of your billing cycle and will auto-renew unless you cancel.",
    "Price Changes: We reserve the right to change our subscription plans or adjust pricing at our discretion. Any changes will be communicated to you in advance, and you will have the opportunity to cancel before such changes take effect.",
    "Payment Methods: You must provide a valid payment method. If your payment method fails, we may suspend your access to the Service.",
    "Cancellations: You may cancel your subscription at any time. Your cancellation will take effect at the end of your current billing cycle, and you will retain access to the Service until that date.",
    "No Refunds: Subscription Fees are non-refundable. We are not obligated to provide refunds or credits for partially used periods.",
  ];

  const OrderSubstitutions = [
    "Product Availability: We do not guarantee the availability of any item. Products in-store may be out of stock.",
    "Substitutions: You may be given the option to allow for substitutions. By enabling this feature, you authorize your Shopper to make reasonable substitutions (e.g., a different brand of a similar product) if an item is unavailable. You will be charged for the price of the substituted item.",
    "Delivery: Your Shopper will deliver your order to the address you provide. You are responsible for being available to receive the delivery during the designated timeframe. Risk of loss for purchased items passes to you upon delivery.",
    "Order Issues: If you have an issue with your order (e.g., wrong items, damaged goods), you must report it to us within 24 hours of delivery.",
  ];

  const UserConduct = [
    "Use the Service for any illegal purpose or in violation of any local, state, national, or international law.",
    "Harass, threaten, or otherwise harm any Shopper or Bringo Direct employee.",
    "Use the Service for any fraudulent purpose, including placing orders with an invalid payment method.",
    "Reverse engineer, decompile, or otherwise attempt to discover the source code of the App.",
    "Interfere with the proper functioning of the Service.",
  ];

  const Disclaimer = [
    "THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.",
    "THE QUALITY OF ANY PRODUCTS, SERVICES, OR INFORMATION PURCHASED OR OBTAINED BY YOU WILL MEET YOUR EXPECTATIONS.",
    "THE ACTIONS OR INACTIONS OF ANY SHOPPER WILL BE SATISFACTORY.",
  ];

  const LiabilityItems = [
    "YOUR USE OF, OR INABILITY TO USE, THE SERVICE.",
    "THE CONDUCT OR CONTENT OF ANY THIRD PARTY, INCLUDING ANY SHOPPER.",
    "UNAUTHORIZED ACCESS TO OR USE OF YOUR ACCOUNT.",
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
            Terms &amp; Conditions
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Intro */}
        <p className="text-sm leading-relaxed text-gray-700 mb-6">
          Welcome to Bringo Direct! We are a subscription service that connects
          our valued subscribers ("you") with independent personal shoppers
          ("Shoppers") to facilitate online grocery ordering and delivery. These
          Terms &amp; Conditions ("Terms") govern your access to and use of the
          Bringo Direct mobile application (the "App") and any related services
          (collectively, the "Service").{" "}
          <span className="font-semibold">
            PLEASE READ THESE TERMS CAREFULLY.
          </span>{" "}
          By creating an account, accessing, or using the Service, you agree to
          be bound by these Terms and our Privacy Policy. If you do not agree to
          these Terms, you may not use the Service.
        </p>

        <div className="space-y-6">
          {/* Section 1 */}
          <Section title="1. The Bringo Direct Service">
            <p className="text-sm leading-relaxed text-gray-700">
              Bringo Direct is a platform that connects subscribers with
              Shoppers. You create and manage your grocery lists and
              subscription, and we connect you with Shoppers who will purchase
              the items on your behalf from local retailers and deliver them to
              you. You acknowledge and agree that Bringo Direct:
            </p>
            <DottedList items={BringoDirectService} />
          </Section>

          {/* Section 2 */}
          <Section title="2. User Accounts">
            <DottedList items={UserAccounts} />
          </Section>

          {/* Section 3 */}
          <Section title="3. Subscriptions & Billing">
            <DottedList items={SubscriptionBilling} />
          </Section>

          {/* Section 4 */}
          <Section title="4. Orders, Substitutions, and Delivery">
            <DottedList items={OrderSubstitutions} />
          </Section>

          {/* Section 5 */}
          <Section title="5. Shopper Interactions">
            <p className="text-sm leading-relaxed text-gray-700">
              You agree to treat Shoppers with respect and courtesy. Shoppers
              are independent contractors who set their own schedules and
              methods. Bringo Direct is not responsible for the acts or
              omissions of any Shopper. We provide a platform for connection and
              facilitate payment, but we do not direct or control the Shopper's
              performance of services.
            </p>
          </Section>

          {/* Section 6 */}
          <Section title="6. User Conduct">
            <p className="text-sm leading-relaxed text-gray-700">
              You agree not to, and will not assist, encourage, or enable others
              to:
            </p>
            <DottedList items={UserConduct} />
          </Section>

          {/* Section 7 */}
          <Section title="7. Intellectual Property">
            <p className="text-sm leading-relaxed text-gray-700">
              The Service, including the App, its software, design, text, logos,
              and all other content, is the exclusive property of Bringo Direct
              and its licensors, protected by copyright, trademark, and other
              intellectual property laws.
            </p>
          </Section>

          {/* Section 8 */}
          <Section title="8. Disclaimers">
            <p className="text-sm leading-relaxed text-gray-700">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. BRINGO DIRECT
              DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON-INFRINGEMENT.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 mt-2">
              BRINGO DIRECT DOES NOT WARRANT THAT:
            </p>
            <DottedList items={Disclaimer} />
          </Section>

          {/* Section 9 */}
          <Section title="9. Limitation of Liability">
            <p className="text-sm leading-relaxed text-gray-700">
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL BRINGO
              DIRECT, ITS OFFICERS, DIRECTORS, OR EMPLOYEES, BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
              INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <DottedList items={LiabilityItems} />
            <p className="text-sm leading-relaxed text-gray-700 mt-2">
              OUR TOTAL LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING FROM
              YOUR USE OF THE SERVICE IS LIMITED TO THE AMOUNT OF SUBSCRIPTION
              FEES YOU PAID TO US IN THE 6 MONTHS PRECEDING THE CLAIM.
            </p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Indemnification">
            <p className="text-sm leading-relaxed text-gray-700">
              You agree to defend, indemnify, and hold harmless Bringo Direct
              and its affiliates, officers, and employees from and against any
              and all claims, damages, losses, liabilities, and expenses
              (including attorneys' fees) arising from: (a) your use of the
              Service; (b) your violation of these Terms; or (c) your violation
              of any third-party right, including the rights of any Shopper.
            </p>
          </Section>

          {/* Section 11 */}
          <Section title="11. Termination">
            <p className="text-sm leading-relaxed text-gray-700">
              We may, in our sole discretion, suspend or terminate your Account
              and access to the Service at any time, with or without notice, for
              any reason, including for violation of these Terms.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Changes to Terms">
            <p className="text-sm leading-relaxed text-gray-700">
              We reserve the right to modify these Terms at any time. We will
              notify you of any material changes by posting the new Terms in the
              App or by email. Your continued use of the Service after such
              notice constitutes your acceptance of the new Terms.
            </p>
          </Section>

          {/* Section 13 */}
          <Section title="13. Governing Law">
            <p className="text-sm leading-relaxed text-gray-700">
              These Terms shall be governed by and construed in accordance with
              the laws of Uganda, Kenya, and Nigeria without regard to its
              conflict of law principles.
            </p>
          </Section>

          {/* Section 14 */}
          <Section title="14. Contact Us">
            <p className="text-sm leading-relaxed text-gray-700">
              If you have any questions about these Terms, please contact us at:{" "}
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
