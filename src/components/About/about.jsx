'use client'
import { motion } from 'framer-motion'
import { useState, useId } from "react"

const REVIEWS = [
  {
    name: "Маша Рева",
    avatar: "/avatars/masha-reva.jpg",
    text: "Пару днів перезавантаження не в звичній рутині і вже дивишся на все свіжим поглядом. Дуже раджу, поки гарна погода, і загалом навіть швидкий відпочинок - це, по-перше, відпочинок. 35 хвилин на машині від центру Києва - і ви вже біля басейну в оточенні лісу",
    instagram: "https://www.instagram.com/mashareva/"
  },
  {
    name: "Наталія Татарінцева",
    avatar: "/avatars/tatarintseva.jpg",
    text: "Хотілось би нам провести більше часу в @welcome.dom ніж пів доби. Але ми обов'язково повернемося ще, адже нам було комфортно, смачно і головне є укриття",
    instagram: "https://www.instagram.com/tatarintseva.kot/"
  },
  {
    name: "Ірина Юріївна",
    avatar: "/avatars/irina-yurievna.jpg",
    text: "Найкраще місце для мене, для того щоб перезавантажитись або втекти від усіх) Неймовірна природа, класний сервіс, смачна їжа - що ще треба",
    instagram: "https://www.instagram.com/irina_yurievna_k/"
  },
  {
    name: "Валерія Чернецька",
    avatar: "/avatars/chernetska.jpg",
    text: "Мені у вас так добре, так смачно, так затишно і я така щаслива, аж бракує слів. Відкрила для себе нове прекрасне місце під Києвом!",
    instagram: "https://www.instagram.com/chernetskav/"
  },
  {
    name: "Роксолана Величковська",
    avatar: "/avatars/roksolana.jpg",
    text: "Дуже сподобалось в @welcome.dom. Рекомендую відвідати",
    instagram: "https://www.instagram.com/velichkovskayaa/"
  }
]

function LiquidCard({ item, i }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      key={i}
      className="relative p-[20px] flex flex-col gap-[16px] border-[0.5px] border-foreground/10 min-h-[450px] overflow-hidden isolate cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        backgroundColor: isHovered ? "#FF3E00" : "#FFEBD8",
        color: isHovered ? "#FFEBD8" : "#000000",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Контент */}
      <div className="flex items-center gap-[12px] relative z-10">
        <div className="w-[52px] h-[52px] rounded-full border-[1px] border-accent overflow-hidden flex-shrink-0">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="font-semibold text-[18px]" style={{ color: "inherit" }}>
          {item.name}
        </p>
      </div>

      <p
        className="leading-[1.4] text-[15px] relative z-10"
        style={{ color: "inherit" }}
      >
        {item.text}
      </p>

      <motion.a
        href={item.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:underline mt-auto relative z-10"
        initial={false}
        animate={{
          color: isHovered ? "#FFEBD8" : "#FF3E00",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        Перейти в Instagram →
      </motion.a>
    </motion.div>
  )
}



/* хвильові path-и ті самі, що у футері */
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


export default function About() {
  return (
    <section
      id="Reviews"
      className="py-[40px] sm:py-[60px] 
      bg-neutral flex flex-col gap-[40px] px-[16px] sm:px-[24px] md:px-[40px] min-h-screen"
    >
      <h2
        className="font-bold uppercase tracking-tighter text-[#FF4F19]
        text-[32px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.1] text-center lg:text-left"
      >
        Відгуки гостей DOM
      </h2>
      <hr className="w-full border-foreground/10 h-[0.5px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((item, i) => (
          <LiquidCard key={i} item={item} i={i} />
        ))}
      </div>

      <div className="flex justify-center pt-[10px]">
      <div
        className="py-[0px] md:py-[12px] px-[0px] md:px-[16px] text-[12px] md:text-[16px] flex justify-center items-center font-bold uppercase relative group cursor-pointer leading-[1]"
      >
        <span className="flex items-center gap-2">
          <span className="text-[24px] md:text-[36px] italic">(</span>{' '}
          <a className="group-hover:text-accent transition"
          href="https://drive.google.com/drive/folders/1zAqgCImgD3Pxr2g2p78TE07Hr4wzDhW0?usp=sharing"
          target="_blank"
          rel="noopener noreferrer">БІЛЬШЕ ВІДГУКІВ ТУТ</a>{' '}
          <span className="text-[24px] md:text-[36px] italic">)</span>
        </span>
      </div>
      </div>
    </section>
  )
}
