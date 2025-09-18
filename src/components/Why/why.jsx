'use client'

import { useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'
import StickyCursor from '../StickyCursor/stickyCursor'

const CARDS = [
  { id: 1, title: 'Реальний прибуток вже з першого місяця одразу після інвестиції – без етапу очікування чи будівництва', img: '/img-1.jpg' },
  { id: 2, title: 'Попит на staycation поруч із Києвом зростає щороку, забезпечуючи постійний потік гостей', img: '/img-2.jpg' },
  { id: 3, title: 'Лісова зона передмістя Києва робить готель унікальним інвестиційним активом', img: '/img-3.jpg' },
  { id: 4, title: 'Стабільний cash-flow та передбачуваний дохід завдяки сформованій базі постійних гостей і високій репутації готелю', img: '/img-4.jpg' },
]

export default function Why() {
  const [hovered, setHovered] = useState(null)
  const cardRefs = CARDS.map(() => useRef(null))

  const cursorTargets = useMemo(
    () =>
      cardRefs.map((ref) => ({
        ref,
        render: () => (
          <div className="px-3 py-1 text-xs font-medium rounded-full bg-black/80 text-white">
            обрати
          </div>
        ),
      })),
    [cardRefs]
  )

  return (
    <>
      <StickyCursor targets={cursorTargets} dotSize={10} corner={14} />

      <section className="mt-[300px] p-[20px] flex flex-col gap-[60px] bg-neutral">
        {/* Верхній блок */}
        <div className="flex flex-col lg:flex-row gap-[40px]">
          <div className="flex-1 text-[72px] uppercase text-accent font-bold">
            Чому ми
          </div>

          <div className="flex-1">
            <p className="font-medium text-[28px] tracking-tighter leading-[0.9] text-foreground">
              Наш інвест-готель поєднує стабільність нерухомості та динаміку
              туристичної галузі. Ми створюємо продукт із прозорою
              бізнес-моделлю, що забезпечує дохідність із перших місяців роботи.
              Кожен інвестор отримує захист вкладень, сучасну інфраструктуру та
              команду з досвідом управління готельними проєктами
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="self-end">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>

        {/* Заголовок перед картками */}
                  <div className="mt-[72px] flex-1 text-[72px] uppercase text-accent font-bold">
            Інвестиційна цінність DOM
          </div>

        {/* Квадратні картки */}
        <div className="flex flex-wrap gap-[20px]">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              ref={cardRefs[i]}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative w-[calc(25%-15px)] aspect-square rounded-[24px] overflow-hidden cursor-pointer bg-[rgb(149_149_149_/_0.1)] flex items-center justify-center"
            >
              {/* Нумерація */}
              <div className="absolute top-3 left-3 text-[28px] font-bold text-foreground">
                ({String(card.id).padStart(2, '0')})
              </div>

              {/* Текст */}
              <motion.p
                className="text-accent text-[20px] font-medium text-center px-4 uppercase"
                animate={{ opacity: hovered === i ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {card.title}
              </motion.p>

              {/* Фото */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.img})` }}
                initial={false}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  scale: hovered === i ? 1 : 1.05,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
