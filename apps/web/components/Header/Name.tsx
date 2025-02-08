"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NameProps {
    title: string;
    subTitle: string;
}

const Name = ({
    title,
    subTitle
}: NameProps) => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    
    return (
        <div className={cn("flex-col gap-[2px]", {
            "hidden": isHome,
            "hidden lg:flex": !isHome
        })}>
            <h1 className="text-2xl font-medium">{title}</h1>
            <p className="text-sm font-light">{subTitle}</p>
        </div>
    );
};

export default Name;