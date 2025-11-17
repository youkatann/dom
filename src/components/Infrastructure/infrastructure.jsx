'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const TABS = [
  { key: 'restaurant', label: 'Ресторан' },
  { key: 'bass', label: '3 басейни' },
  { key: 'kidsclub', label: 'Kids club' },
  { key: 'ropepark', label: 'Мотузковий парк' },
  { key: 'fireplace', label: 'Fireplace' },
  { key: 'events', label: 'Локації для івентів' },
  { key: 'banya', label: 'Банний комплекс' },
]

const CONTENT = {
  restaurant: {
    title: 'Ресторан',
    description1:
      'Затишний ресторан зі смачною кухнею та панорамним видом на природу. Меню включає європейські та локальні страви.',
    metrics: [
      { k: 'КІЛЬКІСТЬ ПОСАДКОВИХ МІСЦЬ', v: 150 },
      { k: 'СЕРЕДНІЙ ЧЕК', v: '800 ₴' },
      { k: 'ГРАФІК РОБОТИ', v: '09:00–23:00' },
    ],
    hero: 'restaurant-1.jpg',
    subphoto: 'restaurant-2.jpg',
  },
  // інші ключі залишаються без змін...
}

const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
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
    <section
      id="Infrastructure"
      className="mt-[100px] xl:mt-[150px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] flex flex-col gap-[32px] bg-neutral"
    >
      {/* Заголовок */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-[20px]">
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[64px] xl:text-[72px] tracking-tighter text-accent font-bold uppercase">
          Інфраструктура
        </h2>

        {/* Tabs для XL і більше */}
        <div className="hidden xl:flex flex-wrap gap-[10px] justify-end">
          {TABS.map((t) => {
            const activeTab = t.key === active
            return (
              <motion.button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                onKeyDown={(e) => onKey(e, t.key)}
                aria-selected={activeTab}
                className={[
                  'px-[14px] py-[8px] border rounded-full transition text-[14px] uppercase tracking-wide',
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

        {/* Select для менших, ніж XL */}
        <div className="xl:hidden relative w-full md:w-[300px]">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full border border-accent rounded-full bg-transparent text-accent px-[14px] py-[10px] text-[14px] uppercase tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
          >
            {TABS.map((t) => (
              <option key={t.key} value={t.key} className="text-black">
                {t.label}
              </option>
            ))}
          </select>

          {/* SVG-стрілочка */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-accent"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Опис */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${active}`}
          {...fadeSlide}
          className="text-[18px] sm:text-[20px] font-medium text-foreground max-w-[600px]"
        >
          {data.description1}
        </motion.p>
      </AnimatePresence>

      {/* Контент */}
      <div className="flex flex-col lg:flex-row gap-[20px] w-full">
        <div className="w-full lg:w-[70%] relative rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
              exit={{
                opacity: 0,
                scale: 0.995,
                transition: { duration: 0.2 },
              }}
            >
              <img
                src={data.hero}
                alt={data.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-[30%] flex flex-col gap-[20px]">
          <div className="rounded-2xl overflow-hidden bg-gray-200">
            <img
              src={data.subphoto}
              alt={`${data.title} secondary`}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
            />
          </div>

          <div className="rounded-2xl bg-foreground/10 p-[20px] shadow-md flex flex-col justify-between">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-accent mb-[10px]">
              {data.title}
            </h3>
            <div className="flex flex-col gap-[8px]">
              {data.metrics?.map((m, i) => (
                <div
                  key={m.k + i}
                  className="flex justify-between text-[16px] sm:text-[18px] md:text-[20px] border-b border-neutral/20 pb-[4px]"
                >
                  <span className="text-foreground">{m.k}</span>
                  <span className="text-foreground/60">{m.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[16px]">
              <CTAButton title="Отримати фінансові розрахунки" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
