'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CTAButton from "../common/CTAButton/ctaButton"

const PARTNERS = [
  {
    id: 1,
    name: "SP8",
    logo: "/sp8.png",
    description:
      "sp8 — це українське виробництво меблів. Компанія створює ексклюзивні меблі та предмети інтер’єру для житлових просторів, офісів і HoReCa, поєднуючи дизайн, майстерність і точність. За сім років роботи команда з 25 фахівців реалізувала понад 180 проєктів і виготовила більше 1200 одиниць меблів на замовлення. У портфоліо sp8 — столи, дивани, крісла, пуфи, стінові панелі, дзеркала, скляні вироби, двері, сходи та вітражі.",
  }
]

export default function Trust() {
  const [activePartner, setActivePartner] = useState(null)

  return (
    <section
      id="Trust"
      className="mb-[100px] sm:mb-[150px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[40px] sm:gap-[60px] relative"
    >
      {/* Верхній рядок */}
      <div className="flex justify-end"></div>

      {/* Заголовок + лого + опис */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[40px] text-center lg:text-left">
        <span className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] tracking-tighter leading-[0.9] font-bold text-accent block">
          ДОСВІДЧЕНА КЕРУЮЧА<br /> КОМПАНІЯ
        </span>

        <img
          src="/Dom_Logo.svg"
          className="w-[100px] sm:w-[120px] mx-auto lg:mx-0 mt-[10px] lg:mt-0"
          alt="DOM Logo"
        />

        <span className="max-w-[600px] text-[16px] sm:text-[18px] text-foreground/50 leading-[1.5] mx-auto lg:mx-0">
          Компанія DOM є сучасним і амбітним оператором у сфері управління
          готельними об'єктами. Створена з метою підвищення рівня сервісу,
          оптимізації операційної діяльності та забезпечення стабільного доходу
          від управління готельним номерним фондом. На даний час керуюча
          компанія DOM успішно функціонує з готелем welcomedom.rest,
          забезпечуючи високий рівень обслуговування та стабільну
          рентабельність.
        </span>
      </div>

      {/* Лінія */}
      <hr className="w-full border-foreground/30" />

      {/* Статистика */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-[20px] sm:gap-[40px] md:gap-[80px] text-[18px] sm:text-[22px] md:text-[28px] leading-[1.2] text-foreground text-center">
        <span>
          <span className="text-accent font-semibold">2 га</span> – площа всього відпочинкового комплексу
        </span>
        <span>
          <span className="text-accent font-semibold">4.5</span> рейтинг Google Maps /{" "}
          <span className="text-accent font-semibold">480</span> відгуків
        </span>
        <span>
          <span className="text-accent font-semibold">4 роки</span> функціонування бізнесу WELCOME DOM
        </span>
      </div>

      {/* Партнери */}
      <div className="flex flex-col items-center gap-[30px] sm:gap-[40px] mt-[20px] sm:mt-[40px]">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-accent text-center">
          Партнери
        </h2>

        <div className="flex justify-center flex-wrap gap-[40px] sm:gap-[60px]">
          {PARTNERS.map((partner) => (
            <motion.button
              key={partner.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActivePartner(partner)}
              className="transition"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-[100px] sm:w-[120px] md:w-[140px] h-auto opacity-80 hover:opacity-100 transition"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Попап */}
      <AnimatePresence>
        {activePartner && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-[16px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePartner(null)}
          >
            <motion.div
              className="bg-neutral p-[24px] sm:p-[40px] rounded-2xl max-w-[90%] sm:max-w-[600px] text-center shadow-lg relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePartner.logo}
                alt={activePartner.name}
                className="w-[80px] sm:w-[100px] md:w-[120px] mx-auto mb-[20px]"
              />
              <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-[20px] text-accent">
                {activePartner.name}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[18px] text-foreground/70 mb-[30px] leading-[1.5]">
                {activePartner.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePartner(null)}
                className="px-[24px] sm:px-[30px] py-[10px] bg-accent text-neutral font-semibold rounded-full hover:bg-accent/80 transition"
              >
                Закрити
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
