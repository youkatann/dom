'use client'

import { useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'
import StickyCursor from '../StickyCursor/stickyCursor'

const CARDS = [
  {
    id: 1,
    title:
      'Реальний прибуток вже з першого місяця одразу після інвестиції – без етапу очікування чи будівництва',
    img: '/img-1.jpg',
  },
  {
    id: 2,
    title:
      'Попит на staycation поруч із Києвом зростає щороку, забезпечуючи постійний потік гостей',
    img: '/img-2.jpg',
  },
  {
    id: 3,
    title:
      'Лісова зона передмістя Києва робить готель унікальним інвестиційним активом',
    img: '/img-3.jpg',
  },
  {
    id: 4,
    title:
      'Стабільний cash-flow та передбачуваний дохід завдяки сформованій базі постійних гостей і високій репутації готелю',
    img: '/img-4.jpg',
  },
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
      {/* Курсор лише на десктопах */}
      <div className="hidden lg:block">
        <StickyCursor targets={cursorTargets} dotSize={10} corner={14} />
      </div>

      <section
        id="Section"
        className="mt-[120px] sm:mt-[200px] lg:mt-[300px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] flex flex-col gap-[40px] sm:gap-[60px] bg-neutral"
      >
        {/* Верхній блок */}
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[40px]">
          <div className="flex-1 text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] uppercase text-accent font-bold text-center lg:text-left">
            Чому ми
          </div>

          <div className="flex-1">
            <p className="font-medium text-[18px] sm:text-[22px] md:text-[26px] tracking-tighter leading-[1.2] text-foreground text-center lg:text-left">
Наш інвест-готель поблизу Києва поєднує стабільність нерухомості та динаміку туристичної галузі. Ми створюємо продукт із прозорою бізнес-моделлю, що зарезпечує дохідність із перших місяців роботи. 
Це інвестиції в готельний бізнес з прогнозованим завантаженням, де кожен інвестор отримує
захист вкладень, сучасну
інфраструктуру та команду з досвідом управління готельними проєктами
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="self-center lg:self-end">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>

        {/* Заголовок перед картками */}
        <div className="mt-[40px] sm:mt-[60px] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] uppercase text-accent font-bold text-center lg:text-left">
          Інвестиційна цінність DOM
        </div>

        {/* Картки */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[16px] sm:gap-[20px] mt-[20px]">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              ref={cardRefs[i]}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative w-full aspect-square rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden cursor-pointer bg-gray-200 flex items-center justify-center"
            >
              {/* Фонова картинка */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.img})` }}
              />

              {/* Блюр і затемнення */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                animate={{ opacity: hovered === i ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Нумерація */}
              <div className="absolute top-3 left-3 text-[18px] sm:text-[22px] md:text-[26px] font-bold text-white drop-shadow">
                ({String(card.id).padStart(2, '0')})
              </div>

              {/* Текст */}
              <motion.p
                className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-medium text-center px-[12px] sm:px-[16px] uppercase drop-shadow"
                animate={{ opacity: hovered === i ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {card.title}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
