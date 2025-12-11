"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { usePathname } from "next/navigation"

export function Preloader() {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isRouting, setIsRouting] = useState(false)
  const pathname = usePathname()

  // Handle initial page load
  useEffect(() => {
    const handleLoad = () => setIsFirstLoad(false)

    if (document.readyState === "complete") {
      // Use a timeout to prevent flicker on fast loads
      setTimeout(handleLoad, 300)
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => window.removeEventListener("load", handleLoad)
  }, [])

  // Handle subsequent route changes
  useEffect(() => {
    if (isFirstLoad) return

    setIsRouting(true)
    const timer = setTimeout(() => {
      setIsRouting(false)
    }, 800) // Duration for route change animation

    return () => clearTimeout(timer)
  }, [pathname, isFirstLoad])

  const shouldShowPreloader = isFirstLoad || isRouting

  return (
    <AnimatePresence>
      {shouldShowPreloader && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Image
              src="/logo-mg-effect.png"
              alt="MG Effect Logo"
              width={160}
              height={160}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
