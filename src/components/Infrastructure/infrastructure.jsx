'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const TABS = [
  { key: 'restaurant', label: 'Ресторан' },
  { key: 'bbq',        label: 'BBQ' },
  { key: 'banya',      label: 'Баня' },
  { key: 'chan',       label: 'Чан' },
  { key: 'kids',       label: 'Дитячі зони' },
  { key: 'events',     label: 'Події' },
]

const CONTENT = {
  restaurant: {
    title: 'Ресторан',
    description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countLabel: 'СТОЛІВ',
    countValue: 24,
    metrics: [
      { k: 'КІЛЬКІСТЬ ПОСАДКОВИХ МІСЦЬ', v: 150 },
      { k: 'СЕРЕДНІЙ ЧЕК', v: '800 ₴' },
      { k: 'ГРАФІК РОБОТИ', v: '09:00–23:00' },
    ],
    hero: 'img-1.jpg',
  },
  bbq: {
    title: 'BBQ',
    description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countLabel: 'ГРИЛЬ-ЗОНИ',
    countValue: 6,
    metrics: [
      { k: 'МАКС. КОМПАНІЯ', v: '12 осіб' },
      { k: 'ВУГІЛЛЯ/ГАЗ', v: 'вугілля' },
      { k: 'ОРЕНДА/ГОД', v: '300 ₴' },
    ],
    hero: 'img-2.jpg',
  },
  // інші так само...
}

const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function Infrastructure() {
  const [active, setActive] = useState('restaurant')
  const data = useMemo(() => CONTENT[active], [active])

  const onKey = (e, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActive(key)
    }
  }

  return (
    <section className="mt-[150px] p-[20px] flex flex-col gap-[40px] bg-neutral">
      {/* Заголовок + таби */}
      <div className="flex items-center justify-between">
        <h2 className="text-[72px] tracking-tighter text-accent font-bold uppercase">Інфраструктура</h2>
        <div className="flex gap-[12px]">
          {TABS.map(t => {
            const activeTab = t.key === active
            return (
              <motion.button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                onKeyDown={(e) => onKey(e, t.key)}
                aria-selected={activeTab}
                className={[
                  'px-[18px] py-[10px] h-fit border rounded-full transition',
                  'text-[18px] uppercase tracking-wide',
                  activeTab
                    ? 'border-accent bg-accent text-neutral-50'
                    : 'border-accent text-accent/90 hover:bg-accent/10',
                ].join(' ')}
                whileTap={{ scale: 0.98 }}
              >
                {t.label}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Підзаголовок */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${active}`}
          {...fadeSlide}
          className="text-[20px] font-medium text-foreground max-w-[500px]"
        >
          {data.description1}
        </motion.p>
      </AnimatePresence>

      {/* Нижній блок */}
      <div className="flex gap-[20px] w-full">
        {/* Ліва колонка: фото */}
        <div className="w-[70%] relative rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
              exit={{ opacity: 0, scale: 0.995, transition: { duration: 0.2 } }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.hero}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Права колонка: фото (верх) + картка (низ) */}
        <div className="w-[30%] flex flex-col gap-[20px]">
          {/* Верхнє фото */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.hero}
              alt={`${data.title} secondary`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Нижня картка */}
          <div className="flex-1 rounded-2xl bg-foreground/10 p-[20px] shadow-md flex flex-col justify-between">
            <h3 className="text-[32px] font-semibold text-accent mb-[10px]">
              {data.title}
            </h3>
            <div className="flex flex-col gap-[12px]">
              {data.metrics?.map((m, i) => (
                <div
                  key={m.k + i}
                  className="flex justify-between text-[20px] border-b border-neutral/20 pb-[4px]"
                >
                  <span className="text-foreground">{m.k}</span>
                  <span className="text-foreground/60">{m.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[20px]">
              <CTAButton title="Отримати фінансові розрахунки" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
