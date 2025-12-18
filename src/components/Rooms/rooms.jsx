'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

/* ================= DATA ================= */

const ROOMS = [
  {
    id: 'r3',
    title: 'Suite with terrace',
    slug: 'suite-terrace',
    images: ['025_DOM-HDR.jpg', '070_DOM-HDR.jpg', '052_DOM-HDR.jpg'],
    stats: [
      { label: 'Житлова площа', value: '43.8 м²' },
      { label: 'Місткість', value: '2-4 особи' },
    ],
  },
  {
    id: 'r4',
    title: 'Duplex suite with terrace',
    slug: 'duplex-suite-terrace',
    images: ['469_DOM-HDR.jpg', '580_DOM-HDR.jpg', '502_DOM-HDR.jpg'],
    stats: [
      { label: 'Житлова площа', value: '67,5 м²' },
      { label: 'Місткість', value: '3-5 осіб' },
    ],
  },
  {
    id: 'r5',
    title: 'Premium cottage with large terrace',
    slug: 'premium-cottage',
    images: ['669_DOM-HDR.jpg', '690_DOM-HDR.jpg', '642_DOM-HDR.jpg'],
    stats: [
      { label: 'Житлова площа', value: '62 м²' },
      { label: 'Місткість', value: '2-4 осіб' },
    ],
  },
]

/* ================= HERO ================= */

const RoomHero = ({
  room,
  hover,
  cursor,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}) => {
  const [hero, ...details] = room.images

  return (
    <div
      className="relative flex-1 cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="grid grid-rows-[1fr_auto] gap-[12px] min-h-[360px] sm:min-h-[440px] lg:min-h-[600px]">
        {/* HERO IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={hero}
            alt={room.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-0 left-0 right-0 p-[16px] sm:p-[24px] md:p-[32px] text-neutral">
            <h3 className="text-[32px] sm:text-[44px] md:text-[56px] font-bold uppercase leading-none">
              {room.title}
            </h3>

            <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
              {room.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-[14px] opacity-70">{s.label}</p>
                  <span className="font-bold text-[18px]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DETAIL IMAGES */}
        {details.length > 0 && (
          <div className="grid grid-cols-2 gap-[12px] h-[120px] sm:h-[150px] md:h-[170px]">
            {details.slice(0, 2).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CURSOR CTA */}
      {hover && (
        <motion.button
          type="button"
          className="pointer-events-none fixed z-[60] px-[14px] py-[8px] rounded-full bg-neutral/80 backdrop-blur text-foreground text-[14px] font-medium shadow-lg"
          style={{ left: cursor.x + 16, top: cursor.y + 16 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          Детальніше
        </motion.button>
      )}
    </div>
  )
}

/* ================= LIST ITEM ================= */

const RoomsListItem = ({ room, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full text-left transition overflow-hidden ${
        active
          ? 'bg-accent text-neutral'
          : 'bg-[rgb(149_149_149_/_0.1)] hover:bg-accent'
      }`}
    >
      <div className="grid grid-cols-[100px_1fr] gap-[14px] p-[12px]">
        <div className="relative w-[100px] h-[70px] overflow-hidden bg-zinc-200">
          <img
            src={room.images[0]}
            alt={room.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[16px] font-medium">{room.title}</p>

          <div className="mt-[10px] grid grid-cols-2 gap-[8px] text-[12px] opacity-80">
            {room.stats.map((s, i) => (
              <div key={i}>
                <span className="opacity-60">{s.label}</span>
                <div className="font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  </li>
)

/* ================= MAIN ================= */

export default function Rooms() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState(ROOMS[0].id)
  const [hover, setHover] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const selected = useMemo(
    () => ROOMS.find((r) => r.id === selectedId),
    [selectedId]
  )

  const goToDetails = useCallback(
    () => selected && router.push(`/rooms/${selected.slug}`),
    [selected, router]
  )

  return (
    <section
      id="Rooms"
      className="mt-[80px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] bg-neutral flex flex-col gap-[24px]"
    >
      <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] text-accent font-bold uppercase tracking-tighter">
        Номерний фонд
      </h2>

      <hr className="border-foreground/10" />

      <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[40px]">
        <RoomHero
          room={selected}
          hover={hover}
          cursor={cursor}
          onClick={goToDetails}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseMove={(e) =>
            setCursor({ x: e.clientX, y: e.clientY })
          }
        />

        <div className="w-full lg:w-[460px] flex flex-col gap-[20px]">
          <ul className="flex flex-col gap-[14px] flex-1 overflow-auto pr-1">
            {ROOMS.map((room) => (
              <RoomsListItem
                key={room.id}
                room={room}
                active={room.id === selectedId}
                onClick={() => setSelectedId(room.id)}
              />
            ))}
          </ul>

          <div className="flex justify-center lg:justify-start">
            <CTAButton title="Отримати фінансові розрахунки" />
          </div>
        </div>
      </div>
    </section>
  )
}
