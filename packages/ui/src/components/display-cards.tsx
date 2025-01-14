"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  style?: React.CSSProperties;
  index?: number;
  wrapperActive?: boolean;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  index = 0,
  wrapperActive,
  ...props
}: DisplayCardProps) {
  return (
    <div className={cn(className)} {...props}>
      <div>
        {/* <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span> */}
        <p
          className={cn(
            "text-lg font-medium",
            "whitespace-nowrap group-hover:whitespace-normal",
            "transition-all duration-700",
            titleClassName,
          )}
        >
          {title}
        </p>
      </div>
      {description && (
        <div
          className={cn(
            "text-sm font-mono",
            "whitespace-nowrap group-hover:whitespace-normal",
            "transition-all duration-700",
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <p className="text-muted-foreground text-xs">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  className?: string;
  active?: boolean;
}

export default function DisplayCards({
  cards,
  className,
  active,
}: DisplayCardsProps): JSX.Element {
  const displayCards = cards;

  if (!displayCards) {
    return null;
  }

  return (
    <div className={className}>
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
