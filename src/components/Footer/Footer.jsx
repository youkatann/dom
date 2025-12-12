'use client'
import React, { useState, useId } from 'react'
import { ArrowUpRight, FacebookIcon, InstagramIcon, PhoneIcon, SendIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import CTAButton from '../common/CTAButton/ctaButton'

const WAVE_REST = `
  M 0 1.05
  C 0.25 1.0, 0.75 1.1, 1 1.05
  L 1 1.2
  L 0 1.2
  Z
`

const WAVE_HOVER = `
  M 0 0.05
  C 0.25 0.0, 0.75 0.1, 1 0.05
  L 1 1.2
  L 0 1.2
  Z
`

function FooterMenuItem({ href, label }) {
  const [isHovered, setIsHovered] = useState(false)
  const maskId = useId()

  return (
    <div
      className="flex relative isolate items-center w-full text-neutral border-t border-neutral/10 py-4 px-2 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} className="text-sm md:text-base">
        {label}
      </a>

      <motion.div
        className="ml-2 w-6 h-6 text-neutral relative z-10 flex items-center justify-center origin-center"
        initial={false}
        animate={isHovered ? 'hover' : 'rest'}
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 45 },
        }}
        transition={{
          type: 'spring',
          stiffness: 90,
          damping: 12,
          mass: 0.4,
        }}
      >
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.div>

      <svg className="absolute inset-0 w-full h-full z-[-1] pointer-events-none">
        <defs>
          <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="black" />
            <motion.path
              fill="white"
              variants={{
                rest: { d: WAVE_REST },
                hover: { d: WAVE_HOVER },
              }}
              initial="rest"
              animate={isHovered ? 'hover' : 'rest'}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
                repeat: isHovered ? Infinity : 0,
                repeatType: 'mirror',
              }}
            />
          </mask>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="#FF5C28" mask={`url(#${maskId})`} />
      </svg>
    </div>
  )
}

export default function Footer() {
  return (
    <div className="relative w-full bg-black text-neutral">
      {/* Wrapper with extra height to allow full scrolling */}
      <div className="relative min-h-[120vh] md:min-h-[100vh]">
        <div className="sticky top-0 w-full bg-black">
          <div className="flex flex-col justify-between pt-[120px] px-4 md:px-8 lg:px-16 min-h-screen">
            {/* Main grid: responsive columns */}
            <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* LEFT */}
              <div className="md:w-1/3 w-full flex flex-col justify-between border-b md:border-b-0 border-neutral/10 pb-6 md:pb-0">
                <div className="flex gap-4 items-start">
                  <div className="bg-neutral rounded-full p-2 flex w-fit h-fit items-center justify-center shrink-0 grow-0">
                    <img src="/Dom_Logo_Orange.svg" alt="Logo" className="h-8 w-auto" />
                  </div>
                  <p className="text-base md:text-[20px] leading-tight">
                    <span className="text-[18px] md:text-[20px]">DOM INVEST – </span>
                    <span className="hidden md:inline">
                      сучасний і амбітний оператор у сфері управління готельними об'єктами
                    </span>
                    <span className="md:hidden">сучасний оператор готельних послуг</span>
                  </p>
                </div>

                <div className="mt-12 opacity-80 text-sm md:text-base">
                  <span className="block">вул. Кільцева, 7, Проліски</span>
                  <span className="block mt-1">welcomedominvest@gmail.com</span>

                  <div className="flex gap-4 mt-4">
                    <a href="https://www.facebook.com/welcome.dom.rest">
                      <FacebookIcon />
                    </a>
                    <a href="https://www.instagram.com/welcome.dom/">
                      <InstagramIcon />
                    </a>
                    <a href="https://t.me/dom_hotel">
                      <SendIcon />
                    </a>
                    <a href="https://wa.me/380632506638">
                      <PhoneIcon />
                    </a>
                  </div>
                </div>
              </div>

              {/* MIDDLE NAV */}
              <div className="md:w-1/3 w-full border-b md:border-l md:border-r border-neutral/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                  <FooterMenuItem label="Чому" href="#Section" />
                  <FooterMenuItem label="Проєкт" href="#Project" />
                  <FooterMenuItem label="Потенціал" href="#Stats" />
                  <FooterMenuItem label="Фонд" href="#Rooms" />
                  <FooterMenuItem label="Інфраструктура" href="#Infrastructure" />
                  <FooterMenuItem label="Гарантії" href="#Reviews" />
                  <FooterMenuItem label="Довіра" href="#Trust" />
                  <FooterMenuItem label="FAQ" href="#Faq" />
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:w-1/3 w-full flex flex-col justify-between border-b border-neutral/10 pb-6 md:pb-4">
                <div>
                  <span className="text-base md:text-[20px] font-medium">Готові інвестувати?</span>
                  <p className="opacity-80 mt-4 text-sm md:text-base">
                    Компанія DOM є сучасним і амбітним оператором у сфері управління готельними об'єктами. Створена з метою підвищення рівня сервісу, оптимізації операційної діяльності та забезпечення стабільного доходу від управління готельним номерним фондом.
                  </p>

                  <div className="mt-6">
                    <CTAButton title="Отримати пропозицію" />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between text-[10px] md:text-[12px] tracking-tighter opacity-80 mt-6 md:mt-12">
                  <span>©2025 Dom Invest. All rights reserved</span>
                  <a className="mt-2 md:mt-0" href="https://welcomedom.rest/wp-content/uploads/2025/05/Публічна_оферта_договір_про_надання_послуг_з_тимчасового_розміщення.pdf">
                    Публічна оферта
                  </a>
                </div>
              </div>
            </div>

            {/* Big responsive title */}
            <div className="w-full justify-start mt-8 hidden md:flex">
              <span className='hidden lg:block text-[200px] text-neutral -tracking-[0.08em] leading-[0.8] font-black mb-[50px]'>DOM INVEST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
