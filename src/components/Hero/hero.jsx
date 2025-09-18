'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Video from 'next-video'
import heroBG from '/videos/DOM_2.mp4'
import CTAButton from '../common/CTAButton/ctaButton'

export default function Hero({ isLoading, cursorRef }) {
  const heroRef = useRef()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroScale = useTransform(scrollYProgress, [0.2,1], [1,0.97])
  const heroRadius = useTransform(scrollYProgress, [0,1], [0,36])
  const heroSubtitle = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [nat, setNat] = useState(null)   // { w, h }
  const [scale, setScale] = useState(1)
  const [animateText, setAnimateText] = useState(false)

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

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setAnimateText(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  const baseW = nat?.w || 1920
  const baseH = nat?.h || 1080

  return (
    <motion.section
      ref={heroRef}
      data-scroll-section
      className="relative grid w-screen h-screen p-[20px] overflow-hidden origin-center grid-cols-4 gap-[20px] grid-rows-4"
      style={{
        scale: heroScale,
        transformOrigin: "center center",
        borderRadius: heroRadius
      }}
    >
      <Video
        src={heroBG}
        autoplay
        muted
        loop
        playsInline
        controls={false}
        onLoadedMetadata={handleMeta}
        className="
          absolute z-0 left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          block pointer-events-none will-change-transform
          col-start-1 col-end-5 row-start-1 row-end-5
        "
        style={{
          width: `${baseW}px`,
          height: `${baseH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center"
        }}
      />

      {/* затемнення */}
      <div className="absolute inset-0 bg-black/40 z-1 pointer-events-none" />

      {/* Анімований блок */}
      <h1 data-scroll data-scroll-speed="0.2" className="text-[8em] leading-[0.9] tracking-tighter text-neutral font-medium uppercase col-start-1 col-end-5 row-start-2 row-end-2 z-5 text-center">
        Готовий staycation-готель у 15 хвилинах від Києва
      </h1>
      <p data-scroll data-scroll-speed="0.3" className='col-start-3 row-start-3 z-5 text-neutral text-[1.5em] uppercase tracking-tight leading-[1.2]'>
        Safe space для життя і відпочинку поруч зі столицею. Надійний актив для інвестора, що працює вже сьогодні
      </p>
      <div data-scroll data-scroll-speed="0.001" className='col-start-4 row-start-4 row-end-4 flex items-end justify-end z-5 text-neutral'>
        <CTAButton title="Отримати пропозицію"/>
      </div>
      <ul data-scroll data-scroll-speed="0.1" className='pl-[24px] col-start-1 col-end-3 flex flex-col justify-end row-start-4 z-5 text-neutral text-[1.2em] uppercase tracking-tight leading-[1.2] opacity-80 list-disc'>
        <li>Працюючий готельний комплекс</li>
        <li>Повна курортна інфраструктура</li>
        <li>Гарантований викуп</li>
        <li>Repeat-rate більше 90%</li>
      </ul>
    </motion.section>
  )
}
