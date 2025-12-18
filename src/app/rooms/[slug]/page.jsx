'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/header'
import Image from 'next/image'

const ROOMS = [
  {
    id: 'r3',
    title: 'Suite with terrace',
    slug: 'suite-terrace',
    images: ['025_DOM-HDR.jpg', '070_DOM-HDR.jpg', '052_DOM-HDR.jpg'],
    plan: '/plans/vip-1.jpg',
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
    plan: '/plans/vip-2.jpg',
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
    plan: '/plans/cottage.jpg',
    stats: [
      { label: 'Житлова площа', value: '62 м²' },
      { label: 'Місткість', value: '2-4 осіб' },
    ],
  },
]

export default function RoomPage() {
  const params = useParams()
  const [room, setRoom] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!params?.slug) return
    const found = ROOMS.find(r => r.slug === params.slug)
    setRoom(found || null)
    setActiveIndex(0)
  }, [params])

  if (!room) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Номер не знайдено</h1>
      </div>
    )
  }

  return (
    <>
      <Header />

      {/* MOBILE: auto height | DESKTOP: fullscreen */}
      <section className="px-4 md:px-10 py-6 h-auto md:h-screen flex flex-col pt-24">
        <h1 className="text-[28px] sm:text-[36px] md:text-[52px] text-accent font-bold uppercase mb-4 tracking-tight">
          {room.title}
        </h1>

        {/* MOBILE: scroll | DESKTOP: fixed */}
        <div className="grid md:grid-cols-2 gap-6 flex-1 md:overflow-hidden">
          {/* ================= LEFT: GALLERY ================= */}
          <div className="flex flex-col md:flex-row gap-4 md:h-full">
            <div className="flex md:flex-col gap-3 overflow-auto md:w-24">
              {room.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition
                    ${
                      activeIndex === idx
                        ? 'border-black'
                        : 'border-black/20 opacity-70 hover:opacity-100'
                    }`}
                >
                  <Image
                    src={`/${img}`}
                    alt={`${room.title} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative w-full md:flex-1 aspect-[4/3] md:aspect-auto rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={`/${room.images[activeIndex]}`}
                alt={room.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* ================= RIGHT: STATS + PLAN ================= */}
          <div className="flex flex-col gap-6 md:h-full md:overflow-hidden">
            {/* Stats */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                Характеристики
              </h2>

              <div className="flex flex-col gap-3">
                {room.stats.map(stat => (
                  <div
                    key={stat.label}
                    className="flex justify-between text-[14px] md:text-[15px] border-b border-black/10 pb-1"
                  >
                    <span className="font-medium">{stat.label}</span>
                    <span className="opacity-80">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= PLAN (FIXED FOR DESKTOP) ================= */}
            {room.plan && (
              <div className="flex flex-col gap-3 md:flex-1 md:min-h-0">
                <h2 className="text-lg md:text-xl font-semibold">
                  Планування
                </h2>

                {/* 
                  MOBILE:
                  - aspect ratio → читається
                  DESKTOP:
                  - max-h від колонки
                  - image масштабується, не ріжеться
                */}
                <div className="relative w-full aspect-[3/4] md:aspect-auto md:flex-1 md:min-h-0 border rounded-xl bg-white p-3 md:p-4">
                  <Image
                    src={room.plan}
                    alt={`Планування ${room.title}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
