"use client";

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
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import clsx from "clsx";

type SpecialMenuItem = MenuItem&{
  children: SpecialMenuItem[];
}

type HeaderProps = {
  title: string;
  subTitle: string;
  menuItems: SpecialMenuItem[];
};

const Header: React.FC<HeaderProps> = ({ title, subTitle, menuItems }) => {
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);
  let [hasScrolledDown, setHasScrolledDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setHasScrolledDown(true);
    } else {
      setHasScrolledDown(false);
    }
  });


  function renderMenu(items) {
    return (
      <NavigationMenuList>
        {items.map((item: SpecialMenuItem) => {
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
    <header 
      className={clsx("container max-w-6xl mx-auto flex flex-row justify-between items-center px-4 py-2 md:px-6 md:py-4 top-0 left-0 sticky", {
        "bg-white dark:bg-[#242424] shadow-md": hasScrolledDown,
        "bg-transparent": !hasScrolledDown,
      })}>
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
