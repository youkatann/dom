import CTAButton from "../common/CTAButton/ctaButton"
import MuxPlayer from "@mux/mux-player-react"

export default function Project() {
  return (
    <section
      id="Project"
      className="mt-[120px] px-[16px] sm:px-[24px] md:px-[40px] py-[40px] sm:py-[60px] bg-neutral flex flex-col gap-[40px]"
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[24px] md:gap-[40px]">
        <h2 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[76px] text-accent font-bold tracking-tighter text-center md:text-left">
          ПРО ПРОЄКТ
        </h2>
        <div className="w-full md:w-fit flex justify-center md:justify-end">
          <CTAButton title="Отримати фінансові розрахунки" />
        </div>
      </div>

      <hr className="w-full border-foreground/10 h-[0.5px]" />

      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
        <MuxPlayer
          playbackId="28bAe02z00Jn1KNQjIajoizt00xJCcHRDMQpQheo1MJuLs"
          streamType="on-demand"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          use-player-ui={false}
          nohotkeys
          preload="auto"
          preferDevicePixelRatio
          metadata={{
            videoTitle: "DOM HOTEL Hero Short Video",
            viewerUserId: "user-id-007"
          }}
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://image.mux.com/28bAe02z00Jn1KNQjIajoizt00xJCcHRDMQpQheo1MJuLs/thumbnail.png?time=1&width=1280"
        />
      </div>
    </section>
  )
}
