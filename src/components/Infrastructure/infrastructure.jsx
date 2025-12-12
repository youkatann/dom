'use client'

import { useState, useMemo, useEffect } from 'react'
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
    description1: 'Затишний ресторан зі смачною кухнею та панорамним видом на природу. Меню включає європейські та локальні страви.',
    countLabel: 'столів',
    countValue: 24,
    metrics: [],
    hero: 'restaurant-1.jpg',
    subphoto: 'restaurant-2.jpg',
  },
  bass: {
    title: '3 басейни',
    description1: 'На території комплексу — три басейни з підігрівом. Комфортне плавання у будь-яку погоду теплого сезону',
    countLabel: 'Басейни',
    countValue: 3,
    metrics: [
      { k: 'Глибина', v: 'до 1.5м' },
    ],
    hero: 'pools-1.jpg',
    subphoto: 'pools-2.jpg',
  },
  kidsclub: {
    title: 'Kids club',
    description1: 'Триповерховий дитячий простір, де малеча бешкетує разом з нянями та займається творчістю на майстер класах',
    countLabel: 'Зони',
    countValue: 4,
    metrics: [
      { k: 'Поверхи', v: '3' },
      { k: 'Вік', v: 'від 3-ох років' },
      { k: 'Відвідування', v: 'безкоштовне' },
    ],
    hero: 'kids-1.jpg',
    subphoto: 'kids-2.jpg',
  },
  ropepark: {
    title: 'Мотузковий парк',
    description1: 'Момент полазити та подолати канатні перешкоди настав',
    countLabel: 'Траси',
    countValue: 5,
    metrics: [
      { k: '', v: '' },
    ],
    hero: 'rope-1.jpg',
    subphoto: 'rope-2.jpg',
  },
  fireplace: {
    title: 'Fireplace',
    description1: 'Затишне місце, де можна зібратися з друзями за келихом вина, а навкруги — свіже лісове повітря. Відпочивай та не думай ні про що',
    countLabel: 'Місць',
    countValue: 20,
    metrics: [
      { k: '', v: '' },
    ],
    hero: 'fireplace.png',
    subphoto: 'fireplace-2.png',
  },
  events: {
    title: 'Локації для івентів',
    description1: 'Місця, які здатні на все, від помпезного весілля з ідеально розташованою весільною церемонією на терасі до конференції, масштабної презентації та корпоративу',
    countLabel: 'Локації',
    countValue: 6,
    metrics: [
      { k: 'Місткість', v: "до 100" },
    ],
    hero: 'event-1.jpg',
    subphoto: 'event-2.jpg',
  },
  banya: {
    title: 'SPA-простір',
    description1: 'Фінська сауна та аромотерапія в хамамі дарують спокій і розслаблення. Джакузі та чан просто неба розчиняють втому. Велика зона з каміном гріє погляди й розмови',
    countLabel: 'Парні',
    countValue: 3,
    metrics: [
      { k: 'Типи', v: 'фінська сауна, хамам' },
      { k: 'Безкоштовне відвідування', v: 'до 6-ти років' },
    ],
    hero: 'banya-1.jpg',
    subphoto: 'banya-2.jpg',
  },
}

const fadeSlide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function usePreloadImage(src) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(false)
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])
  return loaded
}

export default function Infrastructure() {
  const [active, setActive] = useState('restaurant')
  const data = useMemo(() => CONTENT[active], [active])
  const heroLoaded = usePreloadImage(data?.hero ?? '/placeholder.jpg')

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
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-[20px]">
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[64px] xl:text-[76px] tracking-tighter text-accent font-bold uppercase">
          Інфраструктура
        </h2>

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
                  'px-[14px] py-[8px] border transition text-[12px] uppercase tracking-wide',
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

        <div className="xl:hidden relative w-full md:w-[300px]">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full border border-accent bg-transparent text-accent px-[14px] py-[10px] text-[14px] uppercase tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/30 appearance-none"
          >
            {TABS.map((t) => (
              <option key={t.key} value={t.key} className="text-black">
                {t.label}
              </option>
            ))}
          </select>

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

      <hr className="w-full border-foreground/10 h-[0.5px]" />

      {/* Основний контейнер колонок */}
      <div className="flex flex-col lg:flex-row gap-[20px] w-full items-stretch">
        {/* Ліва колонка */}
        <div className="w-full lg:w-[60%] relative flex">
          <div className="w-full relative flex-1 h-full">
            <AnimatePresence mode="wait">
              {heroLoaded && (
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
                  exit={{ opacity: 0, scale: 0.995, transition: { duration: 0.2 } }}
                >
                  <img
                    src={data.hero}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
            {!heroLoaded && <div className="absolute inset-0 animate-pulse bg-gray-400" />}
          </div>
        </div>

        {/* Права колонка */}
        <div className="w-full lg:w-[40%] flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <div className="bg-[rgb(149_149_149_/_0.1)] p-[20px] flex flex-col justify-between">
              <h3 className="text-[30px] font-semibold text-accent mb-[10px] uppercase tracking-tighter">
                {data?.title ?? '—'}
              </h3>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${active}`}
                  {...fadeSlide}
                  className="text-[14px] font-medium text-foreground max-w-[500px]"
                >
                  {data?.description1 ?? 'Опис скоро з’явиться'}
                </motion.p>
              </AnimatePresence>

              <div className="flex flex-col gap-[4px] mt-[24px] ">
                {data?.metrics?.length > 0 ? (
                  data.metrics.map((m, i) => (
                    <div
                      key={m.k + i}
                      className="flex justify-between border-b border-neutral/20 pb-[4px]"
                    >
                      <span className="text-foreground">{m.k}</span>
                      <span className="text-foreground/60">{m.v}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-foreground/50 text-[14px]"></div>
                )}
              </div>

              <div>
                <CTAButton title="Отримати фінансові розрахунки" />
              </div>
            </div>

            {/* Підфото */}
            <div className="overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] mt-[20px] relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={data?.subphoto ?? '/placeholder.jpg'}
                  alt={`${data?.title ?? ''} secondary`}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.35 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
