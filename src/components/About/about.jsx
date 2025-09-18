const REVIEWS = [
  {
    name: "Ірина Литвин",
    avatarUrl: "img-1.jpg",
    rating: "5",
    text: "Дуже затишне місце, атмосферно і смачна кухня. Персонал привітний, завжди допоможе з вибором."
  },
  {
    name: "Олександр Кравченко",
    avatarUrl: "img-2.jpg",
    rating: "5",
    text: "Було відчуття, що я у себе вдома. Дякую за сервіс і теплий прийом!"
  },
  {
    name: "Марія Петренко",
    avatarUrl: "img-3.jpg",
    rating: "5",
    text: "Дім з великої букви. Чудова атмосфера, стильний інтер’єр, обов’язково прийду ще."
  },
  {
    name: "Andrii S.",
    avatarUrl: "img-4.jpg",
    rating: "5",
    text: "Місце, куди хочеться повертатися. Все на високому рівні."
  },
  {
    name: "Kateryna H.",
    avatarUrl: "img-5.jpg",
    rating: "5",
    text: "Відпочивали компанією, всі залишились у захваті. Дякуємо!"
  }
];

export default function About() {
  return (
    <section className="p-[20px] bg-neutral flex flex-col">
      <h2 className="mb-[40px]">
        <span className="text-[72px] tracking-tighter text-accent uppercase font-bold">
          Відгуки гостей DOM
        </span>
      </h2>

      <div className="grid grid-cols-3 gap-[32px]">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="flex gap-[16px] bg-neutral p-[24px] border border-foreground/50 rounded-[24px]"
          >
            <div className="flex-shrink-0">
              <img
                src={rev.avatarUrl}
                alt={`${rev.name} avatar`}
                className="w-[64px] h-[64px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-[28px]">{rev.name}</span>
                <span className="text-[28px] uppercase text-accent">
                  {rev.rating}+
                </span>
              </div>
              <span className="text-[18px] text-foreground/50">{rev.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
