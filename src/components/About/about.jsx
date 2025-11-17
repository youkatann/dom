'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MEDIA_REVIEWS = [
  { src: 'media-1.PNG' },
  { src: 'media-2.PNG' },
  { src: 'media-3.PNG' },
  { src: 'media-4.PNG' },
  { src: 'media-5.PNG' },
  { src: 'media-6.PNG' },
  { src: 'media-7.PNG' },
  { src: 'media-8.PNG' },
  { src: 'media-9.PNG' },
  { src: 'media-10.PNG' },
  { src: 'media-11.PNG' },
]

export default function About() {
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const scrollSpeed = 0.5
    let frame

    const loop = () => {
      if (!paused) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0
        } else {
          el.scrollLeft += scrollSpeed
        }
      }
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [paused])

  const handleUserScroll = () => {
    setPaused(true)
    clearTimeout(scrollRef.current?.scrollTimeout)
    scrollRef.current.scrollTimeout = setTimeout(() => setPaused(false), 1500)
  }

  return (
    <section
      id="Reviews"
      className="px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[40px] sm:gap-[60px] rounded-[24px] sm:rounded-[32px] overflow-hidden"
    >
      {/* Заголовок */}
      <h2 className="text-center font-bold uppercase tracking-tighter text-[#FF4F19]
        text-[32px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.1]"
      >
        Відгуки гостей DOM
      </h2>

      {/* Карусель */}
      <div className="mt-[20px] sm:mt-[40px]">
        <motion.div
          ref={scrollRef}
          className="flex gap-[12px] sm:gap-[20px] overflow-x-scroll no-scrollbar px-[10px] cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onScroll={handleUserScroll}
          whileTap={{ cursor: 'grabbing' }}
        >
          {MEDIA_REVIEWS.map((media, i) => (
            <motion.div
              key={i}
              className="
                flex-shrink-0 
                w-[80%] xs:w-[60%] sm:w-[45%] md:w-[30%] lg:w-[25%] 
                rounded-[16px] sm:rounded-[20px] overflow-hidden shadow bg-white
                transition-transform
              "
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={media.src}
                alt={`Review ${i + 1}`}
                className="w-full aspect-[9/16] object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
