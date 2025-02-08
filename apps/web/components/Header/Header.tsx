import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Name from "./Name";

type MenuItem = {
  __typename: string;
  id: string;
  label: string;
  uri: string;
  path: string;
  parentId: string | null;
  cssClasses: string[];
  menu: any;
};

type HeaderProps = {
  title: string;
  subTitle: string;
  menuItems: MenuItem[];
};

const Header: React.FC<HeaderProps> = ({ title, subTitle, menuItems }) => {
  function renderMenu(items: MenuItem[]) {
    return (
      <NavigationMenuList className="gap-1 md:gap-2 flex flex-row">
        {items.map((item) => (
          <NavigationMenuItem key={item.id}>
            {item.path.includes(".pdf") ? (
              <a
                href={item.path}
                className="block py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.path} className="block py-2">
                {item.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    );
  }

  return (
      <header
        className={cn(
          "w-full max-w-6xl mx-auto flex flex-row justify-between items-center px-2 py-2 md:px-6",
          "transition-all duration-200 ease-in-out",
          "dark:bg-[#242424] bg-[#f9f9f9] z-50",
          "rounded-lg",
          "sticky top-4 z-50"
        )}
      >
        <Link href="/" className="flex flex-row items-start gap-2">
          <Image
            className={cn("dark:hidden")}
            src="/assets/logo/logo.svg"
            width={50}
            height={50}
            alt={`${title} | ${subTitle}`}
            loading="eager"
            priority
          />
          <Image
            className="hidden dark:block"
            src="/assets/logo/logo-white.svg"
            width={50}
            height={50}
            alt={`${title} | ${subTitle}`}
            loading="eager"
            priority
          />
          <Name title={title} subTitle={subTitle} />
        </Link>
        <nav className="flex flex-row gap-4 items-center">
          <NavigationMenu>
            {renderMenu(menuItems)}
            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenu>
          <ThemeToggle />
        </nav>
      </header>
  );
};

export default Header;
