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
// import Script from "next/script";
import { getClient } from "@/providers/apollo/rsc";


export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
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
      {/* <Script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></Script> */}
      <link rel="preconnect" href="https://gstatic.com" />
      <link rel="preconnect" href="https://cms.cesarbenavides.com" />
      <DynamicFavicon />
      <body className="flex flex-col min-h-screen overflow-x-hidden scroll-state-container">
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
          {/* @ts-ignore */}
          <Toaster richColors position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
