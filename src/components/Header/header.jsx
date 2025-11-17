'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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

/* ===== Body.jsx ===== */
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
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link
            key={`l_${index}`}
            href={href}
            className="uppercase no-underline text-black"
            onClick={onLinkClick}
          >
            <motion.p
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index != index
                  ? 'open'
                  : 'closed'
              }
              className="m-0 flex overflow-hidden pr-[30px] pt-[10px] text-[32px] font-light lg:pr-[2vw] lg:text-[5vw]"
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}

/* ===== Image.jsx ===== */
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

/* ===== Footer.jsx ===== */
function Footer() {
  return (
    <div className="mt-10 flex flex-wrap items-end text-[12px] uppercase lg:justify-between">
      <ul className="mt-2.5 w-1/2 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span className="text-[#9f9689]">Made by:</span> All We Are
        </motion.li>
      </ul>
      <ul className="mt-2.5 w-1/2 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span className="text-[#9f9689]">Contacts:</span> +380901234567
        </motion.li>
      </ul>
      <ul className="mt-2.5 w-1/2 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span className="text-[#9f9689]">Adress:</span> Adress Line 1, Kyiv Region, Ukraine
        </motion.li>
      </ul>
      <ul className="mt-2.5 w-1/2 overflow-hidden list-none p-0 lg:w-auto">
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          Privacy Policy
        </motion.li>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          Terms &amp; Conditions
        </motion.li>
      </ul>
    </div>
  );
}

/* ===== Nav wrapper (Body + Image + Footer) ===== */
function Nav({ onClose }) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  const links = [
    { title: 'Чому', href: '/#Section', src: 'img-1.jpg' },
    { title: 'Проєкт', href: '/#Project', src: 'img-2.jpg' },
    { title: 'Потенціал', href: '/#Stats', src: 'img-3.jpg' },
    { title: 'Фонд', href: '/#Rooms', src: 'img-4.jpg' },
    { title: 'Інфраструктура', href: '/#Infrastructure', src: 'img-5.jpg' },
    { title: 'Гарантії', href: '/#Reviews', src: 'img-6.jpg' },
    { title: 'Довіра', href: '/#Trust', src: 'img-7.jpg' },
    { title: 'FAQ', href: '/#Faq', src: 'img-9.jpg' },
  ];

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit">
      <div className="flex items-start justify-between gap-10">
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

/* ===== Header.jsx ===== */
export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');

  useEffect(() => {
    let lastY = window.scrollY;
    let timeout;

    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentY = window.scrollY;
        if (Math.abs(currentY - lastY) < 5) return;
        if (currentY > lastY && currentY > 50) setScrollDir('down');
        else if (currentY < lastY) setScrollDir('up');
        lastY = currentY;
      }, 120);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: scrollDir === 'down' ? '-100%' : '0%' }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="fixed left-0 top-0 box-border w-full bg-neutral border-b border-black p-[10px] sm:p-5 z-[10]"
    >
      <div className="relative flex justify-between items-center text-[12px] font-normal uppercase sm:text-[15px]">
        <Link href="/" className="text-black no-underline">
<svg className="w-[48px] h-[48px]" xmlns="http://www.w3.org/2000/svg" width="73" height="79" viewBox="0 0 73 79" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M47.1157 10.0548C43.8554 10.3803 41.2543 11.6247 38.8727 13.9985C36.5482 16.3153 35.3045 18.5722 34.6262 21.7046C34.2919 23.2484 34.2929 26.1727 34.6284 27.737C35.0601 29.75 35.771 31.4797 36.8422 33.123C37.6014 34.2876 39.7614 36.4423 40.9397 37.2104C43.2278 38.7019 45.615 39.4048 48.3928 39.4048C51.2806 39.4048 53.6483 38.681 56.0674 37.0588C57.1412 36.3387 59.133 34.3368 59.8862 33.2206C60.9522 31.6408 61.8174 29.5399 62.2141 27.5679C62.4925 26.1841 62.4656 23.0364 62.1634 21.6343C61.5395 18.7395 60.2654 16.3997 58.0729 14.1223C56.5291 12.5188 54.9531 11.4973 52.9108 10.7768C51.1282 10.148 48.9277 9.87381 47.1157 10.0548ZM49.5175 13.025C52.0213 13.3317 54.1687 14.3814 56.0941 16.2393C58.2112 18.2824 59.5052 21.4961 59.5089 24.7208C59.5126 27.8713 58.2095 31.1411 56.097 33.2822C55.6106 33.7751 55.1681 34.1784 55.1136 34.1784C55.0592 34.1784 54.698 34.3924 54.3109 34.654C50.7726 37.045 46.1447 37.0705 42.587 34.7186C42.1811 34.4503 41.7946 34.2076 41.7277 34.1791C41.3256 34.0077 40.3751 33.0023 39.7203 32.0557C37.9939 29.56 37.2903 27.435 37.2916 24.7208C37.2932 21.4653 38.5097 18.4563 40.7244 16.2302C42.462 14.4838 44.7965 13.3228 47.1659 13.0268C48.1913 12.8988 48.486 12.8985 49.5175 13.025ZM10 43.5281V57.2857H15.2011C21.7139 57.2857 22.0415 57.2411 24.5752 56.0109C26.5467 55.0535 28.174 53.6797 29.6049 51.7645C31.072 49.8009 31.7963 47.7754 32.0911 44.8119C32.2262 43.4541 32.1572 42.2311 31.8632 40.7732C31.7499 40.2109 31.6185 39.535 31.5713 39.2714C31.4026 38.3275 30.4688 36.4283 29.5634 35.1874C28.9558 34.3546 27.1388 32.6476 26.1635 31.9933C25.4079 31.4863 23.6726 30.6242 22.88 30.362C21.38 29.8657 21.1751 29.8504 15.4445 29.8094L10 29.7705V43.5281ZM21.502 33.0465C22.4243 33.3053 24.3037 34.2077 25.0287 34.7399C25.6808 35.2186 26.8519 36.4659 27.3816 37.2458C28.0154 38.1791 28.6828 39.6534 28.9888 40.796C29.2247 41.6765 29.2573 41.9967 29.2624 43.4827C29.2673 44.8978 29.2318 45.3141 29.0423 46.0652C28.4445 48.4351 27.2857 50.3954 25.7036 51.7134C24.3533 52.8383 22.9621 53.6333 21.6559 54.0267C20.9284 54.2458 20.6859 54.2596 16.9271 54.2956L12.9651 54.3336V43.5327V32.7319L16.8248 32.7745C20.44 32.8145 20.7364 32.8317 21.502 33.0465ZM35.2544 43.3799V44.8108L45.0344 44.8369L54.8144 44.863L51.757 46.2318C50.0753 46.9847 48.6535 47.6349 48.5973 47.6769C48.4772 47.7663 40.8679 51.1607 40.4177 51.3257C40.249 51.3874 38.9712 51.9554 37.578 52.5877L35.045 53.7373L35.073 55.3774L35.101 57.0175L36.8903 57.8207C37.8744 58.2625 39.2603 58.898 39.9702 59.2329C40.68 59.5678 41.3133 59.8418 41.3775 59.8418C41.4995 59.8418 47.762 62.6326 49.0063 63.2414C49.3999 63.4341 50.7937 64.0707 52.1036 64.6562L54.485 65.7209L44.8698 65.7469L35.2544 65.773V67.2039V68.6348H48.5462H61.8379V67.2161V65.7973L60.2787 65.1049C59.4211 64.7242 58.1904 64.1618 57.5437 63.8555C56.0631 63.1539 48.6916 59.8418 48.6109 59.8418C48.5403 59.8418 40.8141 56.3689 39.56 55.7734L38.7023 55.3663L39.6111 54.9358C41.3757 54.1002 47.7487 51.2533 47.8548 51.2533C47.914 51.2533 48.3049 51.0886 48.7235 50.8872C49.142 50.6859 51.1023 49.7917 53.0796 48.9002C55.0568 48.0086 57.8249 46.7531 59.2307 46.1102L61.7868 44.9412L61.8151 43.4451L61.8434 41.949H48.5489H35.2544V43.3799Z" fill="#000000" /> </svg>
        </Link>

        <div onClick={() => setIsActive(!isActive)} className="el flex cursor-pointer items-center justify-center gap-2">
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
            <div className="relative ml-2">
              <motion.p variants={opacity} animate={!isActive ? 'open' : 'closed'} className="m-0">
                МЕНЮ
              </motion.p>
              <motion.p variants={opacity} animate={isActive ? 'open' : 'closed'} className="absolute top-0 -left-[10px] m-0 opacity-0">
                Закрити
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={background} initial="initial" animate={isActive ? 'open' : 'closed'} className="absolute left-0 top-full h-full w-full bg-black/50" />

      <AnimatePresence mode="wait">
        {isActive && <Nav onClose={() => setIsActive(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
