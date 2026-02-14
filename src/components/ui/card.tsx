import * as React from "react"
import { cn } from "@/utils/index"

function Card({ className, variant = "flat", ...props }: React.ComponentProps<"div"> & { variant?: "default" | "flat" }) {
  return (
    <div
      className={cn(
        variant === "default"
          ? "bg-card text-card-foreground rounded-xl border shadow-sm"
          : "bg-card text-card-foreground border-0 rounded-none shadow-none",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 grid auto-rows-min", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("leading-normal font-bold text-[32px]", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
