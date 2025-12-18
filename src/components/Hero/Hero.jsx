'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import CTAButton from '../common/CTAButton/ctaButton'
import MuxPlayer from '@mux/mux-player-react'

export default function Hero({ isLoading }) {
  const heroRef = useRef(null)
  const rafRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroScale = useTransform(scrollYProgress, [0.2, 1], [1, 0.97])
  const heroRadius = useTransform(scrollYProgress, [0, 1], [0, 36])

  const [naturalSize, setNaturalSize] = useState({ w: 1920, h: 1080 })
  const [scale, setScale] = useState(1)

  const recalc = useCallback((w, h) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    setScale(Math.max(vw / w, vh / h))
  }, [])

  const handleMeta = useCallback((e) => {
    const v = e.currentTarget
    const dims = {
      w: v.videoWidth || 1920,
      h: v.videoHeight || 1080
    }
    setNaturalSize(dims)
    recalc(dims.w, dims.h)
  }, [recalc])

  useEffect(() => {
    if (!naturalSize) return

    const onResize = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        recalc(naturalSize.w, naturalSize.h)
      })
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [naturalSize, recalc])

  const { w: baseW, h: baseH } = naturalSize

  return (
    <motion.section
      ref={heroRef}
      className="
        relative w-screen h-screen overflow-hidden origin-center p-[16px]
        flex flex-col items-center justify-start gap-[32px] pt-[180px]
        lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:gap-[16px]
        lg:pt-[16px] lg:flex-none
      "
      style={{ scale: heroScale, borderRadius: heroRadius }}
    >
      {/* BG VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <MuxPlayer
          playbackId="IyiB89dWYMGGt2zvwVlQCG2FLDD5vvAr01SwwGzdGQ02s"
          accentColor="#ea580c"
          streamType="on-demand"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onLoadedMetadata={handleMeta}
          className="
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            will-change-transform
          "
          style={{
            width: `${baseW}px`,
            height: `${baseH}px`,
            transform: `scale(${scale})`
          }}
          metadata={{
            videoTitle: 'DOM HOTEL Hero Video',
            ViewerUserId: 'user-id-007'
          }}
          poster="https://image.mux.com/IyiB89dWYMGGt2zvwVlQCG2FLDD5vvAr01SwwGzdGQ02s/thumbnail.png?time=1&width=1280"
        />
      </div>

      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* TITLE */}
      <h1
        className="
          z-[2] text-neutral uppercase tracking-tighter leading-[0.9] text-center
          text-[clamp(2.4rem,7vw,3.2rem)] w-full
          lg:col-start-1 lg:col-end-5 lg:row-start-2
        "
      >
        Готовий staycation-готель
        <span className="block mt-4 tracking-tighter text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1rem,1.8vw,1.75rem)]">
          у 15 хвилинах від Києва
        </span>
      </h1>

      {/* SUBTITLE */}
      <p
        className="
          z-[2] text-neutral uppercase tracking-tight leading-[1.2]
          max-w-[480px] text-center mt-8
          text-[clamp(1rem,3.4vw,1rem)]
          lg:text-left lg:max-w-none
          lg:col-start-3 lg:row-start-3
        "
      >
        Safe space для життя і відпочинку поруч зі столицею.
        Надійний актив для інвестора, що працює вже сьогодні
      </p>

      {/* LIST */}
      <ul
        className="
          z-[2] text-neutral opacity-80 tracking-tight leading-[1.2]
          text-center text-[clamp(1rem,3vw,1rem)] mt-8

          lg:text-left lg:space-y-0
          lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:pl-[20px]
          lg:text-[clamp(0.75rem,1.1vw,0.95rem)] lg:list-disc
        "
      >
        <li>Працюючий готельний комплекс</li>
        <li>Повна курортна інфраструктура</li>
        <li>Гарантований викуп</li>
        <li>Repeat-rate більше 90%</li>
      </ul>

      {/* CTA */}
      <div
        className="
          z-[2] flex justify-center mt-2
          text-neutral
          lg:col-start-3 lg:row-start-4 lg:justify-start
        "
      >
        <CTAButton title="Отримати пропозицію" />
      </div>
    </motion.section>
  )
}