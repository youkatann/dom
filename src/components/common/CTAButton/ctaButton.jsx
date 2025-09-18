export default function CTAButton({ title }) {
  return (
    <div className="py-[12px] px-[16px] text-[22px] flex justify-center items-center font-bold uppercase ">
      <span className="block">
        <span className="text-[36px] italic">(  </span> <span className="">{title}</span>   <span className="text-[36px] italic">)</span>
      </span>
    </div>
  )
}
