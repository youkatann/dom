import CTAButton from "../common/CTAButton/ctaButton"

export default function Trust() {
  return (
    <section className="mb-[150px] p-[20px] bg-neutral flex flex-col gap-[40px]">
      {/* Верхній рядок (правий кут під іконку чи кнопки) */}
      <div className="flex justify-end">
        {/* тут можна розмістити кнопку або інший контент */}
      </div>

      {/* Заголовок + лого + опис */}
      <div className="flex justify-between gap-[20px]">
        <span className=" text-[72px] tracking-tighter leading-[0.9] font-bold text-accent">
          ДОСВІДЧЕНА КЕРУЮЧА<br/> КОМПАНІЯ
        </span>
        <img
          src="/Dom_Logo.svg"
          className="w-[120px] mt-[10px]"
        />
        <span className=" max-w-[500px] text-foreground/50">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </span>
      </div>

      {/* Лінія */}
      <hr className="w-full text-foreground/40" />

      {/* Три пункти в ряд, відцентровані */}
      <div className="flex justify-center items-center gap-[100px] text-[28px] leading-[0.9] text-foreground text-center">
        <span>
          <span className="text-accent">2 га </span>– площа всього відпочинкового комплексу
        </span>
        <span>
          <span className="text-accent">4.5</span> рейтинг Google Maps / <span className="text-accent">480</span> Google reviews
        </span>
        <span>
          <span className="text-accent">4 роки</span> функціонування бізнесу WELCOME DOM
        </span>
      </div>
    </section>
  )
}
