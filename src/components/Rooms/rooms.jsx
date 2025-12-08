'use client'

import { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const ROOMS = [
  {
    id: 'r3',
    title: 'Suite with terrace',
    slug: 'suite-terrace',
    hero: '025_DOM-HDR.jpg',
    stats: [
      { label: 'Житлова площа', value: '43.8 м²' },
      { label: 'Місткість', value: '2-4 особи' },
    ],
  },
  {
    id: 'r4',
    title: 'Duplex suite with terrace',
    slug: 'duplex-suite-terrace',
    hero: '469_DOM-HDR.jpg',
    stats: [
      { label: 'Житлова площа', value: '67,5 м²' },
      { label: 'Місткість', value: '3-5 осіб' },
    ],
  },
  {
    id: 'r5',
    title: 'Premium cottage with large terrace',
    slug: 'premium-cottage',
    hero: '669_DOM-HDR.jpg',
    stats: [
      { label: 'Житлова площа', value: '62 м²' },
      { label: 'Місткість', value: '2-4 осіб' },
    ],
  },
]

export default function Rooms() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState(ROOMS[0].id)
  const [hover, setHover] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const leftRef = useRef(null)

  const selected = useMemo(() => ROOMS.find((r) => r.id === selectedId), [selectedId])

  const handleMouseMove = (e) => setCursor({ x: e.clientX, y: e.clientY })
  const goToDetails = () => selected && router.push(`/rooms/${selected.slug}`)

  return (
    <section
      id="Rooms"
      className="mt-[80px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] bg-neutral flex flex-col gap-[24px]"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] text-center lg:text-left text-accent font-bold uppercase tracking-tighter">
          Номерний фонд
        </h2>
      </div>
      <hr className="w-full border-foreground/10 h-[0.5px]" />

      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[40px] flex-1 overflow-hidden">
        
        {/* LEFT COLUMN – now strictly navigating to details */}
        <div
          ref={leftRef}
          className="relative flex-1 cursor-pointer min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] w-full"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={handleMouseMove}
          onClick={goToDetails}
        >
          {selected?.hero ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={selected.hero}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-full w-full bg-accent" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {selected && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-[16px] sm:p-[24px] md:p-[32px] text-neutral">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[8px] sm:gap-[16px]">
                <h3 className="text-[32px] sm:text-[48px] md:text-[60px] lg:text-[40px] leading-[1] font-bold uppercase">
                  {selected.title}
                </h3>
              </div>

              <div className="mt-[16px] grid grid-cols-1 sm:grid-cols-2 gap-[8px] sm:gap-[12px]">
                {selected.stats.map((s, i) => (
                  <div key={i} className="flex flex-col justify-between">
                    <p className='opacity-80 text-[14px]'>{s.label}</p>
                    <span className="font-bold text-[18px]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hover && (
            <motion.button
              type="button"
              className="pointer-events-auto fixed z-[60] px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] rounded-full bg-neutral/80 backdrop-blur text-foreground text-[14px] sm:text-[16px] font-medium shadow-lg"
              style={{ left: cursor.x + 16, top: cursor.y + 16 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              Детальніше
            </motion.button>
          )}
        </div>

        {/* RIGHT COLUMN – switching rooms ONLY */}
        <div className="w-full lg:w-[450px] xl:w-[520px] flex flex-col gap-[20px] lg:gap-[24px]">
          <ul className="flex flex-col gap-[12px] sm:gap-[16px] flex-1 overflow-auto pr-1">
            {ROOMS.map((room) => {
              const active = room.id === selectedId
              return (
                <li key={room.id}>
                  <button
                    onClick={() => setSelectedId(room.id)}
                    className={[
                      'w-full text-left transition overflow-hidden cursor-pointer',
                      active ? 'bg-accent text-neutral' : 'bg-[rgb(149_149_149_/_0.1)] hover:bg-accent',
                    ].join(' ')}
                  >
                    <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[112px_1fr] gap-[12px] sm:gap-[16px] p-[10px] sm:p-[12px] md:p-[14px]">
                      <div className="relative w-[100px] sm:w-[112px] h-[70px] sm:h-[84px] overflow-hidden bg-zinc-200">
                        {room.hero && (
                          <img src={room.hero} alt={room.title} className="absolute inset-0 h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[18px] sm:text-[16px] font-medium">{room.title}</p>
                        <div className="mt-[12px] grid grid-cols-2 gap-x-[8px] gap-y-[12px] text-[12px] sm:text-[13px] opacity-80">
                          {room.stats.slice(0, 4).map((s, i) => (
                            <div key={i} className="flex flex-col gap-[4px]">
                              <span className='opacity-60'>{s.label}</span>
                              <span className="font-bold">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-[12px] flex justify-center lg:justify-start">
            <CTAButton title="Отримати фінансові розрахунки" />
          </div>
        </div>
      </div>
    </section>
  )
}
