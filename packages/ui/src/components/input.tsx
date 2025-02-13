import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

export type InputProps = React.ComponentProps<"input"> & HTMLInputElement & { type: string };

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-background file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/90 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
