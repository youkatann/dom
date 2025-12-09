'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Video from 'next-video'
import heroBG from "../../../videos/DOM3_2.mp4"
import CTAButton from '../common/CTAButton/ctaButton'

export default function Hero({ isLoading }) {
  const heroRef = useRef()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroScale = useTransform(scrollYProgress, [0.2, 1], [1, 0.97])
  const heroRadius = useTransform(scrollYProgress, [0, 1], [0, 36])

  const [nat, setNat] = useState(null)
  const [scale, setScale] = useState(1)

  const recalc = (w, h) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    setScale(Math.max(vw / w, vh / h))
  }

  const handleMeta = (e) => {
    const v = e.currentTarget
    const dims = { w: v.videoWidth || 1920, h: v.videoHeight || 1080 }
    setNat(dims)
    recalc(dims.w, dims.h)
  }

  useEffect(() => {
    if (!nat) return
    const onResize = () => recalc(nat.w, nat.h)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [nat])

  const baseW = nat?.w || 1920
  const baseH = nat?.h || 1080

  return (
    <motion.section
      ref={heroRef}
      className="
        relative w-screen h-screen overflow-hidden origin-center p-[16px]
        flex flex-col items-center justify-start gap-[32px] pt-[180px]
        lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:gap-[16px]
        lg:pt-[16px] lg:flex-none
      "
      style={{
        scale: heroScale,
        borderRadius: heroRadius
      }}
    >
      {/* ФОН-ВІДЕО */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Video
          src={heroBG}
          autoplay
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
        />
      </div>

      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* ЗАГОЛОВОК */}
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

      {/* ПІДЗАГОЛОВОК */}
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

      {/* СПИСОК */}
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

      {/* КНОПКА */}
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
