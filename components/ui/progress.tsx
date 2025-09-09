"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted/30", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-500 ease-out rounded-full"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: `linear-gradient(to right, var(--ds-blue-600), var(--ds-blue-300))`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
