'use client'

import { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const ROOMS = [
  {
    id: 'r1',
    title: 'STANDARD ROOM',
    slug: 'room-1',
    hero: 'img-1.jpg',
    stats: [
      { label: 'Житлова площа', value: '18 м²' },
      { label: 'Місткість', value: '2 особи' },
      { label: 'Опис', value: 'Опис' },
    ],
  },
  {
    id: 'r2',
    title: 'STANDARD ROOM with TERRACE',
    slug: 'room-2',
    hero: 'img-2.jpg',
    stats: [
      { label: 'Житлова площа', value: '18 м²' },
      { label: 'Місткість', value: '2 особи' },
      { label: 'Тераса', value: 'наявна' },
      { label: 'Опис', value: 'Опис' },
    ],
  },
  {
    id: 'r3',
    title: 'SUITE with TERRACE',
    slug: 'suite',
    hero: 'img-3.jpg',
    stats: [
{ label: 'Житлова площа', value: '43.8 м²' },
      { label: 'Місткість', value: '2-4 особи' },
      { label: 'Тераса', value: 'наявна' },
      { label: 'Опис', value: 'Опис' },
    ],
  },
    {
    id: 'r4',
    title: 'DUPLEX SUITE with TERRACE',
    slug: 'suite',
    hero: 'img-4.jpg',
    stats: [
{ label: 'Житлова площа', value: '67,5 м²' },
      { label: 'Місткість', value: '3-5 осіб' },
      { label: 'Тераса', value: 'наявна' },
      { label: 'Опис', value: 'Опис' },
    ],
  },
      {
    id: 'r5',
    title: 'PREMIUM COTTAGE with LARGE TERRACE',
    slug: 'suite',
    hero: 'img-5.jpg',
    stats: [
{ label: 'Житлова площа', value: '62 м²' },
      { label: 'Місткість', value: '2-4 осіб' },
      { label: 'Тераса', value: 'велика' },
      { label: 'Опис', value: 'Опис' },
    ],
  },
]

export default function Rooms() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState(ROOMS[0].id)
  const [hover, setHover] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const leftRef = useRef(null)

  const selected = useMemo(() => ROOMS.find(r => r.id === selectedId), [selectedId])

  const handleMouseMove = (e) => setCursor({ x: e.clientX, y: e.clientY })
  const goToDetails = () => selected && router.push(`/rooms/${selected.slug}`)

  return (
    <section className="mt-[120px] h-screen p-5 bg-neutral flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[72px] text-accent font-bold uppercase">Номерний фонд</h2>
      </div>

      <div className="flex gap-5 flex-1 overflow-hidden">
        {/* Ліва колонка */}
        <div
          ref={leftRef}
          className="relative bg-accent flex-1 rounded-2xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={handleMouseMove}
          onClick={goToDetails}
          role="button"
          aria-label={selected ? `Детальніше про ${selected.title}` : 'Детальніше'}
        >
          {selected && selected.hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selected.hero} alt={selected.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-accent" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {selected && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 text-neutral">
              <div className="flex items-end justify-between">
                <h3 className="text-[76px] font-bold">{selected.title}</h3>
                <span className="text-[18px] opacity-80">Натисніть для деталей</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {selected.stats.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <p className="text-[18px] text-neutral tracking-tighter leading-[0.9]">{s.label}</p>
                    <span className="text-[18px] text-neutral tracking-tighter leading-[0.9]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hover && (
            <motion.button
              type="button"
              onClick={goToDetails}
              className="pointer-events-auto fixed z-[60] px-4 py-2 rounded-full bg-neutral backdrop-blur text-foreground text-[18px] font-medium shadow-lg"
              style={{ left: cursor.x + 16, top: cursor.y + 16 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              Детальніше
            </motion.button>
          )}
        </div>

        {/* Права колонка */}
        <div className="w-[520px] flex flex-col gap-4 overflow-hidden">
          <ul className="flex flex-col gap-4 flex-1 overflow-auto pr-1">
            {ROOMS.map((room) => {
              const active = room.id === selectedId
              return (
                <li key={room.id}>
                  <button
                    onClick={() => setSelectedId(room.id)}
                    className={[
                      'w-full text-left rounded-2xl transition overflow-hidden',
                      active
                        ? 'bg-accent text-neutral'
                        : 'hover:bg-neutral',
                    ].join(' ')}
                    aria-pressed={active}
                  >
                    <div className="grid grid-cols-[112px_1fr] gap-4 p-3">
                      <div className="relative w-[112px] h-[84px] rounded-lg overflow-hidden bg-zinc-200">
                        {room.hero ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={room.hero}
                            alt={room.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium">{room.title}</p>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs opacity-80">
                          {room.stats.slice(0, 4).map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span>{s.label}</span>
                              <span className="font-medium">{s.value}</span>
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

          <div className="mt-4 px-[10px]">
            <CTAButton title="Отримати фінансові розрахунки" />
          </div>
        </div>
      </div>
    </section>
  )
}
