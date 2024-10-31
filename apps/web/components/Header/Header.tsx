import type { MenuItem } from "@/types/wp";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn, flatListToHierarchical } from "@/lib/utils";

type HeaderProps = {
  title: string;
  subTitle: string;
  menuItems: MenuItem[];
};

const Header: React.FC<HeaderProps> = ({ title, subTitle, menuItems }) => {
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function renderMenu(items) {
    return (
      <NavigationMenuList>
        {items.map((item) => {
          const { id, path, label, children, cssClasses } = item;

          // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
          if (!item.hasOwnProperty("__typename")) {
            return null;
          }

          return (
            <NavigationMenuItem key={id} className={cn(cssClasses)}>
              {children.length ? (
                <>
                  <NavigationMenuTrigger className={cn(cssClasses)}>
                    {label ?? ""}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {renderMenu(children)}
                  </NavigationMenuContent>
                </>
              ) : (
                <Link className="md:whitespace-nowrap" href={path ?? ""}>
                  {label ?? ""}
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    );
  }

  return (
    <header className="container max-w-6xl mx-auto flex flex-row justify-between items-center px-4 py-2 md:px-6 md:py-4 top-0 left-0 sticky">
      <Link href="/" className="flex flex-row items-start gap-2">
        <Image
          className="dark:hidden"
          src="/assets/logo/logo.svg"
          width={50}
          height={50}
          alt={`${title} | ${subTitle}`}
        />
        <Image
          className="hidden dark:block"
          src="/assets/logo/logo-white.svg"
          width={50}
          height={50}
          alt={`${title} | ${subTitle}`}
        />
        <div className="flex-col gap-[2px] hidden lg:flex">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p className="text-sm font-light">{subTitle}</p>
        </div>
      </Link>
      <nav className="flex flex-row gap-4 items-center">
        <NavigationMenu className="flex flex-row gap-4 items-center">
          {renderMenu(hierarchicalMenuItems)}
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
