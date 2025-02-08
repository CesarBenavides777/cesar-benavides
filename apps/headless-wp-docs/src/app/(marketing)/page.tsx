import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookText, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

// Reusable FeatureCard Component
function FeatureCard({
  title,
  description,
  tier,
}: {
  title: string;
  description: string;
  tier?: "Plus" | "Pro";
}) {
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground relative">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {tier && (
        <div
          className={`absolute -top-2 -right-2 rounded-full text-background flex items-center justify-center px-2 text-xs font-sans ${
            tier === "Plus" ? "bg-foreground" : "bg-accent"
          }`}
        >
          {tier}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const tiers = [
    {
      name: "Free Forever",
      features: [
        {
          title: "ACF Flexible Content Blocks",
          description: "Build reusable, dynamic layouts for your content.",
        },
        {
          title: "Gravity Forms Integration (Basic)",
          description: "Easily connect with Gravity Forms.",
        },
        {
          title: "Preview",
          description: "Instant WordPress preview for seamless editing.",
        },
        {
          title: "Typesafe/TypeScript",
          description: "Full TypeScript support for safer development.",
        },
        {
          title: "Shadcn UI",
          description:
            "Customizable, prebuilt components for rapid prototyping.",
        },
        {
          title: "Next.js 15 App Router",
          description: "Latest Next.js features for improved performance.",
        },
      ],
    },
    {
      name: "Agency",
      features: [
        {
          title: "Table Components",
          description: "Customizable tables for managing data.",
          tier: "Plus",
        },
        {
          title: "Lazy Loading Components",
          description: "Optimize performance with lazy-loaded elements.",
          tier: "Plus",
        },
        {
          title: "WooCommerce Integration",
          description: "Seamlessly integrate with WooCommerce.",
          tier: "Plus",
        },
      ],
    },
    {
      name: "Enterprise",
      features: [
        {
          title: "Authentication Setup",
          description: "Streamlined authentication for your platform.",
          tier: "Pro",
        },
        {
          title: "User Role-Based Edits",
          description: "Granular editing permissions for team workflows.",
          tier: "Pro",
        },
        {
          title: "Customization",
          description: "Tailored features to fit your unique needs.",
          tier: "Pro",
        },
        {
          title: "Custom Consultation",
          description: "One-on-one setup assistance for your business.",
          tier: "Pro",
        },
      ],
    },
  ];

  return (
    <main className="w-full flex flex-col min-h-screen max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center mt-12 md:mt-24 lg:mt-32 gap-8 px-4">
        <div className="max-w-3xl text-center space-y-6">
          <h2 className="text-3xl sm:text-6xl tracking-tight font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent py-2">
            {siteConfig.title}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          <Button size="lg" className="w-full" asChild>
            <Link href="/docs" className="gap-2">
              <BookText size={20} />
              Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full" asChild>
            <Link href={"/pricing"} className="gap-2">
              <CircleDollarSign />
              Pricing
            </Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="mt-16 space-y-12 w-full">
          {tiers.map((tier, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-center">
                {tier.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
                {tier.features.map((feature, idx) => (
                  <FeatureCard
                    key={idx}
                    title={feature.title}
                    description={feature.description}
                    tier={feature.tier}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Toggler */}
      <div className="absolute bottom-4 right-4">
        <ThemeToggler />
      </div>

      {/* Footer */}
      <footer className="py-4 md:py-8 text-sm text-center text-muted-foreground">
        <p>
          Created by{" "}
          <a
            href={siteConfig.creator.url}
            target="_blank"
            className="underline hover:no-underline"
          >
            {siteConfig.creator.name}
          </a>
        </p>
      </footer>
    </main>
  );
}
