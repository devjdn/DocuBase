import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center cursor-pointer whitespace-nowrap rounded-lg text-sm font-regular ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "stroke-muted-foreground text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:stroke-accent-foreground",
        sidebarGhost: "stroke-muted-foreground text-muted-foreground hover:bg-sidebar-accent hover:text-accent-foreground hover:stroke-accent-foreground",
        suspense: "animate-pulse bg-muted border border-border",
        popover: "bg-popover text-popover-foreground hover:bg-popover/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
        icon: "h-9 w-9",
      },
      justify: {
        default: "justify-start",
        center: "justify-center",
        between: "justify-between",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      justify: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, justify, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, justify, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
