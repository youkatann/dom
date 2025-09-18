'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const STATS = [
  { id: 1, value: '65–75%', text: 'Середнє завантаження' },
  { id: 2, value: '$70–90', text: 'Середній чек за ніч' },
  { id: 3, value: '9–13% річних', text: 'Очікувана рентабельність' },
  { id: 4, value: 'від 7 до 9 років', text: 'Окупність' },
]

export default function Stats() {
  const [active, setActive] = useState(null)

  return (
    <section className="relative min-h-screen px-[20px] py-[60px] bg-neutral flex flex-col gap-[40px]">
      {/* Заголовок */}
      <h2 className="text-accent text-[72px] font-bold tracking-tighter mb-[72px]">
        ФІНАНСОВИЙ ПОТЕНЦІАЛ
      </h2>

      {/* Картки у 2 ряди по 2 */}
      <div className="grid grid-cols-2 grid-rows-2 gap-[20px] flex-1">
        {STATS.map((card, i) => {
          const isActive = i === active
          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={[
                'rounded-[24px] flex flex-col justify-between gap-[24px] p-[32px]',
                'transition-colors duration-300',
                isActive
                  ? 'bg-accent text-neutral'
                  : 'bg-[rgb(149_149_149_/_0.1)] text-accent',
              ].join(' ')}
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <span className="text-[64px] font-bold tracking-tighter leading-[0.9]">
                {card.value}
              </span>
              <p className="text-[22px] uppercase text-black tracking-tighter leading-[1.2]">
                {card.text}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Нижній блок */}
      <div className="flex justify-between items-start">
        {/* Ліворуч текст */}
        <p className="text-[20px] text-accent max-w-[500px] tracking-tigher leading-[1.2] uppercase">
          DOM HOTEL – це готель, який працює круглорічно. Ми поєднуємо затишок, близькість до Києва і якісне управління, що забезпечує стабільне завантаження і прозору окупність.
        </p>

        {/* Праворуч кнопка */}
        <div className="w-fit">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>
      </div>
    </section>
  )
}
