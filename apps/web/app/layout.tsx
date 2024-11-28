import { getClient } from "@faustwp/experimental-app-router";
import "@/faust.config.js";
import "@/styles/global.css";
import Providers from "@/providers";
import { GET_LAYOUT } from "@/queries";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/Header";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

export default async function RootLayout({ children }) {
  const client = await getClient();

  const { data } = await client.query({
    query: GET_LAYOUT,
  });

  const { siteSettings, primaryMenuItems } = data || {};
  const { globalOptions } = siteSettings || {};
  const { xLink, name, linkedinLink, githubLink, email } = globalOptions || {};

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <DynamicFavicon />
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header
            title={name}
            subTitle={"Design Engineer & Software Architect"}
            menuItems={primaryMenuItems?.nodes}
          />
          {children}
          <Footer
            githubUrl={githubLink}
            linkedinUrl={linkedinLink}
            twitterUrl={xLink}
            email={email}
          />
          <Toaster richColors position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
