'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const ITEMS = [
  {
    q: 'Де розташований комплекс? ',
    a: 'Комплекс розташований у 15 хв від Києва за вул. Промислова, 7, Проліски, Київська область. ',
  },
  {
    q: 'Яка логіка розподілення прибутку?',
    a: 'Прибуток розподіляється рівномірно між власниками готельних номерів від загального доходу комплексу, відповідно до площі приміщення',
  },
  {
    q: 'Коли можна очікувати прибуток від інвестицій в готель?',
    a: 'Готель уже працює, тому інвестори починають отримувати прибуток одразу після оформлення права власності.',
  },
  {
    q: 'Чи є у вас розтермінування?',
    a: 'Так. Розтермінування можливе до 1 року від забудовника без відсотків з першим внеском 30%.',
  },
  ,
  {
    q: 'Скільки днів на рік можна приїжджати інвестору у свій номер? ',
    a: 'Керуюча компанія дає 30 бонусних днів на проживання інвесторам в рік, з них 14 днів безкоштовного проживання з виплатами дивідендів та 16 днів на проживання по собівартості без виплат дивідендів + 15% знижка на всі послуги комплексу.',
  },
  ,
  {
    q: 'Яка у вас бізнес-модель? ',
    a: '75% дивідендів від чистого прибутку ми віддаємо інвесторам, решту 25% бере керуюча компанія (в 25% входить ремонт номерів та амортизація).',
  },
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

export default function FAQ() {
  const [open, setOpen] = useState(null) // index | null

  return (
    <section className="mt-[300px] p-[20px] grid grid-cols-12 gap-[20px] grid-rows-[repeat(6,156px)] bg-neutral">
      <h2 className="row-start-1 col-start-1 col-end-8 text-[72px] text-accent font-bold uppercase">Відповіді на питання</h2>

      <div className="row-start-1 col-start-9 col-end-13 flex justify-end">
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
                    <div className="pb-5 pr-0 pl-0 md:pr-20 text-[24px] leading-[1.55] text-zinc-700">
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
