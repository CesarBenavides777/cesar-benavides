"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookText, Github, Check, House } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import ThemeToggler from "@/components/theme/toggler";

// Reusable PricingCard Component
function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      className={`p-6 rounded-xl border ${
        highlighted ? "border-primary" : "border-border"
      } bg-card text-card-foreground relative flex flex-col`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="text-4xl font-bold mb-4">{price}</div>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="w-5 h-5 mr-2 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full" asChild>
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </motion.div>
  );
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Free Forever",
      price: isYearly ? "$0/year" : "$0/month",
      description: "Perfect for small projects and individual developers.",
      features: [
        "Page Content Blocks",
        "Basic Gravity Forms Integration",
        "Instant WordPress preview",
        "TypeScript support",
        "Shadcn UI components",
        "Next.js 15 App Router",
      ],
      buttonText: "Get Started",
      buttonLink: "/docs/getting-started",
    },
    {
      name: "Agency",
      price: isYearly ? "$499/year" : "$49/month",
      description: "Ideal for growing agencies and businesses.",
      features: [
        "All Free features",
        "Table Components",
        "Lazy Loading Components",
        "WooCommerce Integration",
        "Priority support",
        "Agency license",
      ],
      buttonText: "Start Free Trial",
      buttonLink: "/trial/agency",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large-scale applications.",
      features: [
        "All Agency features",
        "Authentication Setup",
        "User Role-Based Edits",
        "Custom Consultation",
        "Dedicated support team",
        "Enterprise license",
      ],
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
  ];

  return (
    <main className="w-full flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center mt-12 md:mt-24 lg:mt-32 gap-8 px-4">
        <Link className="self-start cursor-pointer" href="/">
          <House size={32} />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl tracking-tight font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent py-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <div className="flex items-center space-x-4">
          <span
            className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isYearly ? "bg-foreground" : "bg-muted-foreground"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-bold ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
          >
            Yearly (Save 15%)
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-24 w-full max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 font-medium">Feature</th>
                  <th className="py-4 px-6 font-medium text-center">Free</th>
                  <th className="py-4 px-6 font-medium text-center">Agency</th>
                  <th className="py-4 px-6 font-medium text-center">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Page Content Blocks",
                  "Gravity Forms Integration",
                  "WordPress Preview",
                  "TypeScript Support",
                  "Shadcn UI",
                  "Next.js 15 App Router",
                  "Table Components",
                  "Lazy Loading Components",
                  "WooCommerce Integration",
                  "Authentication Setup",
                  "User Role-Based Edits",
                  "Custom Consultation",
                ].map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-4 px-6">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      {index < 6 ? (
                        <Check className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {index < 9 ? (
                        <Check className="w-5 h-5 mx-auto text-green-500" />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your needs and start building amazing
            websites today.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/docs" className="gap-2">
                <BookText size={20} />
                View Documentation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href={siteConfig.socials.github}
                className="gap-2"
                target="_blank"
              >
                <Github size={20} />
                Get Template
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 mt-24 text-center text-muted-foreground border-t">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            Created by{" "}
            <a
              href={siteConfig.creator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              {siteConfig.creator.name}
            </a>
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
      {/* Theme Toggler */}
      <div className="fixed bottom-4 right-4">
        <ThemeToggler />
      </div>
    </main>
  );
}
