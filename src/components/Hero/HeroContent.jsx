'use client'

import CTAButton from '../common/CTAButton/ctaButton'

export default function HeroContent() {
  return (
    <>
      {/* TITLE */}
      <h1 className="z-[20] text-neutral uppercase tracking-tighter leading-[0.9] text-center text-[clamp(2.4rem,7vw,3.2rem)] w-full lg:col-start-1 lg:col-end-5 lg:row-start-2">
        Готовий staycation-готель
        <span className="block mt-4 tracking-tighter text-[clamp(1.2rem,3vw,1.6rem)] lg:text-[clamp(1rem,1.8vw,1.75rem)]">
          у 15 хвилинах від Києва
        </span>
      </h1>

      {/* SUBTITLE */}
      <p className="z-[20] text-neutral uppercase tracking-tight leading-[1.2] max-w-[480px] text-center mt-8 text-[clamp(1rem,3.4vw,1rem)] lg:text-left lg:max-w-none lg:col-start-3 lg:row-start-3">
        Safe space для життя і відпочинку поруч зі столицею.
        Надійний актив для інвестора, що працює вже сьогодні
      </p>

      {/* LIST */}
      <ul className="z-[20] text-neutral opacity-80 tracking-tight leading-[1.2] text-center text-[clamp(1rem,3vw,1rem)] mt-8 lg:text-left lg:space-y-0 lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:pl-[20px] lg:text-[clamp(0.75rem,1.1vw,0.95rem)] lg:list-disc">
        <li>Працюючий готельний комплекс</li>
        <li>Повна курортна інфраструктура</li>
        <li>Гарантований викуп</li>
        <li>Repeat-rate більше 90%</li>
      </ul>

      {/* CTA */}
      <div className="z-[20] flex justify-center mt-2 text-neutral lg:col-start-3 lg:row-start-4 lg:justify-start">
        <CTAButton title="Отримати пропозицію" />
      </div>
    </>
  )
}
