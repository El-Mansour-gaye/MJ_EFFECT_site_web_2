"use client"

import { useRef } from "react"
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: string
}

export function AnimatedSection({ children, className, delay = "duration-500" }: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        delay,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </div>
  )
}
