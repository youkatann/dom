'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header/header'
import Image from 'next/image'

const ROOMS = [
  {
    id: 'r3',
    slug: 'suite-terrace',
    title: 'SUITE with TERRACE',
    hero: '/025_DOM-HDR.jpg',
    plan: '/plans/vip-1.jpg',
    description: 'Опис номера...',
    stats: [
      { label: 'Житлова площа', value: '43.8 м²' },
      { label: 'Місткість', value: '2-4 особи' },
    ],
  },
  {
    id: 'r4',
    slug: 'duplex-suite-terrace',
    title: 'DUPLEX SUITE with TERRACE',
    hero: '/469_DOM-HDR.jpg',
    plan: '/plans/vip-2.jpg',
    description: 'Опис номера...',
    stats: [
      { label: 'Житлова площа', value: '67,5 м²' },
      { label: 'Місткість', value: '3-5 осіб' },
    ],
  },
  {
    id: 'r5',
    slug: 'premium-cottage',
    title: 'PREMIUM COTTAGE with LARGE TERRACE',
    hero: '/669_DOM-HDR.jpg',
    plan: '/plans/cottage.jpg',
    description: 'Опис номера...',
    stats: [
      { label: 'Житлова площа', value: '62 м²' },
      { label: 'Місткість', value: '2-4 осіб' },
    ],
  },
]

export default function RoomPage() {
  const params = useParams() // <-- тепер params доступні як звичайний об’єкт
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (!params?.slug) return
    const found = ROOMS.find(r => r.slug === params.slug)
    setRoom(found)
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
      <section className="px-4 md:px-10 py-6 h-screen flex flex-col pt-24">
        <h1 className="text-[32px] sm:text-[42px] md:text-[52px] text-accent font-bold uppercase mb-4 tracking-tight">
          {room.title}
        </h1>

        <div className="grid md:grid-cols-2 gap-8 flex-1 overflow-hidden">
          {/* Left side: hero photo */}
          <div className="rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
            <Image
              src={room.hero}
              alt={room.title}
              width={1400}
              height={900}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right side: stats + full plan */}
          <div className="flex flex-col gap-6 overflow-y-auto pr-2">
            {/* Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
              <div className="flex flex-col gap-3">
                {room.stats?.map(stat => (
                  <div
                    key={stat.label}
                    className="flex justify-between text-[15px] border-b border-black/10 pb-1"
                  >
                    <span className="font-medium">{stat.label}</span>
                    <span className="opacity-80">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full plan */}
            <div className="rounded-xl overflow-hidden border bg-white flex items-center justify-center p-3">
              <Image
                src={room.plan}
                alt={`Планування ${room.title}`}
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
