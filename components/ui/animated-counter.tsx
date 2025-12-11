"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface AnimatedCounterProps {
  value: number
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const spring = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  })

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => unsubscribe()
  }, [spring])

  return <motion.span>{displayValue.toLocaleString()}</motion.span>
}
