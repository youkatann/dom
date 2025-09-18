import CTAButton from "../common/CTAButton/ctaButton"
import Video from 'next-video'
import heroBG from '/videos/DOM_2.mp4'

export default function Project () {
    return (
      <section className="mt-[300px] p-[20px] grid grid-cols-12 gap-[20px] grid-rows-[repeat(8,156px)] bg-neutral">
        <h2 className="row-start-1 col-start-1 col-end-6 text-[72px] text-accent font-bold tracking-tighter">ПРО ПРОЄКТ</h2>
        <div className="row-start-1 col-start-9 col-end-13 flex justify-end">
          <div className="w-fit">
            <CTAButton title="Отримати фінансові розрахунки"/>
          </div>
        </div>
        <div 
        style={{
          borderRadius: 24
        }}
        className="col-start-1 col-end-13 row-start-2 row-end-7 rounded-[24px]">
        <Video
          src={heroBG}
          autoplay
          muted
          loop
          playsInline
          controls={false}
          />
        </div>
      </section>
    )
}
