"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "slot" : "button"

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all ease-in-out duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70": variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/70": variant === "ghost",
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/70": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
