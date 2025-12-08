import CTAButton from "../common/CTAButton/ctaButton"
import Video from "next-video"
import heroBG from "/videos/DOM_2.mp4"

export default function Project() {
  return (
    <section
      id="Project"
      className="mt-[120px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[40px]"
    >
      {/* Верхній блок */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[24px] md:gap-[40px]">
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] text-accent font-bold tracking-tighter text-center md:text-left">
          ПРО ПРОЄКТ
        </h2>
        <div className="w-full md:w-fit flex justify-center md:justify-end">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>
      </div>
      <hr className="w-full border-foreground/10 h-[0.5px]" />
      {/* Відео-блок */}
      <div
        className="w-full overflow-hidden"
      >
        <div className="relative w-full pb-[100px] overflow-hidden">
          <Video
            src={heroBG}
            autoplay
            muted
            loop
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
