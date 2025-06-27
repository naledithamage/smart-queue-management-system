import * as React from "react"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full rounded-lg border p-4",
          variant === "destructive"
            ? "border-red-400 bg-red-50 text-red-900 dark:border-red-600 dark:bg-red-950 dark:text-red-50"
            : "border-border bg-background shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <h5 ref={ref} className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />
  },
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("text-sm [&:not(:first-child)]:mt-1", className)} {...props} />
  },
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
