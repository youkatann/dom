'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const ITEMS = [
  {
    q: 'Яка логіка розподілення прибутку?',
    a: 'Прибуток розподіляється рівномірно між власниками готельних номерів від загального доходу комплексу, відповідно до площі приміщення',
  },
  {
    q: 'Коли можна очікувати прибуток від інвестицій в готель?',
    a: 'Готель уже працює, тому інвестори починають отримувати прибуток одразу після оформлення права власності. Виплати дивідендів здійснюються раз на квартал – тобто 4 рази на рік, згідно з фактично отриманим чистим прибутком об’єкта',
  },
  {
    q: 'Чи є у вас розтермінування?',
    a: 'Так. Розтермінування можливе до 1 року без відсотків з першим внеском 30%',
  },
  {
    q: 'Скільки днів на рік можна приїжджати інвестору у свій номер?',
    a: 'Керуюча компанія дає 30 бонусних днів на проживання інвесторам в рік, з них 14 днів безкоштовного проживання з виплатами дивідендів та 16 днів на проживання по собівартості без виплат дивідендів + 15% знижка на всі послуги комплексу',
  },
  {
    q: 'Яка у вас бізнес-модель?',
    a: 'Ми працюємо за прозорою моделлю розподілу прибутку: 75% чистого прибутку отримують інвестори; 25% залишається керуючій компанії. У цю частку входять витрати на управління, ремонт номерів та амортизацію. Модель орієнтована на 32% EBIT (прибуток до сплати відсотків і податків), що відображає ефективність роботи об’єкта. Більш детальні фінансові показники можемо надати за запитом',
  },
  {
    q: 'Чи вже завершене будівництво?',
    a: 'Номерний фонд повністю збудований та введений в експлуатацію',
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
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
}

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="Faq"
      className="mt-[80px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] md:py-[60px] bg-neutral 
      flex flex-col gap-[20px] md:flex-row md:flex-wrap"
    >
      {/* Заголовок */}
      <h2 className="text-[32px] sm:text-[48px] md:text-[60px] lg:text-[72px] text-accent font-bold uppercase tracking-tighter 
      flex-[7] text-center lg:text-left">
        Часті запитання
      </h2>

      {/* Кнопка */}
      <div className="flex-[5] flex justify-center md:justify-end mt-[20px] md:mt-0">
        <CTAButton title="Отримати фінансові розрахунки" />
      </div>
<hr className="w-full border-foreground/10 h-[0.5px]" />
      {/* Список */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={listVariants}
        className="mt-[60px] flex flex-col gap-[10px] w-full"
      >
        {ITEMS.map((it, i) => {
          const isOpen = open === i
          return (
            <motion.li
              key={it.q}
              variants={itemVariants}
              className="border-b border-accent"
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
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left"
              >
                <span className="text-[20px] lg:text-[40px] font-medium text-accent tracking-tighter pr-6">
                  {it.q}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="text-[28px] sm:text-[36px] md:text-[48px] font-medium text-accent tracking-tight leading-none"
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
                      transition: {
                        height: { duration: 0.28 },
                        opacity: { duration: 0.2, delay: 0.05 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: { duration: 0.22 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 sm:pb-5 text-[16px] sm:text-[20px] md:text-[24px] leading-[1.55] text-zinc-700">
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
