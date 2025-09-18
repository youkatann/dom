import CTAButton from "../common/CTAButton/ctaButton"

export default function Trust() {
  return(
    <section className="p-[20px] grid grid-cols-4 gap-[20px] grid-rows-[repeat(4,225px)] bg-neutral">
           <div className="row-start-1 col-start-4 col-end-4 flex justify-end">
           </div>
     <span className="col-start-1 col-end-3 row-start-2 text-[72px] tracking-tighter leading-[0.9] font-bold text-accent">ДОСВІДЧЕНА КЕРУЮЧА КОМПАНІЯ</span>
     <img src="/Dom_Logo.svg" className="col-start-3 ml-[-100px] row-start-2 fill-foreground w-[120px]"/>
      <span className="text-foreground/50 col-start-4 col-end-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</span>
      <hr className="col-start-1 col-end-5 row-start-3 mt-[-20px] text-foreground/40"/>
      <div className="row-start-4 row-end-4 flex w-full justify-between gap-[150px]">
      <span className=" text-tighter text-foreground text-[28px] leading-[0.9]"><span className="text-accent">2 га </span>– площа всього відпочинкового комплексу</span>
            <span className="text-tighter text-foreground text-[28px] leading-[0.9]"><span className="text-accent">4.5</span> рейтинг Google Maps / <span className="text-accent">480</span> Google reviews
</span>
                  <span className="text-tighter text-foreground text-[28px] leading-[0.9]"><span className="text-accent">4 роки</span> функціонування бізнесу WELCOME DOM</span>
    </div>
    </section>
  )
}
