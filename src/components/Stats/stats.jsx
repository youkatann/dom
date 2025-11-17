'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const STATS = [
  { id: 1, value: '65%', text: 'Середнє завантаження' },
  { id: 2, value: '8–13%', text: 'Очікувана рентабельність' },
  { id: 3, value: '7–12 років', text: 'Окупність' },
]

export default function Stats() {
  const [active, setActive] = useState(null)

  return (
    <section
      id="Stats"
      className="relative px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[32px] sm:gap-[40px]"
    >
      {/* Заголовок */}
      <h2 className="text-accent text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold tracking-tighter text-center sm:text-left">
        ФІНАНСОВИЙ ПОТЕНЦІАЛ
      </h2>

      {/* Картки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[20px]">
        {STATS.map((card, i) => {
          const isActive = i === active
          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={[
                'rounded-[16px] sm:rounded-[20px] flex flex-col justify-between p-[20px] sm:p-[24px] min-h-[160px] sm:min-h-[200px] md:min-h-[220px]',
                'transition-colors duration-300',
                isActive
                  ? 'bg-accent text-neutral'
                  : 'bg-[rgb(149_149_149_/_0.1)] text-accent',
              ].join(' ')}
              animate={{ scale: isActive ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <span className="text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-tighter leading-[1]">
                {card.value}
              </span>
              <p className="text-[16px] sm:text-[18px] uppercase text-black tracking-tighter leading-[1.2]">
                {card.text}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Нижній блок */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-[40px] sm:mt-[60px] gap-[24px] sm:gap-0">
        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-accent max-w-[500px] tracking-tighter leading-[1.3] uppercase text-center md:text-left">
          DOM HOTEL – це готель, який працює круглорічно. Ми поєднуємо затишок,
          близькість до Києва і якісне управління, що забезпечує стабільне
          завантаження і прозору окупність.
        </p>

        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>
      </div>
    </section>
  )
}
