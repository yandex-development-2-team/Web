import * as React from "react"
import { cn } from "@/utils/index"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border bg-input px-3 text-foreground placeholder:text-border placeholder:text-sm  placeholder:italic",
        "transition-all outline-none",
        "focus-visible:ring-0 focus-visible:border-ring",
        "aria-invalid:border-destructive aria-invalid:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
