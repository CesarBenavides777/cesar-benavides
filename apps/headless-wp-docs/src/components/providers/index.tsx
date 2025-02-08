import { ThemeProvider } from "@/components/theme/provider";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SidebarProvider>
  );
}
