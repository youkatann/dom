'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import HeroVideo from './HeroVideo'
import HeroContent from './HeroContent'

export default function Hero() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroScale = useTransform(scrollYProgress, [0.2, 1], [1, 0.97])
  const heroRadius = useTransform(scrollYProgress, [0, 1], [0, 36])

  return (
    <motion.section
      ref={heroRef}
      className="relative w-screen h-[100dvh] overflow-hidden lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:gap-4 lg:pt-4 p-4 flex flex-col items-center justify-start gap-8 pt-[180px]"
      style={{ scale: heroScale, borderRadius: heroRadius }}
    >
      {/* VIDEO + OVERLAY */}
      <HeroVideo />

      {/* CONTENT */}
      <HeroContent />
    </motion.section>
  )
}
