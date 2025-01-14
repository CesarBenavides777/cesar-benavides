"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/ui/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

type LabelType = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
  };

const Label = ({ ref, className, ...props }: LabelType) => (
  <LabelPrimitive.Root
    ref={ref}
    // @ts-ignore
    className={cn(labelVariants(), className)}
    htmlFor={props.htmlFor}
    {...props}
  />
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
