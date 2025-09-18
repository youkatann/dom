'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const ITEMS = [
  {
    q: 'Управління',
    a: 'Виплати проводяться щомісяця за узгодженим графіком. Доступні банківський переказ або інвойс із відтермінуванням до 10 днів.',
  },
  {
    q: 'Виплати',
    a: 'Ми надаємо рекомендовані шаблони звітності. Остаточне декларування — відповідальність платника.',
  },
  {
    q: 'Продаж частки',
    a: 'Передбачений call/put механізм. Оцінка базується на погодженій формулі EBITDA × мультиплікатор.',
  },
  {
    q: 'Податки',
    a: 'Є сервісні рівні з фінансовими штрафами за порушення SLA. Деталі у договорі.',
  }
]

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28 } },
}

export default function Security() {
  const [open, setOpen] = useState(null) // index | null

  return (
    <section className="mt-[300px] p-[20px] grid grid-cols-12 gap-[20px] grid-rows-[repeat(6,156px)] bg-neutral">
      <h2 className="row-start-1 col-start-1 col-end-8 text-[78px] text-accent">(Гарантії безпеки)</h2>

      <div className="row-start-1 col-start-10 col-end-13 flex justify-end">
        <div className="w-fit">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>
      </div>

      <div className="row-start-2 row-end-3 col-start-1 col-end-4 flex items-end">
        <p className="text-[18px] font-medium leading-[1.2] tracking-tighter uppercase">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </p>
      </div>

      {/* Список з staggered animation */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={listVariants}
        className="col-start-1 col-end-13 row-start-4 row-end-[9] flex flex-col"
      >
        {ITEMS.map((it, i) => {
          const isOpen = open === i
          return (
            <motion.li
              key={it.q}
              variants={itemVariants}
              className={[
                'border-b border-accent',
                i === ITEMS.length - 1 ? 'border-b' : '',
                'border-accent',
              ].join(' ')}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(isOpen ? null : i)
                  }
                }}
                aria-expanded={isOpen}
                className="w-full py-5 flex items-center justify-between text-left"
              >
                <span className="text-[48px] font-medium text-accent tracking-tight">{it.q}</span>
                <span className="text-[28px] font-medium text-foreground/20 tracking-tight">{it.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="text-[48px] font-medium text-accent tracking-tight leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: { height: { duration: 0.28 }, opacity: { duration: 0.2, delay: 0.05 } },
                    }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.22 } }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pr-0 pl-0 md:pr-20 text-[18px] leading-[1.55] text-zinc-700">
                      {it.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}
