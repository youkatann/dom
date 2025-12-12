'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== anim.js ===== */
const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } },
};

const height = {
  initial: { height: 0 },
  enter: { height: 'auto', transition },
  exit: { height: 0, transition },
};

const background = {
  initial: { height: 0 },
  open: { height: '100vh', transition },
  closed: { height: 0, transition },
};

const blur = {
  initial: { filter: 'blur(0px)', opacity: 1 },
  open: { filter: 'blur(4px)', opacity: 0.6, transition: { duration: 0.3 } },
  closed: { filter: 'blur(0px)', opacity: 1, transition: { duration: 0.3 } },
};

const translate = {
  initial: { y: '100%', opacity: 0 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] },
  }),
  exit: (i) => ({
    y: '100%',
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] },
  }),
};

/* ===== Body Component ===== */
function Body({ links, selectedLink, setSelectedLink, onLinkClick }) {
  const getChars = (word) =>
    word.split('').map((char, i) => (
      <motion.span
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
        className="inline-block"
      >
        {char}
      </motion.span>
    ));

  return (
    <div className="mt-10 flex flex-wrap lg:mt-20 lg:max-w-[1200px]">
      {links.map((link, index) => (
        <Link
          key={`l_${index}`}
          href={link.href}
          className="uppercase no-underline text-black"
          onClick={onLinkClick}
        >
          <motion.p
            onMouseOver={() => setSelectedLink({ isActive: true, index })}
            onMouseLeave={() => setSelectedLink({ isActive: false, index })}
            variants={blur}
            animate={
              selectedLink.isActive && selectedLink.index !== index
                ? 'open'
                : 'closed'
            }
            className="m-0 flex overflow-hidden pr-[30px] pt-[10px] text-[32px] font-light lg:pr-[2vw] lg:text-[5vw]"
          >
            {getChars(link.title)}
          </motion.p>
        </Link>
      ))}
    </div>
  );
}

/* ===== ImagePane Component ===== */
function ImagePane({ src, isActive }) {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? 'open' : 'closed'}
      className="relative hidden h-[450px] w-[500px] lg:block"
    >
      <Image
        src={`/images/${src}`}
        alt="image"
        fill
        className="object-cover"
        priority
      />
    </motion.div>
  );
}

/* ===== Footer Component ===== */
function Footer() {
  return (
    <div className="mt-10 flex flex-col gap-2 text-[12px] uppercase lg:flex-row lg:justify-between lg:items-end">
      <ul className="list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
        >
          <span className="text-[#9f9689]">Контакт:</span> +380632506638
        </motion.li>
      </ul>

      <ul className="list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
        >
          <span className="text-[#9f9689]">Адреса:</span> вул. Кільцева, 7, Проліски, Київська обл.
        </motion.li>
      </ul>

      <ul className="list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
        >
          <a
            href="https://welcomedom.rest/wp-content/uploads/2025/05/Публічна_оферта_договір_про_надання_послуг_з_тимчасового_розміщення.pdf"
            className="underline hover:text-[#FFEBD8]"
          >
            Публічна оферта
          </a>
        </motion.li>
      </ul>
    </div>
  );
}

/* ===== Nav Component ===== */
function Nav({ onClose }) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  const links = [
    { title: 'Чому', href: '/#Section', src: 'menu-1.png' },
    { title: 'Проєкт', href: '/#Project', src: 'menu-2.jpg' },
    { title: 'Потенціал', href: '/#Stats', src: 'menu-3.jpg' },
    { title: 'Фонд', href: '/#Rooms', src: 'menu-4.jpg' },
    { title: 'Інфраструктура', href: '/#Infrastructure', src: 'menu-5.jpg' },
    { title: 'Гарантії', href: '/#Reviews', src: 'menu-6.jpg' },
    { title: 'Довіра', href: '/#Trust', src: 'menu-7.jpg' },
    { title: 'FAQ', href: '/#Faq', src: 'menu-8.jpg' },
  ];

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
        <div className="flex-1">
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            onLinkClick={onClose}
          />
          <Footer />
        </div>
        <ImagePane src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
      </div>
    </motion.div>
  );
}

/* ===== Header Component ===== */
export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full bg-neutral px-[16px] sm:px-[24px] md:px-[40px] sm:p-5 z-[10] border-b border-black"
    >
      <div className="relative flex justify-between items-center text-[12px] font-normal uppercase sm:text-[15px]">
        <Link href="/" className="text-black no-underline">
          <img src="/Dom_Logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>
        <div
          onClick={() => setIsActive(!isActive)}
          className="el flex cursor-pointer items-center justify-center gap-2 p-4"
        >
          <div className="label relative flex items-center">
            <div className="pointer-events-none relative w-[22.5px]">
              <span
                className={[
                  'block h-px w-full bg-black transition-[transform,top] duration-1000',
                  isActive ? 'relative top-[-1px] rotate-45' : 'relative top-[-4px] rotate-0',
                ].join(' ')}
              />
              <span
                className={[
                  'block h-px w-full bg-black transition-[transform,top] duration-1000',
                  isActive ? 'relative top-[1px] -rotate-45' : 'relative top-[4px] rotate-0',
                ].join(' ')}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className="absolute left-0 top-full h-full w-full bg-black/50"
      />

      <AnimatePresence mode="wait">
        {isActive && <Nav onClose={() => setIsActive(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
