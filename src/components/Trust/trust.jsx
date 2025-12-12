'use client'

import { motion } from "framer-motion"
import CTAButton from "../common/CTAButton/ctaButton"

const PARTNER = {
  id: 1,
  name: "SP8",
  logo: "/sp8.png",
  description:
    "sp8 — це українське виробництво меблів. Компанія створює ексклюзивні меблі та предмети інтер’єру для житлових просторів, офісів і HoReCa, поєднуючи дизайн, майстерність і точність. За сім років роботи команда з 25 фахівців реалізувала понад 180 проєктів і виготовила більше 1200 одиниць меблів на замовлення. У портфоліо sp8 — столи, дивани, крісла, пуфи, стінові панелі, дзеркала, скляні вироби, двері, сходи та вітражі.",
}

export default function Trust() {
  return (
    <section
      id="Trust"
      className="mb-[100px] sm:mb-[150px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[40px] sm:gap-[60px] relative"
    >
      {/* Заголовок + лого + опис */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] lg:gap-[40px] text-center lg:text-left">
        <span className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] tracking-tighter leading-[0.9] font-bold text-accent block">
          ДОСВІДЧЕНА КЕРУЮЧА<br /> КОМПАНІЯ
        </span>

        <img
          src="/Dom_Logo_Orange.svg"
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

      <hr className="w-full border-foreground/10 h-[0.5px]" />

      {/* Статистика */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-[20px] sm:gap-[40px] md:gap-[80px] text-[18px] sm:text-[22px] md:text-[28px] leading-[1.2] text-foreground text-center">
        <span>
          <span className="text-accent font-semibold">2 га</span> – площа всього відпочинкового комплексу
        </span>
        <span>
          <a href="https://www.google.com/travel/hotels/s/x2GbXbk2k2hV1n9X6">
            <span className="text-accent font-semibold">4.5</span> рейтинг Google Maps /{" "}
            <span className="text-accent font-semibold">480</span> відгуків
          </a>
        </span>
        <span>
          <span className="text-accent font-semibold">4 роки</span> функціонування бізнесу WELCOME DOM
        </span>
      </div>

      {/* Партнери */}
      <div className="flex flex-col gap-[30px] sm:gap-[40px] mt-[20px] sm:mt-[40px]">
        <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-accent uppercase tracking-tighter text-center lg:text-left">
          Партнери
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-[24px] sm:p-[40px] max-w-[800px] mt-[20px] bg-[rgb(149_149_149_/_0.1)] mx-auto lg:mx-0"
        >
          <img
            src={PARTNER.logo}
            alt={PARTNER.name}
            className="w-[80px] sm:w-[100px] md:w-[120px] mx-auto mb-[20px]"
          />
          <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-[20px] text-accent text-center lg:text-left">
            {PARTNER.name}
          </h3>
          <p className="text-[15px] sm:text-[16px] md:text-[18px] text-foreground/70 leading-[1.5] text-center lg:text-left">
            {PARTNER.description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
