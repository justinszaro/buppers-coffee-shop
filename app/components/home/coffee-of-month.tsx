import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/badge"
import { COFFEE_OF_MONTH } from "~/lib/menu-data"

export function CoffeeOfMonth() {
  const m = COFFEE_OF_MONTH
  return (
    <section className="bg-teal-dark text-cream">
      <div className="max-w-[1160px] mx-auto px-7 grid items-center gap-[52px] pt-[64px] pb-[64px] grid-cols-[0.9fr_1.1fr]">
        <img
          src="/img-bar.jpg"
          alt="The Snowdrift Latte"
          className="w-full object-cover rounded-[20px] block h-[380px]"
        />
        <div>
          <Badge tone="red">{m.tag}</Badge>
          <h2 className="font-heading font-bold text-[44px] tracking-[-0.02em] leading-[1.08] mt-[18px] mb-0">
            {m.name}
          </h2>
          <p className="font-sans text-[17px] leading-[1.65] mt-[18px] mb-6 max-w-[480px] text-[#cbe3dd]">
            {m.desc}
          </p>
          <div className="flex gap-[9px] mb-[30px] flex-wrap">
            {m.notes.map((n) => (
              <span
                key={n}
                className="font-sans text-[13px] font-medium text-cream border border-white/25 rounded-full px-[14px] py-[6px]"
              >
                {n}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-[18px] flex-wrap">
            <Link to="/order" className="no-underline">
              <Button className="bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep">
                Order one →
              </Button>
            </Link>
            <span className="font-sans text-[13.5px] text-[#9fc6bf]">
              Made with this week&apos;s bean, {m.bean}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
